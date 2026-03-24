const fs = require('node:fs');

const { toCompromisedEntry } = require('./compromised-package-entry');

function readPackageEntries(filePath, options = {}) {
  const { allowMissing = false } = options;

  if (!fs.existsSync(filePath)) {
    if (allowMissing) {
      return [];
    }
    throw new Error(`Compromised packages file not found: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf8');
  return content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'));
}

function parseCompromisedPackages(filePath) {
  return readPackageEntries(filePath).map(toCompromisedEntry);
}

function parseExistingPackages(filePath) {
  return new Set(readPackageEntries(filePath, { allowMissing: true }));
}

function writePackagesToFile(filePath, packages) {
  const content = `${packages.join('\n')}\n`;
  fs.writeFileSync(filePath, content, 'utf8');
}

module.exports = {
  parseCompromisedPackages,
  parseExistingPackages,
  readPackageEntries,
  writePackagesToFile,
};
