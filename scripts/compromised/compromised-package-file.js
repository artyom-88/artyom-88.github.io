const fs = require('node:fs');

const { COMPROMISED_FILE_MANUAL_ENTRY_PREFIX, COMPROMISED_FILE_REFRESHED_AT_PREFIX } = require('./compromised-script-constants');
const { toCompromisedEntry } = require('./compromised-package-entry');

function createCompromisedPackageFileState() {
  return {
    packageEntries: [],
    refreshedAt: null,
    manualPackages: new Set(),
  };
}

function parseCompromisedPackageFile(filePath, options = {}) {
  const { allowMissing = false } = options;

  if (!fs.existsSync(filePath)) {
    if (allowMissing) {
      return createCompromisedPackageFileState();
    }
    throw new Error(`Compromised packages file not found: ${filePath}`);
  }

  const fileState = createCompromisedPackageFileState();
  const content = fs.readFileSync(filePath, 'utf8');

  content.split('\n').forEach((rawLine) => {
    const line = rawLine.trim();

    if (!line) {
      return;
    }

    if (line.startsWith(COMPROMISED_FILE_REFRESHED_AT_PREFIX)) {
      const refreshedAt = line.slice(COMPROMISED_FILE_REFRESHED_AT_PREFIX.length).trim();
      fileState.refreshedAt = refreshedAt || null;
      return;
    }

    if (line.startsWith(COMPROMISED_FILE_MANUAL_ENTRY_PREFIX)) {
      const manualEntry = line.slice(COMPROMISED_FILE_MANUAL_ENTRY_PREFIX.length).trim();
      if (manualEntry) {
        fileState.manualPackages.add(manualEntry);
      }
      return;
    }

    if (line.startsWith('#')) {
      return;
    }

    fileState.packageEntries.push(line);
  });

  fileState.manualPackages = new Set(
    [...fileState.manualPackages].filter((packageEntry) => fileState.packageEntries.includes(packageEntry)),
  );

  return fileState;
}

function readPackageEntries(filePath, options = {}) {
  return parseCompromisedPackageFile(filePath, options).packageEntries;
}

function parseCompromisedPackages(filePath) {
  return readPackageEntries(filePath).map(toCompromisedEntry);
}

function parseExistingPackages(filePath) {
  return new Set(readPackageEntries(filePath, { allowMissing: true }));
}

function writePackagesToFile(filePath, packages, options = {}) {
  const { refreshedAt = new Date().toISOString(), manualPackages = [] } = options;
  const manualPackageEntries = [...new Set(manualPackages)].filter((packageEntry) => packages.includes(packageEntry)).sort();
  const metadataLines = [];

  if (refreshedAt) {
    metadataLines.push(`${COMPROMISED_FILE_REFRESHED_AT_PREFIX} ${refreshedAt}`);
  }

  manualPackageEntries.forEach((packageEntry) => {
    metadataLines.push(`${COMPROMISED_FILE_MANUAL_ENTRY_PREFIX} ${packageEntry}`);
  });

  const contentLines = metadataLines.length > 0 ? [...metadataLines, '', ...packages] : [...packages];
  const content = `${contentLines.join('\n')}\n`;
  fs.writeFileSync(filePath, content, 'utf8');
}

module.exports = {
  createCompromisedPackageFileState,
  parseCompromisedPackageFile,
  parseCompromisedPackages,
  parseExistingPackages,
  readPackageEntries,
  writePackagesToFile,
};
