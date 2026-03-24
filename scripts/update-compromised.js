#!/usr/bin/env node

/**
 * Script to update the list of compromised packages.
 * The implementation is split across scripts/compromised/ modules so this file
 * stays focused on CLI orchestration and backward-compatible exports.
 */

const path = require('node:path');

const { parseCompromisedPackageFile, writePackagesToFile } = require('./compromised/compromised-package-file');
const { getProjectDependencyState } = require('./compromised/compromised-project-state');
const {
  logDependencyStateSource,
  parseArguments,
  partitionProjectScopedPackageEntries,
  validateManualPackages,
} = require('./compromised/compromised-update-cli');
const {
  collectNewPackages,
  filterExistingPackagesForRefresh,
  mergePackages,
} = require('./compromised/compromised-refresh-policy');

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

function assertUpdatedPackagesDefined(outputFilePath, packages) {
  if (packages.length === 0) {
    throw new Error(
      `Refusing to write an empty ${path.basename(outputFilePath)}. Empty lists are treated as configuration errors.`,
    );
  }
}

function arePackageEntrySetsEqual(leftEntries, rightEntries) {
  if (leftEntries.size !== rightEntries.size) {
    return false;
  }

  return [...leftEntries].every((packageEntry) => rightEntries.has(packageEntry));
}

function shouldWriteUpdatedPackages(packages, existingPackages, manualPackages, existingManualPackages, removedCounts) {
  if (removedCounts.some((count) => count > 0)) {
    return true;
  }

  if (!arePackageEntrySetsEqual(new Set(packages), existingPackages)) {
    return true;
  }

  return !arePackageEntrySetsEqual(manualPackages, existingManualPackages);
}

async function main() {
  try {
    const { filePath: outputFilePath, packagesToAdd, fetchFromAPI } = parseArguments();
    console.log(`📝 Output file: ${outputFilePath}`);
    const projectDependencyState = getProjectDependencyState();
    logDependencyStateSource(projectDependencyState);
    console.log(`📦 Project dependency scope includes ${projectDependencyState.packageNames.size} package name(s)`);

    const existingFileState = parseCompromisedPackageFile(outputFilePath, { allowMissing: true });
    const existingEntries = new Set(existingFileState.packageEntries);
    const {
      confirmedPackages: existingPackages,
      removedNonExact,
      removedOutOfScope,
    } = partitionProjectScopedPackageEntries(existingEntries, projectDependencyState.packageNames);
    const existingManualPackages = new Set(
      [...existingFileState.manualPackages].filter((packageEntry) => existingPackages.has(packageEntry)),
    );
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

    const { newPackages, advisories } = await collectNewPackages(
      packagesToAdd,
      fetchFromAPI,
      projectDependencyState,
      validateManualPackages,
    );
    const { preservedPackages: packagesToPreserve, removedStaleConfirmed } = filterExistingPackagesForRefresh(
      existingPackages,
      advisories,
      fetchFromAPI,
      existingManualPackages,
    );
    if (removedStaleConfirmed.length > 0) {
      console.log(
        `🧹 Will remove ${removedStaleConfirmed.length} stale existing entr${
          removedStaleConfirmed.length === 1 ? 'y' : 'ies'
        } that are no longer confirmed by the latest advisory refresh`,
      );
    }

    const { packages, added, skipped } = mergePackages(packagesToPreserve, newPackages);
    const manualPackages = new Set(
      [...existingManualPackages, ...packagesToAdd].filter((packageEntry) => packages.includes(packageEntry)),
    );
    const removedCounts = [removedNonExact.length, removedOutOfScope.length, removedStaleConfirmed.length];
    assertUpdatedPackagesDefined(outputFilePath, packages);
    if (!shouldWriteUpdatedPackages(packages, existingPackages, manualPackages, existingManualPackages, removedCounts)) {
      console.log('ℹ️  No semantic changes to compromised.txt');
      process.exit(0);
    }

    const preservedCount = packages.filter((packageEntry) => existingPackages.has(packageEntry)).length;

    writePackagesToFile(outputFilePath, packages, {
      manualPackages,
    });
    logUpdateSummary(
      outputFilePath,
      packages,
      preservedCount,
      added,
      skipped,
      removedNonExact.length + removedOutOfScope.length + removedStaleConfirmed.length,
    );
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
  arePackageEntrySetsEqual,
  assertUpdatedPackagesDefined,
  logUpdateSummary,
  main,
  shouldWriteUpdatedPackages,
};
