const { isPackageDuplicate, parsePackageNameVersion } = require('./compromised-package-entry');
const { extractNpmPackageEntries, fetchAdvisoryRefreshData, isWithdrawnAdvisory } = require('./compromised-advisory-processing');
const { getNormalizedExactVersions, versionSatisfiesRange } = require('./compromised-version-range');

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

function isPackageEntryConfirmedByAdvisories(packageEntry, advisories) {
  const { name, version } = parsePackageNameVersion(packageEntry);
  if (!name || !version || !Array.isArray(advisories)) {
    return false;
  }

  return advisories.some((advisory) => {
    if (isWithdrawnAdvisory(advisory)) {
      return false;
    }

    return extractNpmPackageEntries(advisory).some(({ packageName, vulnerableVersionRange, vulnerableVersions }) => {
      if (packageName !== name) {
        return false;
      }

      if (vulnerableVersionRange && versionSatisfiesRange(version, vulnerableVersionRange)) {
        return true;
      }

      return getNormalizedExactVersions(vulnerableVersions).includes(version);
    });
  });
}

function filterExistingPackagesForRefresh(existingPackages, advisories, fetchFromAPI, manualPackages = new Set()) {
  if (!fetchFromAPI || !Array.isArray(advisories)) {
    return {
      preservedPackages: new Set(existingPackages),
      removedStaleConfirmed: [],
    };
  }
  const removedStaleConfirmed = [];
  const preservedPackages = new Set();

  existingPackages.forEach((packageEntry) => {
    if (manualPackages.has(packageEntry)) {
      preservedPackages.add(packageEntry);
      return;
    }

    if (isPackageEntryConfirmedByAdvisories(packageEntry, advisories)) {
      preservedPackages.add(packageEntry);
      return;
    }

    removedStaleConfirmed.push(packageEntry);
  });

  return {
    preservedPackages,
    removedStaleConfirmed,
  };
}

function collectNewPackages(packagesToAdd, fetchFromAPI, projectDependencyState, validateManualPackages) {
  validateManualPackages(packagesToAdd, projectDependencyState.packageNames);
  const newPackages = [...packagesToAdd];

  if (packagesToAdd.length > 0) {
    console.log(`📦 Adding ${packagesToAdd.length} manually specified package(s)...`);
  }

  if (!fetchFromAPI) {
    return Promise.resolve({ newPackages, advisories: null });
  }

  return fetchAdvisoryRefreshData(projectDependencyState)
    .then(({ advisories, packages }) => {
      newPackages.push(...packages);
      return { newPackages, advisories };
    })
    .catch((error) => {
      console.error(`❌ Failed to fetch from API: ${error.message}`);
      if (packagesToAdd.length === 0) {
        throw new Error('No packages to add and API fetch failed');
      }
      return { newPackages, advisories: null };
    });
}

module.exports = {
  collectNewPackages,
  filterExistingPackagesForRefresh,
  isPackageEntryConfirmedByAdvisories,
  mergePackages,
};
