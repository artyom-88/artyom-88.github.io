#!/usr/bin/env node

/**
 * Utility functions for compromised packages scripts
 * Shared functionality for checking and updating compromised packages
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');

/**
 * Get compromised file path from command line argument or use default
 * @param {string[]} args - Command line arguments (defaults to process.argv.slice(2))
 * @param {string} defaultFile - Default filename (defaults to 'compromised.txt')
 * @returns {string} Absolute path to compromised packages file
 */
function getCompromisedFilePath(args = process.argv.slice(2), defaultFile = 'compromised.txt') {
  if (args.length > 0) {
    const filePath = args[0];
    // If relative path, resolve from project root
    if (path.isAbsolute(filePath)) {
      return filePath;
    }
    return path.resolve(ROOT_DIR, filePath);
  }

  // Default to compromised.txt in project root
  return path.join(ROOT_DIR, defaultFile);
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

  if (packageString.includes('@')) {
    const [name, ...versionParts] = packageString.split('@');
    const version = versionParts.join('@'); // Handle scoped packages like @scope/package@version
    return { name, version: version || null };
  }

  return { name: packageString, version: null };
}

/**
 * Parse compromised packages from file into structured format
 * Returns array of objects with name, version, and original string
 * @param {string} filePath - Path to compromised packages file
 * @returns {Array<{name: string, version: string|null, original: string}>} Array of compromised package entries
 */
function parseCompromisedPackages(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Error: ${filePath} not found`);
    process.exit(1);
  }

  const content = fs.readFileSync(filePath, 'utf8');
  return content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const { name, version } = parsePackageNameVersion(line);
      return { name, version, original: line };
    });
}

/**
 * Parse existing compromised packages from file into Set
 * Returns Set of package strings (package@version or just package)
 * @param {string} filePath - Path to compromised packages file
 * @returns {Set<string>} Set of package entries
 */
function parseExistingPackages(filePath) {
  if (!fs.existsSync(filePath)) {
    return new Set();
  }

  const content = fs.readFileSync(filePath, 'utf8');
  return new Set(
    content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#')),
  );
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
  const { maxBuffer = 10 * 1024 * 1024 } = options;

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
 * Check if two package strings represent the same package
 * Handles version-specific and version-agnostic comparisons
 * @param {string} pkg1 - First package string (package@version or package)
 * @param {string} pkg2 - Second package string (package@version or package)
 * @returns {boolean} True if packages are duplicates
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
  const content = packages.join('\n') + '\n';
  fs.writeFileSync(filePath, content, 'utf8');
}

module.exports = {
  ROOT_DIR,
  getCompromisedFilePath,
  parsePackageNameVersion,
  parseCompromisedPackages,
  parseExistingPackages,
  extractAllPackages,
  getInstalledPackages,
  isCompromised,
  isPackageDuplicate,
  writePackagesToFile,
};
