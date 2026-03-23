#!/usr/bin/env node

/**
 * Script to update the list of compromised packages
 * Fetches known vulnerable packages from GitHub Security Advisories and updates the compromised packages file
 *
 * Usage:
 *   node scripts/update-compromised.js [options] [output-file] [packages...]
 *
 * Arguments:
 *   output-file     Optional. Path to file to update. Defaults to 'compromised.txt'
 *   packages        Optional. Exact package entries to add (format: package@version)
 *
 * Options:
 *   --no-fetch, -n  Skip fetching from API, only add manually specified packages
 *   --file, -f      Specify output file path
 *
 * Examples:
 *   # Fetch from API and update default file
 *   node scripts/update-compromised.js
 *
 *   # Fetch from API and update specific file
 *   node scripts/update-compromised.js compromised.txt
 *
 *   # Add specific packages manually
 *   node scripts/update-compromised.js colors@1.4.0 faker@5.5.3
 *
 *   # Add packages to specific file without API fetch
 *   node scripts/update-compromised.js --no-fetch compromised.txt package@1.0.0
 */

const fs = require('node:fs');
const path = require('node:path');
const {
  DEFAULT_COMPROMISED_FILE,
  getProjectDependencyState,
  getCompromisedFilePath,
  isPackageDuplicate,
  parsePackageNameVersion,
  parseExistingPackages,
  writePackagesToFile,
} = require('./compromised-utils');

// Constants
const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_RETRY_DELAY_MS = 1000;
const GITHUB_API_PER_PAGE = 100;
const RATE_LIMIT_ERROR = 'RATE_LIMIT';
const GITHUB_ADVISORIES_URL = `https://api.github.com/advisories?per_page=${GITHUB_API_PER_PAGE}&ecosystem=npm`;
const GITHUB_API_HEADERS = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'compromised-packages-updater',
};

/**
 * Check if an argument looks like a file path
 * @param {string} arg - Argument to check
 * @returns {boolean} True if argument appears to be a file path
 */
function isFilePath(arg) {
  return arg.endsWith('.txt') || arg.includes('/') || arg.includes('\\') || fs.existsSync(path.resolve(process.cwd(), arg));
}

/**
 * Check if an argument looks like a package name
 * @param {string} arg - Argument to check
 * @returns {boolean} True if argument appears to be a package name
 */
function isPackageName(arg) {
  return arg.includes('@') || /^[@a-z0-9][@a-z0-9._-]*$/i.test(arg);
}

function isConfirmedPackageEntry(packageEntry) {
  return Boolean(parsePackageNameVersion(packageEntry).version);
}

function validateManualPackages(packagesToAdd, projectPackageNames) {
  const invalidPackages = packagesToAdd.filter((packageEntry) => !isConfirmedPackageEntry(packageEntry));
  if (invalidPackages.length > 0) {
    throw new Error(`Manual package additions must use exact package@version entries: ${invalidPackages.join(', ')}`);
  }

  const outOfScopePackages = packagesToAdd.filter((packageEntry) => {
    const { name } = parsePackageNameVersion(packageEntry);
    return !projectPackageNames.has(name);
  });
  if (outOfScopePackages.length > 0) {
    throw new Error(
      `Manual package additions must reference packages from the current project dependency graph: ${outOfScopePackages.join(', ')}`,
    );
  }
}

function partitionProjectScopedPackageEntries(packageEntries, projectPackageNames) {
  return Array.from(packageEntries).reduce(
    (result, packageEntry) => {
      if (!isConfirmedPackageEntry(packageEntry)) {
        result.removedNonExact.push(packageEntry);
        return result;
      }

      const { name } = parsePackageNameVersion(packageEntry);
      if (!projectPackageNames.has(name)) {
        result.removedOutOfScope.push(packageEntry);
        return result;
      }

      result.confirmedPackages.add(packageEntry);
      return result;
    },
    {
      confirmedPackages: new Set(),
      removedNonExact: [],
      removedOutOfScope: [],
    },
  );
}

function logDependencyStateSource(projectDependencyState) {
  if (projectDependencyState.installedError) {
    console.log('ℹ️  Installed dependency tree unavailable or stale, using package.json + pnpm-lock.yaml project scope');
    return;
  }

  console.log('ℹ️  Using package.json + pnpm-lock.yaml + installed dependency tree project scope');
}

/**
 * Parse command line arguments for the update-compromised script
 *
 * Supports the following argument patterns:
 * - Flags: --no-fetch, -n (skip API fetch), --file, -f (specify file path)
 * - Positional: file path (detected by .txt extension, /, \, or file existence)
 * - Positional: package entries (format: package@version)
 *
 * @param {string[]} args - CLI arguments to parse
 * @returns {{filePath: string, packagesToAdd: string[], fetchFromAPI: boolean}} Parsed arguments
 *
 * @example
 * // Parse: node update-compromised.js --no-fetch compromised.txt package@1.0.0
 * // Returns: { filePath: '/path/to/compromised.txt', packagesToAdd: ['package@1.0.0'], fetchFromAPI: false }
 *
 * @example
 * // Parse: node update-compromised.js package1@1.0.0 package2@2.0.0
 * // Returns: { filePath: '/path/to/compromised.txt', packagesToAdd: ['package1@1.0.0', 'package2@2.0.0'], fetchFromAPI: true }
 */
function resolveOutputFilePath(filePathArg) {
  return getCompromisedFilePath(filePathArg ? [filePathArg] : [], DEFAULT_COMPROMISED_FILE);
}

function parseArguments(args = process.argv.slice(2)) {
  let filePath = null;
  const packagesToAdd = [];
  let fetchFromAPI = true;
  let i = 0;

  while (i < args.length) {
    const arg = args[i];

    // Handle flags
    if (arg === '--no-fetch' || arg === '-n') {
      fetchFromAPI = false;
      i++;
      continue;
    }

    if (arg === '--file' || arg === '-f') {
      if (i + 1 >= args.length) {
        throw new Error(`Flag ${arg} requires a value`);
      }
      filePath = args[++i];
      i++;
      continue;
    }

    if (arg.startsWith('--')) {
      // Skip unknown flags with warning
      console.warn(`⚠️  Unknown flag: ${arg}. Skipping...`);
      i++;
      continue;
    }

    // Handle positional arguments
    if (!filePath && isFilePath(arg)) {
      filePath = arg;
      i++;
      continue;
    }

    if (isPackageName(arg)) {
      packagesToAdd.push(arg);
      i++;
      continue;
    }

    // Fallback: treat as file path if no file path set yet, otherwise as package
    if (!filePath) {
      filePath = arg;
    } else {
      packagesToAdd.push(arg);
    }
    i++;
  }

  return {
    filePath: resolveOutputFilePath(filePath),
    packagesToAdd,
    fetchFromAPI,
  };
}

// parseExistingPackages is now imported from compromised-utils

/**
 * Retry a function with exponential backoff
 *
 * Implements exponential backoff retry strategy: delays increase as 2^attempt * initialDelay.
 * Retries on transient errors (5xx server errors), but not on client errors (4xx) or rate limits.
 *
 * @param {Function} fn - Async function to retry. Should throw an error on failure.
 * @param {number} maxRetries - Maximum number of retry attempts (default: 3)
 * @param {number} initialDelay - Initial delay in milliseconds before first retry (default: 1000)
 * @returns {Promise<any>} Result of the function if successful
 * @throws {Error} Last error encountered if all retries are exhausted
 *
 * @example
 * const result = await retryWithBackoff(async () => {
 *   const res = await fetch(url);
 *   if (!res.ok) throw new Error('Failed');
 *   return res;
 * }, 3, 1000);
 */
async function retryWithBackoff(fn, maxRetries = DEFAULT_MAX_RETRIES, initialDelay = DEFAULT_RETRY_DELAY_MS) {
  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries) {
        const delay = initialDelay * 2 ** attempt;
        console.warn(`⚠️  Attempt ${attempt + 1} failed: ${error.message}. Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
}

/**
 * Determine whether a version string is specific enough to store as package@version.
 * @param {string} version - Vulnerable version entry from GitHub
 * @returns {boolean} True when the version is an exact version rather than a range or wildcard
 */
function isSpecificVersion(version) {
  return Boolean(version) && version !== '*' && !version.includes('<') && !version.includes('>');
}

/**
 * Warn that a vulnerability was skipped because it does not identify an exact compromised version.
 * @param {string} packageName - Vulnerable package name
 * @param {string} versionDescriptor - Vulnerable version range or descriptor from GitHub
 */
function warnSkippedNonExactAdvisory(packageName, versionDescriptor) {
  console.warn(
    `[WARN] Skipping advisory for ${packageName}: '${versionDescriptor}' is not an exact compromised version. Exact-only entries belong in compromised.txt.`,
  );
}

/**
 * Extract exact vulnerable versions for a package and skip non-exact entries.
 * @param {string} packageName - Vulnerable package name
 * @param {string} vulnerableVersions - Comma-separated vulnerable versions
 * @returns {{exactEntries: string[], skippedNonExact: number}} Exact vulnerable entries and skipped non-exact count
 */
function getExplicitVersionEntries(packageName, vulnerableVersions) {
  const exactEntries = [];
  let skippedNonExact = 0;

  vulnerableVersions
    .split(',')
    .map((version) => version.trim())
    .forEach((version) => {
      if (isSpecificVersion(version)) {
        exactEntries.push(`${packageName}@${version}`);
      } else {
        warnSkippedNonExactAdvisory(packageName, version || '(empty version)');
        skippedNonExact++;
      }
    });

  return { exactEntries, skippedNonExact };
}

/**
 * Normalize GitHub advisory shapes into a single package-entry format.
 * @param {object} advisory - Advisory from the GitHub API
 * @returns {Array<{packageName: string, vulnerableVersionRange?: string, vulnerableVersions?: string}>} Package entries for npm advisories
 */
function extractNpmPackageEntries(advisory) {
  if (advisory.vulnerabilities && Array.isArray(advisory.vulnerabilities)) {
    return advisory.vulnerabilities
      .filter((vulnerability) => vulnerability.package && vulnerability.package.ecosystem === 'npm')
      .map((vulnerability) => ({
        packageName: vulnerability.package.name,
        vulnerableVersionRange: vulnerability.vulnerable_version_range,
        vulnerableVersions: vulnerability.vulnerable_versions,
      }));
  }

  if (advisory.package && advisory.package.ecosystem === 'npm') {
    return [
      {
        packageName: advisory.package.name,
        vulnerableVersionRange: advisory.vulnerable_version_range,
        vulnerableVersions: advisory.vulnerable_versions,
      },
    ];
  }

  return [];
}

/**
 * Convert GitHub advisories into confirmed compromised package entries for the current project scope.
 * @param {object[]} advisories - Advisories returned from GitHub
 * @param {Set<string>} projectPackageNames - Package names present in the current project dependency graph
 * @returns {{packages: string[], count: number, skippedNonExact: number, skippedOutOfScope: number}} Confirmed packages plus skip counts
 */
function collectPackagesFromAdvisories(advisories, projectPackageNames) {
  const vulnerablePackages = new Set();
  let skippedNonExact = 0;
  let skippedOutOfScope = 0;

  advisories.forEach((advisory) => {
    extractNpmPackageEntries(advisory).forEach(({ packageName, vulnerableVersionRange, vulnerableVersions }) => {
      if (vulnerableVersionRange) {
        vulnerableVersionRange
          .split(',')
          .map((range) => range.trim())
          .filter(Boolean)
          .forEach((range) => {
            warnSkippedNonExactAdvisory(packageName, range);
            skippedNonExact++;
          });
        return;
      }

      if (vulnerableVersions) {
        const { exactEntries, skippedNonExact: skippedVersionEntries } = getExplicitVersionEntries(
          packageName,
          vulnerableVersions,
        );
        skippedNonExact += skippedVersionEntries;

        if (!projectPackageNames.has(packageName)) {
          skippedOutOfScope += exactEntries.length;
          return;
        }

        exactEntries.forEach((entry) => {
          vulnerablePackages.add(entry);
        });
        return;
      }

      warnSkippedNonExactAdvisory(packageName, 'missing version information');
      skippedNonExact++;
    });
  });

  return {
    packages: [...vulnerablePackages],
    count: vulnerablePackages.size,
    skippedNonExact,
    skippedOutOfScope,
  };
}

/**
 * Fetch raw advisories from the GitHub Security Advisories API.
 * @returns {Promise<object[]>} Advisories returned by the API
 */
async function fetchGitHubAdvisories() {
  const response = await retryWithBackoff(
    async () => {
      const res = await fetch(GITHUB_ADVISORIES_URL, { headers: GITHUB_API_HEADERS });

      if (!res.ok) {
        if (res.status === 403) {
          throw new Error(RATE_LIMIT_ERROR);
        }
        if (res.status >= 500) {
          throw new Error(`GitHub API server error: ${res.status} ${res.statusText}`);
        }
        throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
      }

      return res;
    },
    DEFAULT_MAX_RETRIES,
    DEFAULT_RETRY_DELAY_MS,
  );

  const data = await response.json();
  return Array.isArray(data) ? data : data.items || [];
}

/**
 * Fetch vulnerable npm packages from GitHub Security Advisories API
 *
 * Retrieves npm security advisories from GitHub's public API. Handles:
 * - Version ranges (logs warning, skips them)
 * - Specific versions (adds package@version)
 * - Package-only or missing version data (logs warning, skips them)
 * - Rate limiting (falls back to curated list)
 * - Server errors (retries with exponential backoff)
 *
 * @param {Set<string>} projectPackageNames - Package names present in the current project dependency graph
 * @returns {Promise<string[]>} Array of confirmed compromised package strings (package@version)
 * @throws {Error} If API fails after all retries and no fallback is available
 *
 * @example
 * const packages = await fetchVulnerablePackages(new Set(['package1', 'package3']));
 * // Returns: ['package1@1.0.0', 'package3@2.0.0']
 */
async function fetchVulnerablePackages(projectPackageNames) {
  console.log('🔍 Fetching vulnerable packages from GitHub Security Advisories...');

  try {
    const advisories = await fetchGitHubAdvisories();
    if (!Array.isArray(advisories) || advisories.length === 0) {
      console.warn('⚠️  No advisories found. Using fallback method...');
      return await fetchFromKnownVulnerabilities();
    }

    const { packages, count, skippedNonExact, skippedOutOfScope } = collectPackagesFromAdvisories(
      advisories,
      projectPackageNames,
    );
    console.log(`✅ Found ${count} confirmed compromised package version(s) from GitHub for current project dependencies`);
    if (skippedNonExact > 0) {
      console.log(`ℹ️  Skipped ${skippedNonExact} non-exact advisory entr${skippedNonExact === 1 ? 'y' : 'ies'} from file output`);
    }
    if (skippedOutOfScope > 0) {
      console.log(
        `ℹ️  Skipped ${skippedOutOfScope} advisory version entr${skippedOutOfScope === 1 ? 'y' : 'ies'} for packages outside the current project dependency graph`,
      );
    }
    return packages;
  } catch (error) {
    if (error.message === RATE_LIMIT_ERROR) {
      return await fetchFromKnownVulnerabilities();
    }
    console.error('❌ Error fetching from GitHub API:', error.message);
    console.log('🔄 Using fallback method...');
    return await fetchFromKnownVulnerabilities();
  }
}

/**
 * Fallback: Return a curated list of known compromised packages
 * This can be updated manually or extended with other sources
 */
async function fetchFromKnownVulnerabilities() {
  console.log('📋 Using curated list of known compromised packages...');

  // This is a fallback list - in production, you might want to:
  // 1. Maintain a separate file with known compromised packages
  // 2. Use multiple sources
  // 3. Query specific packages you're concerned about

  // For now, return empty array - users should maintain their own list
  // or we can query specific known vulnerable packages
  const knownVulnerable = [
    // Add known compromised packages here if needed
    // Example: 'colors@1.4.0', 'faker@5.5.3'
  ];

  console.log(`✅ Found ${knownVulnerable.length} packages from curated list`);
  return knownVulnerable;
}

/**
 * Merge new packages with existing ones, skipping duplicates
 *
 * Existing packages should already be normalized to project-scoped exact entries.
 * This step only appends new exact entries that are not already present.
 *
 * @param {Set<string>} existing - Set of existing package entries
 * @param {string[]} newPackages - Array of new package strings to merge
 * @returns {{packages: string[], added: number, skipped: number}} Merged packages and statistics
 *
 * @example
 * const existing = new Set(['package1@1.0.0', 'package2']);
 * const newPackages = ['package1@1.0.0', 'package2@2.0.0', 'package3'];
 * const result = mergePackages(existing, newPackages);
 * // Returns: { packages: ['package1@1.0.0', 'package2', 'package2@2.0.0', 'package3'], added: 2, skipped: 1 }
 */
function mergePackages(existing, newPackages) {
  const merged = new Set(existing);
  let added = 0;
  let skipped = 0;

  for (const pkg of newPackages) {
    if (merged.has(pkg)) {
      skipped++;
      continue;
    }

    let isDuplicate = false;
    for (const existingPkg of merged) {
      if (isPackageDuplicate(pkg, existingPkg)) {
        isDuplicate = true;
        break;
      }
    }

    if (!isDuplicate) {
      merged.add(pkg);
      added++;
    } else {
      skipped++;
    }
  }

  return {
    packages: Array.from(merged).sort(),
    added,
    skipped,
  };
}

function collectNewPackages(packagesToAdd, fetchFromAPI, projectPackageNames) {
  validateManualPackages(packagesToAdd, projectPackageNames);
  const newPackages = [...packagesToAdd];

  if (packagesToAdd.length > 0) {
    console.log(`📦 Adding ${packagesToAdd.length} manually specified package(s)...`);
  }

  if (!fetchFromAPI) {
    return Promise.resolve(newPackages);
  }

  return fetchVulnerablePackages(projectPackageNames)
    .then((fetchedPackages) => {
      newPackages.push(...fetchedPackages);
      return newPackages;
    })
    .catch((error) => {
      console.warn(`⚠️  Failed to fetch from API: ${error.message}`);
      if (packagesToAdd.length === 0) {
        throw new Error('No packages to add and API fetch failed');
      }
      return newPackages;
    });
}

function assertPackagesPreserved(initialCount, finalCount, added) {
  const preservedCount = finalCount - added;
  if (preservedCount < initialCount) {
    throw new Error(
      `Expected ${initialCount} existing packages to be preserved, but only ${preservedCount} remained after merge.`,
    );
  }
  return preservedCount;
}

function logUpdateSummary(outputFilePath, packages, preservedCount, added, skipped, removedCount = 0) {
  console.log('\n✅ Update complete!');
  console.log(`   📦 Total packages: ${packages.length}`);
  console.log(`   🔒 Preserved (existing): ${preservedCount}`);
  if (removedCount > 0) {
    console.log(`   🧹 Removed (filtered existing): ${removedCount}`);
  }
  console.log(`   ➕ Added (new): ${added}`);
  console.log(`   ⏭️  Skipped (duplicates): ${skipped}`);
  console.log(`   📄 Updated file: ${outputFilePath}`);
}

/**
 * Main function
 */
async function main() {
  try {
    const { filePath: outputFilePath, packagesToAdd, fetchFromAPI } = parseArguments();
    console.log(`📝 Output file: ${outputFilePath}`);
    const projectDependencyState = getProjectDependencyState();
    logDependencyStateSource(projectDependencyState);
    console.log(`📦 Project dependency scope includes ${projectDependencyState.packageNames.size} package name(s)`);

    const existingEntries = parseExistingPackages(outputFilePath);
    const {
      confirmedPackages: existingPackages,
      removedNonExact,
      removedOutOfScope,
    } = partitionProjectScopedPackageEntries(existingEntries, projectDependencyState.packageNames);
    const initialCount = existingPackages.size;
    console.log(`📋 Found ${initialCount} confirmed existing package(s) in file`);
    if (removedNonExact.length > 0) {
      console.log(
        `🧹 Will remove ${removedNonExact.length} non-exact existing entr${
          removedNonExact.length === 1 ? 'y' : 'ies'
        } from compromised.txt`,
      );
    }
    if (removedOutOfScope.length > 0) {
      console.log(
        `🧹 Will remove ${removedOutOfScope.length} out-of-scope existing entr${
          removedOutOfScope.length === 1 ? 'y' : 'ies'
        } from compromised.txt`,
      );
    }

    const newPackages = await collectNewPackages(packagesToAdd, fetchFromAPI, projectDependencyState.packageNames);

    if (newPackages.length === 0 && removedNonExact.length === 0 && removedOutOfScope.length === 0) {
      console.log('⚠️  No new packages to add');
      process.exit(0);
    }

    const { packages, added, skipped } = mergePackages(existingPackages, newPackages);

    const preservedCount = assertPackagesPreserved(initialCount, packages.length, added);

    writePackagesToFile(outputFilePath, packages);

    logUpdateSummary(outputFilePath, packages, preservedCount, added, skipped, removedNonExact.length + removedOutOfScope.length);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating compromised packages:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  assertPackagesPreserved,
  collectNewPackages,
  collectPackagesFromAdvisories,
  extractNpmPackageEntries,
  fetchGitHubAdvisories,
  fetchVulnerablePackages,
  getExplicitVersionEntries,
  isConfirmedPackageEntry,
  isFilePath,
  isPackageName,
  isSpecificVersion,
  logUpdateSummary,
  main,
  mergePackages,
  parseArguments,
  partitionProjectScopedPackageEntries,
  resolveOutputFilePath,
  retryWithBackoff,
  validateManualPackages,
  warnSkippedNonExactAdvisory,
  logDependencyStateSource,
};
