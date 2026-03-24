#!/usr/bin/env node

/**
 * Security script to check for compromised packages in the dependency tree
 * Compares installed packages against a list of known compromised packages
 *
 * Usage:
 *   node scripts/check-compromised.js [compromised-file]
 *
 * Arguments:
 *   compromised-file  Optional. Path to file containing compromised packages list.
 *                     Defaults to 'compromised.txt' in project root.
 *                     Can be relative or absolute path.
 *
 * Example:
 *   node scripts/check-compromised.js
 *   node scripts/check-compromised.js compromised.txt
 *   node scripts/check-compromised.js ./security/compromised-packages.txt
 *   node scripts/check-compromised.js /absolute/path/to/compromised.txt
 */

const path = require('node:path');
const {
  buildCompromisedLookup,
  findCompromisedMatch,
  getCompromisedFilePath,
  getProjectDependencyState,
  parseCompromisedPackages,
} = require('./compromised-utils');

/**
 * Find installed packages that match the compromised package list.
 * @param {Array<{name: string, version: string}>} installedPackages - Installed packages from pnpm
 * @param {Map<string, Map<string, string>>} compromisedLookup - Lookup built from compromised entries
 * @returns {Array<{package: string, compromised: string}>} Matched packages with the entry they matched
 */
function findCompromisedPackages(projectPackages, compromisedLookup) {
  return projectPackages.reduce((matches, pkg) => {
    const matchedEntry = findCompromisedMatch(pkg, compromisedLookup);
    if (matchedEntry) {
      const match = {
        package: `${pkg.name}@${pkg.version}`,
        compromised: matchedEntry,
      };
      if (pkg.sources) {
        match.sources = pkg.sources;
      }
      matches.push(match);
    }
    return matches;
  }, []);
}

function formatPackageSources(sources = []) {
  if (sources.length === 0) {
    return '';
  }

  return ` [sources: ${sources.join(', ')}]`;
}

/**
 * Print scan results and return the exit code for the CLI.
 * @param {Array<{package: string, compromised: string, sources?: string[]}>} foundPackages - Compromised packages found in the tree
 * @returns {number} Process exit code
 */
function reportResults(foundPackages) {
  if (foundPackages.length === 0) {
    console.log('✅ No compromised packages found in dependency tree');
    return 0;
  }

  console.error('\n❌ SECURITY ALERT: Found compromised packages in dependency tree:\n');
  foundPackages.forEach(({ package: pkg, compromised, sources }) => {
    console.error(`  ⚠️  ${pkg} (matches: ${compromised})${formatPackageSources(sources)}`);
  });
  console.error('\n🚨 Action required: Remove or update these packages immediately!\n');
  return 1;
}

function assertCompromisedPackagesDefined(compromisedPackages, compromisedFilePath) {
  if (compromisedPackages.length === 0) {
    throw new Error(
      `No compromised packages defined in ${path.basename(compromisedFilePath)}. Empty lists are treated as configuration errors.`,
    );
  }
}

/**
 * Main function
 */
function main() {
  try {
    const compromisedFilePath = getCompromisedFilePath();
    const compromisedPackages = parseCompromisedPackages(compromisedFilePath);
    assertCompromisedPackagesDefined(compromisedPackages, compromisedFilePath);

    console.log(`📋 Using compromised packages list: ${compromisedFilePath}`);
    console.log('🔍 Scanning project dependency state for compromised packages...');

    const projectDependencyState = getProjectDependencyState();
    if (projectDependencyState.installedError) {
      console.log('ℹ️  Installed dependency tree unavailable or stale, using package.json + pnpm-lock.yaml + manifest state');
    }
    const compromisedLookup = buildCompromisedLookup(compromisedPackages);
    const foundPackages = findCompromisedPackages(projectDependencyState.exactPackages, compromisedLookup);

    process.exit(reportResults(foundPackages));
  } catch (error) {
    console.error('❌ Error checking for compromised packages:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  assertCompromisedPackagesDefined,
  findCompromisedPackages,
  main,
  reportResults,
};
