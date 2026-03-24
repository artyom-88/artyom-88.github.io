function parseComparableVersion(version) {
  if (typeof version !== 'string') {
    return null;
  }

  const trimmedVersion = version.trim().replace(/^v(?=\d)/, '');
  if (!trimmedVersion) {
    return null;
  }

  const [versionWithoutBuildMetadata] = trimmedVersion.split('+');
  const prereleaseSeparatorIndex = versionWithoutBuildMetadata.indexOf('-');
  const releaseVersion =
    prereleaseSeparatorIndex === -1
      ? versionWithoutBuildMetadata
      : versionWithoutBuildMetadata.slice(0, prereleaseSeparatorIndex);
  const prereleaseVersion =
    prereleaseSeparatorIndex === -1 ? '' : versionWithoutBuildMetadata.slice(prereleaseSeparatorIndex + 1);

  const releaseParts = releaseVersion.split('.');
  if (releaseParts.length > 3 || releaseParts.some((part) => !/^\d+$/.test(part))) {
    return null;
  }

  const [major = '0', minor = '0', patch = '0'] = releaseParts;
  const prerelease = prereleaseVersion
    ? prereleaseVersion.split('.').map((part) => (/^\d+$/.test(part) ? Number(part) : part))
    : [];

  return {
    major: Number(major),
    minor: Number(minor),
    patch: Number(patch),
    prerelease,
  };
}

function comparePrereleaseIdentifiers(left, right) {
  const leftIsNumber = typeof left === 'number';
  const rightIsNumber = typeof right === 'number';

  if (leftIsNumber && rightIsNumber) {
    return left - right;
  }

  if (leftIsNumber) {
    return -1;
  }

  if (rightIsNumber) {
    return 1;
  }

  return left.localeCompare(right);
}

function compareComparableVersions(leftVersion, rightVersion) {
  const left = parseComparableVersion(leftVersion);
  const right = parseComparableVersion(rightVersion);

  if (!left || !right) {
    return null;
  }

  if (left.major !== right.major) {
    return left.major - right.major;
  }
  if (left.minor !== right.minor) {
    return left.minor - right.minor;
  }
  if (left.patch !== right.patch) {
    return left.patch - right.patch;
  }

  if (left.prerelease.length === 0 && right.prerelease.length === 0) {
    return 0;
  }
  if (left.prerelease.length === 0) {
    return 1;
  }
  if (right.prerelease.length === 0) {
    return -1;
  }

  const maxLength = Math.max(left.prerelease.length, right.prerelease.length);
  for (let index = 0; index < maxLength; index++) {
    const leftIdentifier = left.prerelease[index];
    const rightIdentifier = right.prerelease[index];

    if (leftIdentifier === undefined) {
      return -1;
    }
    if (rightIdentifier === undefined) {
      return 1;
    }

    const comparison = comparePrereleaseIdentifiers(leftIdentifier, rightIdentifier);
    if (comparison !== 0) {
      return comparison;
    }
  }

  return 0;
}

function getCaretRangeUpperBound(version) {
  const parsedVersion = parseComparableVersion(version);
  if (!parsedVersion) {
    return null;
  }

  if (parsedVersion.major > 0) {
    return `${parsedVersion.major + 1}.0.0`;
  }

  if (parsedVersion.minor > 0) {
    return `0.${parsedVersion.minor + 1}.0`;
  }

  return `0.0.${parsedVersion.patch + 1}`;
}

function getTildeRangeUpperBound(version) {
  const parsedVersion = parseComparableVersion(version);
  if (!parsedVersion) {
    return null;
  }

  return `${parsedVersion.major}.${parsedVersion.minor + 1}.0`;
}

function expandNpmOperatorToken(token) {
  if (!token || token === '*') {
    return [token];
  }

  const operator = token[0];
  if (operator !== '^' && operator !== '~') {
    return [token];
  }

  const version = token.slice(1).trim();
  if (!version) {
    return [];
  }

  const upperBound = operator === '^' ? getCaretRangeUpperBound(version) : getTildeRangeUpperBound(version);
  if (!upperBound) {
    return [token];
  }

  return [`>=${version}`, `<${upperBound}`];
}

function parseRangeComparators(rangeClause) {
  const normalizedClause = rangeClause.trim();
  if (!normalizedClause) {
    return [];
  }

  if (normalizedClause === '*') {
    return [{ operator: '*', version: '*' }];
  }

  const expandedHyphenRanges = normalizedClause.replace(/([0-9A-Za-z.+-]+)\s+-\s+([0-9A-Za-z.+-]+)/g, '>=$1 <=$2');
  const normalizedTokens = expandedHyphenRanges.replace(/(<=|>=|<|>|=|\^|~)\s+/g, '$1');
  const comparatorPattern = /(<=|>=|<|>|=)?\s*([0-9A-Za-z][0-9A-Za-z.+-]*)/g;

  return normalizedTokens
    .split(/\s+/)
    .filter(Boolean)
    .flatMap(expandNpmOperatorToken)
    .flatMap((token) =>
      [...token.matchAll(comparatorPattern)].map((match) => ({
        operator: match[1] || '=',
        version: match[2],
      })),
    );
}

function matchesComparator(version, comparator) {
  if (comparator.operator === '*') {
    return true;
  }

  const comparison = compareComparableVersions(version, comparator.version);
  if (comparison === null) {
    return false;
  }

  switch (comparator.operator) {
    case '<':
      return comparison < 0;
    case '<=':
      return comparison <= 0;
    case '>':
      return comparison > 0;
    case '>=':
      return comparison >= 0;
    case '=':
      return comparison === 0;
    default:
      return false;
  }
}

function versionSatisfiesRange(version, range) {
  if (typeof range !== 'string' || !range.trim()) {
    return false;
  }

  return range
    .split('||')
    .map((rangeClause) => parseRangeComparators(rangeClause.replace(/,/g, ' ')))
    .filter((comparators) => comparators.length > 0)
    .some((comparators) => comparators.every((comparator) => matchesComparator(version, comparator)));
}

function normalizeExactVersionToken(version) {
  if (typeof version !== 'string') {
    return null;
  }

  const normalizedVersion = version.trim().replace(/^=\s*/, '');
  if (!normalizedVersion || normalizedVersion === '*') {
    return null;
  }

  if (/[<>^~|]/.test(normalizedVersion) || normalizedVersion.includes(',') || normalizedVersion.includes(' - ')) {
    return null;
  }

  return parseComparableVersion(normalizedVersion) ? normalizedVersion : null;
}

function isSpecificVersion(version) {
  return normalizeExactVersionToken(version) !== null;
}

function warnSkippedNonExactAdvisory(packageName, versionDescriptor) {
  console.warn(
    `[WARN] Skipping advisory for ${packageName}: '${versionDescriptor}' is not an exact compromised version. Exact-only entries belong in compromised.txt.`,
  );
}

function getExplicitVersionEntries(packageName, vulnerableVersions) {
  const exactEntries = [];
  let skippedNonExact = 0;

  vulnerableVersions
    .split(',')
    .map((version) => version.trim())
    .forEach((version) => {
      const normalizedVersion = normalizeExactVersionToken(version);
      if (normalizedVersion) {
        exactEntries.push(`${packageName}@${normalizedVersion}`);
      } else {
        warnSkippedNonExactAdvisory(packageName, version || '(empty version)');
        skippedNonExact++;
      }
    });

  return { exactEntries, skippedNonExact };
}

function getNormalizedExactVersions(vulnerableVersions) {
  if (typeof vulnerableVersions !== 'string') {
    return [];
  }

  return vulnerableVersions
    .split(',')
    .map((version) => normalizeExactVersionToken(version))
    .filter(Boolean);
}

function getMatchingProjectEntriesForRange(packageName, vulnerableVersionRange, projectDependencyState) {
  return projectDependencyState.exactPackages
    .filter((pkg) => pkg.name === packageName && versionSatisfiesRange(pkg.version, vulnerableVersionRange))
    .map((pkg) => `${pkg.name}@${pkg.version}`);
}

module.exports = {
  compareComparableVersions,
  comparePrereleaseIdentifiers,
  expandNpmOperatorToken,
  getCaretRangeUpperBound,
  getExplicitVersionEntries,
  getMatchingProjectEntriesForRange,
  getNormalizedExactVersions,
  getTildeRangeUpperBound,
  isSpecificVersion,
  matchesComparator,
  normalizeExactVersionToken,
  parseComparableVersion,
  parseRangeComparators,
  versionSatisfiesRange,
  warnSkippedNonExactAdvisory,
};
