const { RATE_LIMIT_ERROR, fetchGitHubAdvisories } = require('./compromised-github-advisories');
const {
  getExplicitVersionEntries,
  getMatchingProjectEntriesForRange,
  warnSkippedNonExactAdvisory,
} = require('./compromised-version-range');

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

function isWithdrawnAdvisory(advisory) {
  return Boolean(advisory?.withdrawn_at || advisory?.withdrawnAt);
}

function collectPackagesFromAdvisories(advisories, projectDependencyState) {
  const vulnerablePackages = new Set();
  let skippedNonExact = 0;
  let skippedOutOfScope = 0;

  advisories.forEach((advisory) => {
    if (isWithdrawnAdvisory(advisory)) {
      return;
    }

    extractNpmPackageEntries(advisory).forEach(({ packageName, vulnerableVersionRange, vulnerableVersions }) => {
      if (vulnerableVersionRange) {
        if (!projectDependencyState.packageNames.has(packageName)) {
          skippedOutOfScope++;
          return;
        }

        const exactEntries = getMatchingProjectEntriesForRange(packageName, vulnerableVersionRange, projectDependencyState);
        if (exactEntries.length === 0) {
          warnSkippedNonExactAdvisory(packageName, vulnerableVersionRange);
          skippedNonExact++;
          return;
        }

        exactEntries.forEach((entry) => {
          vulnerablePackages.add(entry);
        });
        return;
      }

      if (vulnerableVersions) {
        const { exactEntries, skippedNonExact: skippedVersionEntries } = getExplicitVersionEntries(
          packageName,
          vulnerableVersions,
        );
        skippedNonExact += skippedVersionEntries;

        if (!projectDependencyState.packageNames.has(packageName)) {
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

async function fetchFromKnownVulnerabilities() {
  console.log('📋 Using curated list of known compromised packages...');

  const knownVulnerable = [];

  console.log(`✅ Found ${knownVulnerable.length} packages from curated list`);
  return knownVulnerable;
}

async function getFallbackPackagesOrThrow(reason) {
  console.log(`🔄 Using fallback method${reason ? `: ${reason}` : ''}`);
  const fallbackPackages = await fetchFromKnownVulnerabilities();

  if (fallbackPackages.length === 0) {
    throw new Error('GitHub advisory refresh failed and the curated fallback list is empty');
  }

  return fallbackPackages;
}

async function fetchAdvisoryRefreshData(projectDependencyState) {
  const advisories = await fetchGitHubAdvisories();
  if (!Array.isArray(advisories) || advisories.length === 0) {
    console.warn('⚠️  No advisories found from GitHub.');
    return {
      advisories: null,
      packages: await getFallbackPackagesOrThrow('no GitHub advisories returned'),
    };
  }

  const { packages, count, skippedNonExact, skippedOutOfScope } = collectPackagesFromAdvisories(
    advisories,
    projectDependencyState,
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

  return {
    advisories,
    packages,
  };
}

async function fetchVulnerablePackages(projectDependencyState) {
  console.log('🔍 Fetching vulnerable packages from GitHub Security Advisories...');

  try {
    return (await fetchAdvisoryRefreshData(projectDependencyState)).packages;
  } catch (error) {
    if (error.message === RATE_LIMIT_ERROR) {
      return await getFallbackPackagesOrThrow('GitHub rate limit reached');
    }
    console.error('❌ Error fetching from GitHub API:', error.message);
    return await getFallbackPackagesOrThrow('GitHub advisory request failed');
  }
}

module.exports = {
  collectPackagesFromAdvisories,
  extractNpmPackageEntries,
  fetchAdvisoryRefreshData,
  fetchFromKnownVulnerabilities,
  fetchVulnerablePackages,
  getFallbackPackagesOrThrow,
  isWithdrawnAdvisory,
};
