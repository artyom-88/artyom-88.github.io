const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const { DEFAULT_MAX_BUFFER_SIZE, MANIFEST_DEPENDENCY_FIELDS, ROOT_DIR } = require('./compromised-script-constants');
const { isExactVersionSpecifier, parsePackageNameVersion, toPackageKey } = require('./compromised-package-entry');

function readProjectManifest(filePath = path.join(ROOT_DIR, 'package.json')) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
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

function getManifestDependencyNames(manifest = readProjectManifest()) {
  return new Set([
    ...MANIFEST_DEPENDENCY_FIELDS.flatMap((field) => Object.keys(manifest[field] || {})),
    ...getManifestOverrideEntries(manifest).map(({ name }) => name),
  ]);
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

module.exports = {
  createProjectDependencyState,
  extractAllPackages,
  getExactManifestPackages,
  getInstalledPackages,
  getManifestDependencyNames,
  getManifestOverrideEntries,
  getOverridePackageName,
  getPackagesFromPnpmLockfile,
  getPackagesFromPnpmLockfileContent,
  getProjectDependencyState,
  normalizeResolvedVersion,
  readProjectManifest,
  stripPeerDependencySuffix,
  stripYamlQuotes,
};
