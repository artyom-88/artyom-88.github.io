#!/usr/bin/env node

/**
 * Script to update the list of compromised packages
 * Fetches known vulnerable packages from OSV.dev and updates the compromised packages file
 *
 * Usage:
 *   node scripts/update-compromised.js [options] [output-file] [packages...]
 *
 * Arguments:
 *   output-file     Optional. Path to file to update. Defaults to 'compromised.txt'
 *   packages        Optional. Package names to add (format: package@version or package)
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
const { ROOT_DIR, parseExistingPackages, isPackageDuplicate, writePackagesToFile } = require('./compromised-utils');

/**
 * Parse command line arguments
 * Returns: { filePath, packagesToAdd, fetchFromAPI }
 */
function parseArguments() {
  const args = process.argv.slice(2);
  let filePath = null;
  const packagesToAdd = [];
  let fetchFromAPI = true;
  let i = 0;

  while (i < args.length) {
    const arg = args[i];

    if (arg === '--no-fetch' || arg === '-n') {
      fetchFromAPI = false;
      i++;
    } else if (arg === '--file' || arg === '-f') {
      filePath = args[++i];
      i++;
    } else if (arg.startsWith('--')) {
      // Skip unknown flags
      i++;
    } else if (
      !filePath &&
      (arg.endsWith('.txt') || arg.includes('/') || arg.includes('\\') || fs.existsSync(path.resolve(ROOT_DIR, arg)))
    ) {
      // Looks like a file path - check this before package names
      filePath = arg;
      i++;
    } else if (arg.includes('@') || /^[@a-z0-9][@a-z0-9._-]*$/i.test(arg)) {
      // Package name or package@version (starts with letter, number, @, or contains @)
      packagesToAdd.push(arg);
      i++;
    } else if (!filePath) {
      // First non-flag argument might be file path
      filePath = arg;
      i++;
    } else {
      // Treat as package name
      packagesToAdd.push(arg);
      i++;
    }
  }

  // Resolve file path
  if (!filePath) {
    filePath = path.join(ROOT_DIR, 'compromised.txt');
  } else if (!path.isAbsolute(filePath)) {
    filePath = path.resolve(ROOT_DIR, filePath);
  }

  return { filePath, packagesToAdd, fetchFromAPI };
}

// parseExistingPackages is now imported from compromised-utils

/**
 * Fetch vulnerable npm packages from GitHub Security Advisories
 * This is a free API that provides npm security advisories
 */
async function fetchVulnerablePackages() {
  console.log('🔍 Fetching vulnerable packages from GitHub Security Advisories...');

  try {
    // GitHub Security Advisories API
    // Note: This API may require authentication for higher rate limits
    // but works without auth for basic usage
    const githubUrl = 'https://api.github.com/advisories?per_page=100&ecosystem=npm';

    const response = await fetch(githubUrl, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'compromised-packages-updater',
      },
    });

    if (!response.ok) {
      if (response.status === 403) {
        console.warn('⚠️  GitHub API rate limit reached. Using fallback method...');
        return await fetchFromKnownVulnerabilities();
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Handle pagination response
    const advisories = Array.isArray(data) ? data : data.items || [];

    if (!Array.isArray(advisories) || advisories.length === 0) {
      console.warn('⚠️  No advisories found. Using fallback method...');
      return await fetchFromKnownVulnerabilities();
    }

    const vulnerablePackages = new Set();

    for (const advisory of advisories) {
      // GitHub API structure: advisories have a 'vulnerabilities' array
      // Each vulnerability has package info and version ranges
      if (advisory.vulnerabilities && Array.isArray(advisory.vulnerabilities)) {
        for (const vulnerability of advisory.vulnerabilities) {
          if (vulnerability.package && vulnerability.package.ecosystem === 'npm') {
            const packageName = vulnerability.package.name;

            // Try to extract version information from vulnerable_version_range
            if (vulnerability.vulnerable_version_range) {
              // Parse version ranges like "< 5.2.5" or ">=1.0.0 <2.0.0"
              const range = vulnerability.vulnerable_version_range.trim();

              // Extract specific versions from ranges
              // For ranges like "< 5.2.5", we'll add the package with a note
              // For now, we'll add the package name and try to extract version if possible
              const versionMatch = range.match(/([0-9]+\.[0-9]+\.[0-9]+)/);
              if (versionMatch) {
                // Add the version that's mentioned in the range
                vulnerablePackages.add(`${packageName}@${versionMatch[1]}`);
              } else {
                // If we can't extract a specific version, add package name only
                vulnerablePackages.add(packageName);
              }
            } else if (vulnerability.vulnerable_versions) {
              const versions = vulnerability.vulnerable_versions.split(',').map((v) => v.trim());
              versions.forEach((version) => {
                if (version && version !== '*' && !version.includes('<') && !version.includes('>')) {
                  vulnerablePackages.add(`${packageName}@${version}`);
                } else {
                  vulnerablePackages.add(packageName);
                }
              });
            } else {
              // Fallback: add package name only
              vulnerablePackages.add(packageName);
            }
          }
        }
      }
      // Legacy support: check if advisory has direct package field (older API format)
      else if (advisory.package && advisory.package.ecosystem === 'npm') {
        const packageName = advisory.package.name;

        if (advisory.vulnerable_version_range) {
          const ranges = advisory.vulnerable_version_range.split(',').map((r) => r.trim());
          ranges.forEach((range) => {
            const versionMatch = range.match(/([0-9]+\.[0-9]+\.[0-9]+)/);
            if (versionMatch) {
              vulnerablePackages.add(`${packageName}@${versionMatch[1]}`);
            } else {
              vulnerablePackages.add(packageName);
            }
          });
        } else if (advisory.vulnerable_versions) {
          const versions = advisory.vulnerable_versions.split(',').map((v) => v.trim());
          versions.forEach((version) => {
            if (version && version !== '*' && !version.includes('<') && !version.includes('>')) {
              vulnerablePackages.add(`${packageName}@${version}`);
            } else {
              vulnerablePackages.add(packageName);
            }
          });
        } else {
          vulnerablePackages.add(packageName);
        }
      }
    }

    console.log(`✅ Found ${vulnerablePackages.size} vulnerable packages from GitHub`);
    return Array.from(vulnerablePackages);
  } catch (error) {
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
 * IMPORTANT: This function ALWAYS preserves all existing packages.
 * It only adds new packages that don't already exist.
 */
function mergePackages(existing, newPackages) {
  // Start with ALL existing packages - these are NEVER removed
  const merged = new Set(existing);
  let added = 0;
  let skipped = 0;

  for (const pkg of newPackages) {
    // If exact match exists, skip
    if (merged.has(pkg)) {
      skipped++;
      continue;
    }

    // Check if this package is a duplicate of an existing one
    let isDuplicate = false;
    for (const existingPkg of merged) {
      if (isPackageDuplicate(pkg, existingPkg)) {
        isDuplicate = true;
        break;
      }
    }

    // Only add if not a duplicate
    // Note: We NEVER remove existing entries, only add new ones
    if (!isDuplicate) {
      merged.add(pkg);
      added++;
    } else {
      skipped++;
    }
  }

  // Return sorted list - ALL existing packages are preserved
  return {
    packages: Array.from(merged).sort(),
    added,
    skipped,
  };
}

// writePackagesToFile is now imported from compromised-utils

/**
 * Main function
 */
async function main() {
  try {
    const { filePath: outputFilePath, packagesToAdd, fetchFromAPI } = parseArguments();
    console.log(`📝 Output file: ${outputFilePath}`);

    // Read existing packages - these will be PRESERVED and never removed
    const existingPackages = parseExistingPackages(outputFilePath);
    const initialCount = existingPackages.size;
    console.log(`📋 Found ${initialCount} existing packages in file (all will be preserved)`);

    const newPackages = [];

    // Add manually specified packages
    if (packagesToAdd.length > 0) {
      console.log(`📦 Adding ${packagesToAdd.length} manually specified package(s)...`);
      newPackages.push(...packagesToAdd);
    }

    // Fetch from API if requested
    if (fetchFromAPI) {
      try {
        const fetchedPackages = await fetchVulnerablePackages();
        newPackages.push(...fetchedPackages);
      } catch (error) {
        console.warn(`⚠️  Failed to fetch from API: ${error.message}`);
        if (packagesToAdd.length === 0) {
          console.error('❌ No packages to add and API fetch failed');
          process.exit(1);
        }
      }
    }

    if (newPackages.length === 0) {
      console.log('⚠️  No new packages to add');
      process.exit(0);
    }

    // Merge packages (skip duplicates)
    // IMPORTANT: mergePackages ALWAYS preserves all existing packages
    const { packages, added, skipped } = mergePackages(existingPackages, newPackages);

    // Verify that all existing packages are still present
    const finalCount = packages.length;
    const preservedCount = finalCount - added;
    if (preservedCount < initialCount) {
      console.error(`\n❌ ERROR: Expected ${initialCount} existing packages, but only ${preservedCount} were preserved!`);
      console.error('   This should never happen - existing packages should always be preserved.');
      process.exit(1);
    }

    // Write to file
    writePackagesToFile(outputFilePath, packages);

    console.log(`\n✅ Update complete!`);
    console.log(`   📦 Total packages: ${packages.length}`);
    console.log(`   🔒 Preserved (existing): ${preservedCount}`);
    console.log(`   ➕ Added (new): ${added}`);
    console.log(`   ⏭️  Skipped (duplicates): ${skipped}`);
    console.log(`   📄 Updated file: ${outputFilePath}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating compromised packages:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

main();
