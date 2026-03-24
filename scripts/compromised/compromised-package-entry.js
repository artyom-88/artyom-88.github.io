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

function toCompromisedEntry(packageEntry) {
  const { name, version } = parsePackageNameVersion(packageEntry);
  return { name, version, original: packageEntry };
}

function toPackageKey(pkg) {
  return `${pkg.name}@${pkg.version}`;
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

function isPackageDuplicate(pkg1, pkg2) {
  const { name: name1, version: version1 } = parsePackageNameVersion(pkg1);
  const { name: name2, version: version2 } = parsePackageNameVersion(pkg2);

  if (name1 !== name2) return false;

  if (version1 && version2 && version1 === version2) {
    return true;
  }

  if (!version1 && version2) {
    return true;
  }

  return false;
}

module.exports = {
  findVersionSeparatorIndex,
  isExactVersionSpecifier,
  isPackageDuplicate,
  parsePackageNameVersion,
  toCompromisedEntry,
  toPackageKey,
};
