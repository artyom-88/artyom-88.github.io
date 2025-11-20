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
const { getCompromisedFilePath, parseCompromisedPackages, getInstalledPackages, isCompromised } = require('./compromised-utils');

/**
 * Main function
 */
function main() {
  try {
    const compromisedFilePath = getCompromisedFilePath();

    // Read compromised packages list
    const compromised = parseCompromisedPackages(compromisedFilePath);

    if (compromised.length === 0) {
      console.log(`⚠️  Warning: No compromised packages defined in ${path.basename(compromisedFilePath)}`);
      process.exit(0);
    }

    console.log(`📋 Using compromised packages list: ${compromisedFilePath}`);

    // Get all installed packages
    console.log('🔍 Scanning dependency tree for compromised packages...');
    const allPackages = getInstalledPackages();

    // Check for compromised packages
    const found = [];

    compromised.forEach((comp) => {
      allPackages.forEach((pkg) => {
        if (isCompromised(pkg, comp)) {
          found.push({
            package: `${pkg.name}@${pkg.version}`,
            compromised: comp.original,
          });
        }
      });
    });

    // Report results
    if (found.length > 0) {
      console.error('\n❌ SECURITY ALERT: Found compromised packages in dependency tree:\n');
      found.forEach(({ package: pkg, compromised: comp }) => {
        console.error(`  ⚠️  ${pkg} (matches: ${comp})`);
      });
      console.error('\n🚨 Action required: Remove or update these packages immediately!\n');
      process.exit(1);
    } else {
      console.log('✅ No compromised packages found in dependency tree');
      process.exit(0);
    }
  } catch (error) {
    console.error('❌ Error checking for compromised packages:', error.message);
    process.exit(1);
  }
}

main();
