#!/usr/bin/env node

/**
 * Utility functions for compromised packages scripts
 * Shared functionality for checking and updating compromised packages
 */

const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const ROOT_DIR = path.join(__dirname, '..');

// Constants
const DEFAULT_MAX_BUFFER_SIZE = 10 * 1024 * 1024; // 10MB
const DEFAULT_COMPROMISED_FILE = 'compromised.txt';
const ANY_VERSION = '*';
const MANIFEST_DEPENDENCY_FIELDS = ['dependencies', 'devDependencies', 'optionalDependencies'];

/**
 * Get compromised file path from command line argument or use default
 * @param {string[]} args - Command line arguments (defaults to process.argv.slice(2))
 * @param {string} defaultFile - Default filename (defaults to 'compromised.txt')
 * @returns {string} Absolute path to compromised packages file
 */
function getCompromisedFilePath(args = process.argv.slice(2), defaultFile = DEFAULT_COMPROMISED_FILE) {
  let outPath;
  if (args.length > 0) {
    const filePath = args[0];
    // If absolute, use as is, else resolve relative to ROOT_DIR
    outPath = path.isAbsolute(filePath) ? filePath : path.resolve(ROOT_DIR, filePath);
  } else {
    outPath = path.join(ROOT_DIR, defaultFile);
  }
  if (outPath.includes('..')) {
    throw new Error('Parent directory traversal is not allowed in compromised file path');
  }
  // Normalize and prevent from escaping the workspace
  if (!outPath.startsWith(ROOT_DIR)) {
    throw new Error('Compromised file path must be inside the project root/workspace');
  }
  return outPath;
}

/**
 * Find the separator between a package name and version, if present.
 * Returns -1 for package-only entries, including bare scoped packages.
 * @param {string} packageString - Package string in format "package@version" or "package"
 * @returns {number} Index of the version separator, or -1 when no version exists
 */
function findVersionSeparatorIndex(packageString) {
  const lastAtIndex = packageString.lastIndexOf('@');

  if (lastAtIndex <= 0) {
    return -1;
  }

  if (!packageString.startsWith('@')) {
    return lastAtIndex;
  }

  const scopeSeparatorIndex = packageString.indexOf('/');
  if (scopeSeparatorIndex === -1 || lastAtIndex < scopeSeparatorIndex) {
    return -1;
  }

  return lastAtIndex;
}

/**
 * Parse package name and version from string
 * @param {string} packageString - Package string in format "package@version" or "package"
 * @returns {{name: string, version: string|null}} Parsed package name and version
 */
function parsePackageNameVersion(packageString) {
  if (!packageString || typeof packageString !== 'string') {
    return { name: packageString, version: null };
  }

  const versionSeparatorIndex = findVersionSeparatorIndex(packageString);
  if (versionSeparatorIndex === -1) {
    return { name: packageString, version: null };
  }

  const name = packageString.substring(0, versionSeparatorIndex);
  const version = packageString.substring(versionSeparatorIndex + 1);
  return { name, version: version || null };
}

/**
 * Read non-empty, non-comment compromised package entries from a file.
 * @param {string} filePath - Path to compromised packages file
 * @param {{ allowMissing?: boolean }} [options] - Read options
 * @returns {string[]} Normalized package entries
 */
function readPackageEntries(filePath, options = {}) {
  const { allowMissing = false } = options;

  if (!fs.existsSync(filePath)) {
    if (allowMissing) {
      return [];
    }
    throw new Error(`Compromised packages file not found: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf8');
  return content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'));
}

/**
 * Convert a package entry string into the structured format used by the scripts.
 * @param {string} packageEntry - Package string from compromised.txt
 * @returns {{name: string, version: string|null, original: string}} Structured compromised entry
 */
function toCompromisedEntry(packageEntry) {
  const { name, version } = parsePackageNameVersion(packageEntry);
  return { name, version, original: packageEntry };
}

function toPackageKey(pkg) {
  return `${pkg.name}@${pkg.version}`;
}

/**
 * Parse compromised packages from file into structured format
 * Returns array of objects with name, version, and original string
 * @param {string} filePath - Path to compromised packages file
 * @returns {Array<{name: string, version: string|null, original: string}>} Array of compromised package entries
 */
function parseCompromisedPackages(filePath) {
  return readPackageEntries(filePath).map(toCompromisedEntry);
}

/**
 * Parse existing compromised packages from file into Set
 * Returns Set of package strings (package@version or just package)
 * @param {string} filePath - Path to compromised packages file
 * @returns {Set<string>} Set of package entries
 */
function parseExistingPackages(filePath) {
  return new Set(readPackageEntries(filePath, { allowMissing: true }));
}

function readProjectManifest(filePath = path.join(ROOT_DIR, 'package.json')) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function getManifestDependencyNames(manifest = readProjectManifest()) {
  return new Set([
    ...MANIFEST_DEPENDENCY_FIELDS.flatMap((field) => Object.keys(manifest[field] || {})),
    ...getManifestOverrideEntries(manifest).map(({ name }) => name),
  ]);
}

function isExactVersionSpecifier(specifier) {
  return (
    typeof specifier === 'string' &&
    specifier.length > 0 &&
    !specifier.startsWith('$') &&
    !specifier.startsWith('workspace:') &&
    !specifier.startsWith('file:') &&
    !specifier.startsWith('link:') &&
    !specifier.startsWith('git+') &&
    !specifier.startsWith('npm:') &&
    !/[~^*<>=| ]/.test(specifier)
  );
}

function getOverridePackageName(selector) {
  if (typeof selector !== 'string' || selector.length === 0) {
    return null;
  }

  const packageSelector = selector.split('>').pop()?.trim();
  return packageSelector ? parsePackageNameVersion(packageSelector).name : null;
}

function getManifestOverrideEntries(manifest = readProjectManifest()) {
  return Object.entries(manifest.pnpm?.overrides || {})
    .map(([selector, specifier]) => ({
      name: getOverridePackageName(selector),
      specifier,
    }))
    .filter(({ name }) => Boolean(name));
}

function getExactManifestPackages(manifest = readProjectManifest()) {
  const dependencyPackages = MANIFEST_DEPENDENCY_FIELDS.flatMap((field) =>
    Object.entries(manifest[field] || {})
      .filter(([, specifier]) => isExactVersionSpecifier(specifier))
      .map(([name, version]) => ({ name, version })),
  );

  const overridePackages = getManifestOverrideEntries(manifest)
    .filter(({ specifier }) => isExactVersionSpecifier(specifier))
    .map(({ name, specifier }) => ({ name, version: specifier }));

  return [...dependencyPackages, ...overridePackages];
}

function normalizeResolvedVersion(version) {
  return typeof version === 'string' ? version.split('(')[0] : version;
}

function stripPeerDependencySuffix(value) {
  return typeof value === 'string' ? value.split('(')[0] : value;
}

function stripYamlQuotes(value) {
  return value.startsWith("'") && value.endsWith("'") ? value.slice(1, -1).replace(/''/g, "'") : value;
}

function getPackagesFromPnpmLockfileContent(content) {
  const packages = new Map();
  let inPackagesSection = false;

  content.split('\n').forEach((line) => {
    if (!inPackagesSection) {
      if (line === 'packages:') {
        inPackagesSection = true;
      }
      return;
    }

    if (line && !line.startsWith(' ')) {
      inPackagesSection = false;
      return;
    }

    const packageKeyMatch = line.match(/^ {2}(.+):$/);
    if (!packageKeyMatch) {
      return;
    }

    const packageKey = stripPeerDependencySuffix(stripYamlQuotes(packageKeyMatch[1]));
    const { name, version } = parsePackageNameVersion(packageKey);
    if (!name || !version) {
      return;
    }

    const normalizedVersion = normalizeResolvedVersion(version);
    packages.set(toPackageKey({ name, version: normalizedVersion }), {
      name,
      version: normalizedVersion,
    });
  });

  return Array.from(packages.values());
}

function getPackagesFromPnpmLockfile(filePath = path.join(ROOT_DIR, 'pnpm-lock.yaml')) {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  return getPackagesFromPnpmLockfileContent(fs.readFileSync(filePath, 'utf8'));
}

function createProjectDependencyState({
  manifestDependencyNames = new Set(),
  manifestPackages = [],
  lockfilePackages = [],
  installedPackages = [],
} = {}) {
  const packageNames = new Set(manifestDependencyNames);
  const exactPackages = new Map();

  function addPackages(packages, source) {
    packages.forEach((pkg) => {
      packageNames.add(pkg.name);

      const key = toPackageKey(pkg);
      const existingPackage = exactPackages.get(key) || {
        name: pkg.name,
        version: pkg.version,
        sources: [],
      };

      if (!existingPackage.sources.includes(source)) {
        existingPackage.sources.push(source);
      }

      exactPackages.set(key, existingPackage);
    });
  }

  addPackages(manifestPackages, 'manifest');
  addPackages(lockfilePackages, 'lockfile');
  addPackages(installedPackages, 'installed');

  return {
    packageNames,
    exactPackages: Array.from(exactPackages.values()),
  };
}

function getProjectDependencyState(options = {}) {
  const { manifestPath, lockfilePath, includeInstalled = true } = options;
  const manifest = readProjectManifest(manifestPath);
  const manifestDependencyNames = getManifestDependencyNames(manifest);
  const manifestPackages = getExactManifestPackages(manifest);
  const lockfilePackages = getPackagesFromPnpmLockfile(lockfilePath);

  let installedPackages = [];
  let installedError = null;
  if (includeInstalled) {
    try {
      installedPackages = getInstalledPackages();
    } catch (error) {
      installedError = error;
    }
  }

  return {
    ...createProjectDependencyState({
      manifestDependencyNames,
      manifestPackages,
      lockfilePackages,
      installedPackages,
    }),
    installedError,
  };
}

/**
 * Extract all packages from pnpm list JSON output
 * @param {Array} packages - JSON array from pnpm list --json
 * @returns {Array<{name: string, version: string}>} Array of all installed packages
 */
function extractAllPackages(packages) {
  const allPackages = new Map();

  function traverse(deps) {
    if (!deps) return;

    Object.entries(deps).forEach(([name, pkg]) => {
      if (pkg.version) {
        const key = `${name}@${pkg.version}`;
        if (!allPackages.has(key)) {
          allPackages.set(key, { name, version: pkg.version });
        }
      }
      if (pkg.dependencies) {
        traverse(pkg.dependencies);
      }
    });
  }

  packages.forEach((pkg) => {
    if (pkg.dependencies) traverse(pkg.dependencies);
    if (pkg.devDependencies) traverse(pkg.devDependencies);
  });

  return Array.from(allPackages.values());
}

/**
 * Get all installed packages from pnpm
 * @param {Object} options - Options for pnpm list command
 * @param {number} options.maxBuffer - Maximum buffer size (default: 10MB)
 * @returns {Array<{name: string, version: string}>} Array of all installed packages
 */
function getInstalledPackages(options = {}) {
  const { maxBuffer = DEFAULT_MAX_BUFFER_SIZE } = options;

  const output = execSync('pnpm list --recursive --depth=Infinity --json', {
    encoding: 'utf8',
    cwd: ROOT_DIR,
    stdio: 'pipe',
    maxBuffer,
  });

  const packages = JSON.parse(output);
  return extractAllPackages(packages);
}

/**
 * Check if a package matches a compromised entry
 * @param {{name: string, version: string}} pkg - Package to check
 * @param {{name: string, version: string|null}} compromised - Compromised entry to match against
 * @returns {boolean} True if package matches compromised entry
 */
function isCompromised(pkg, compromised) {
  if (pkg.name !== compromised.name) return false;

  // If version is specified in compromised list, must match exactly
  if (compromised.version) {
    return pkg.version === compromised.version;
  }

  // If no version specified, any version of the package is considered compromised
  return true;
}

/**
 * Build a fast lookup table for compromised entries keyed by name and version.
 * @param {Array<{name: string, version: string|null, original: string}>} compromisedPackages - Parsed compromised entries
 * @returns {Map<string, Map<string, string>>} Lookup keyed by package name, then version or wildcard
 */
function buildCompromisedLookup(compromisedPackages) {
  const compromisedLookup = new Map();

  compromisedPackages.forEach((compromisedPackage) => {
    const versionKey = compromisedPackage.version ?? ANY_VERSION;
    if (!compromisedLookup.has(compromisedPackage.name)) {
      compromisedLookup.set(compromisedPackage.name, new Map());
    }
    compromisedLookup.get(compromisedPackage.name).set(versionKey, compromisedPackage.original);
  });

  return compromisedLookup;
}

/**
 * Find the compromised entry that matches an installed package.
 * @param {{name: string, version: string}} pkg - Installed package to check
 * @param {Map<string, Map<string, string>>} compromisedLookup - Lookup created by buildCompromisedLookup
 * @returns {string|null} Original compromised entry string, or null if no match exists
 */
function findCompromisedMatch(pkg, compromisedLookup) {
  const compromisedVersions = compromisedLookup.get(pkg.name);
  if (!compromisedVersions) {
    return null;
  }

  return compromisedVersions.get(pkg.version) ?? compromisedVersions.get(ANY_VERSION) ?? null;
}

/**
 * Check if two package strings represent the same package (duplicate detection)
 *
 * Handles version-specific and version-agnostic comparisons:
 * - Same package@version → duplicate
 * - Package-only vs package@version → duplicate (package-only is less specific)
 * - Different versions → not duplicate
 * - Both package-only → not duplicate (could be intentional)
 *
 * @param {string} pkg1 - First package string (format: "package@version" or "package")
 * @param {string} pkg2 - Second package string (format: "package@version" or "package")
 * @returns {boolean} True if packages are considered duplicates
 *
 * @example
 * isPackageDuplicate('package@1.0.0', 'package@1.0.0') // true
 * isPackageDuplicate('package', 'package@1.0.0') // true (package-only is duplicate)
 * isPackageDuplicate('package@1.0.0', 'package') // false (version-specific is not duplicate of package-only)
 * isPackageDuplicate('package@1.0.0', 'package@2.0.0') // false (different versions)
 */
function isPackageDuplicate(pkg1, pkg2) {
  const { name: name1, version: version1 } = parsePackageNameVersion(pkg1);
  const { name: name2, version: version2 } = parsePackageNameVersion(pkg2);

  if (name1 !== name2) return false;

  // If both have versions and they match exactly, they're duplicates
  if (version1 && version2 && version1 === version2) {
    return true;
  }

  // If one is package-only (no version) and the other has a version,
  // the package-only entry is less specific, so we consider it a duplicate
  // when the version-specific one exists
  if (!version1 && version2) {
    return true; // pkg1 is package-only, pkg2 has version
  }

  // If both are package-only or have different versions, they're not duplicates
  return false;
}

/**
 * Write packages array to file
 * @param {string} filePath - Path to write file
 * @param {string[]} packages - Array of package strings to write
 */
function writePackagesToFile(filePath, packages) {
  const content = `${packages.join('\n')}\n`;
  fs.writeFileSync(filePath, content, 'utf8');
}

module.exports = {
  DEFAULT_COMPROMISED_FILE,
  ROOT_DIR,
  ANY_VERSION,
  MANIFEST_DEPENDENCY_FIELDS,
  getCompromisedFilePath,
  findVersionSeparatorIndex,
  parsePackageNameVersion,
  readPackageEntries,
  toCompromisedEntry,
  toPackageKey,
  parseCompromisedPackages,
  parseExistingPackages,
  readProjectManifest,
  getManifestDependencyNames,
  isExactVersionSpecifier,
  getOverridePackageName,
  getManifestOverrideEntries,
  getExactManifestPackages,
  normalizeResolvedVersion,
  stripPeerDependencySuffix,
  stripYamlQuotes,
  getPackagesFromPnpmLockfileContent,
  getPackagesFromPnpmLockfile,
  createProjectDependencyState,
  getProjectDependencyState,
  extractAllPackages,
  getInstalledPackages,
  isCompromised,
  buildCompromisedLookup,
  findCompromisedMatch,
  isPackageDuplicate,
  writePackagesToFile,
};
