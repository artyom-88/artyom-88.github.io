const fs = require('node:fs');
const path = require('node:path');

const { DEFAULT_COMPROMISED_FILE } = require('./compromised-script-constants');
const { getCompromisedFilePath } = require('./compromised-path-safety');
const { parsePackageNameVersion } = require('./compromised-package-entry');

function isScopedPackageSpecifier(arg) {
  if (typeof arg !== 'string' || !arg.startsWith('@') || arg.includes('\\')) {
    return false;
  }

  const { name } = parsePackageNameVersion(arg);
  if (typeof name !== 'string') {
    return false;
  }

  const separatorIndex = name.indexOf('/');
  return separatorIndex > 1 && separatorIndex === name.lastIndexOf('/');
}

function isFilePath(arg) {
  if (isScopedPackageSpecifier(arg)) {
    return false;
  }

  return arg.endsWith('.txt') || arg.includes('/') || arg.includes('\\') || fs.existsSync(path.resolve(process.cwd(), arg));
}

function isPackageName(arg) {
  return arg.includes('@') || /^[@a-z0-9][@a-z0-9._-]*$/i.test(arg);
}

function isConfirmedPackageEntry(packageEntry) {
  return Boolean(parsePackageNameVersion(packageEntry).version);
}

function validateManualPackages(packagesToAdd, projectPackageNames) {
  const invalidPackages = packagesToAdd.filter((packageEntry) => !isConfirmedPackageEntry(packageEntry));
  if (invalidPackages.length > 0) {
    throw new Error(`Manual package additions must use exact package@version entries: ${invalidPackages.join(', ')}`);
  }

  const outOfScopePackages = packagesToAdd.filter((packageEntry) => {
    const { name } = parsePackageNameVersion(packageEntry);
    return !projectPackageNames.has(name);
  });
  if (outOfScopePackages.length > 0) {
    throw new Error(
      `Manual package additions must reference packages from the current project dependency graph: ${outOfScopePackages.join(', ')}`,
    );
  }
}

function partitionProjectScopedPackageEntries(packageEntries, projectPackageNames) {
  return Array.from(packageEntries).reduce(
    (result, packageEntry) => {
      if (!isConfirmedPackageEntry(packageEntry)) {
        result.removedNonExact.push(packageEntry);
        return result;
      }

      const { name } = parsePackageNameVersion(packageEntry);
      if (!projectPackageNames.has(name)) {
        result.removedOutOfScope.push(packageEntry);
        return result;
      }

      result.confirmedPackages.add(packageEntry);
      return result;
    },
    {
      confirmedPackages: new Set(),
      removedNonExact: [],
      removedOutOfScope: [],
    },
  );
}

function logDependencyStateSource(projectDependencyState) {
  if (projectDependencyState.installedError) {
    console.log('ℹ️  Installed dependency tree unavailable or stale, using package.json + pnpm-lock.yaml project scope');
    return;
  }

  console.log('ℹ️  Using package.json + pnpm-lock.yaml + installed dependency tree project scope');
}

function resolveOutputFilePath(filePathArg) {
  return getCompromisedFilePath(filePathArg ? [filePathArg] : [], DEFAULT_COMPROMISED_FILE);
}

function parseArguments(args = process.argv.slice(2)) {
  let filePath = null;
  const packagesToAdd = [];
  let fetchFromAPI = true;
  let i = 0;

  while (i < args.length) {
    const arg = args[i];

    if (arg === '--no-fetch' || arg === '-n') {
      fetchFromAPI = false;
      i++;
      continue;
    }

    if (arg === '--file' || arg === '-f') {
      if (i + 1 >= args.length) {
        throw new Error(`Flag ${arg} requires a value`);
      }
      filePath = args[++i];
      i++;
      continue;
    }

    if (arg.startsWith('--')) {
      console.warn(`⚠️  Unknown flag: ${arg}. Skipping...`);
      i++;
      continue;
    }

    if (!filePath && isFilePath(arg)) {
      filePath = arg;
      i++;
      continue;
    }

    if (isPackageName(arg)) {
      packagesToAdd.push(arg);
      i++;
      continue;
    }

    if (!filePath) {
      filePath = arg;
    } else {
      packagesToAdd.push(arg);
    }
    i++;
  }

  return {
    filePath: resolveOutputFilePath(filePath),
    packagesToAdd,
    fetchFromAPI,
  };
}

module.exports = {
  isConfirmedPackageEntry,
  isFilePath,
  isPackageName,
  isScopedPackageSpecifier,
  logDependencyStateSource,
  parseArguments,
  partitionProjectScopedPackageEntries,
  resolveOutputFilePath,
  validateManualPackages,
};
