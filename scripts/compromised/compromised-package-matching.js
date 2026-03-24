const { ANY_VERSION } = require('./compromised-script-constants');

function isCompromised(pkg, compromised) {
  if (pkg.name !== compromised.name) return false;

  if (compromised.version) {
    return pkg.version === compromised.version;
  }

  return true;
}

function buildCompromisedLookup(compromisedPackages) {
  const compromisedLookup = new Map();

  compromisedPackages.forEach((compromisedPackage) => {
    const versionKey = compromisedPackage.version ?? ANY_VERSION;
    if (!compromisedLookup.has(compromisedPackage.name)) {
      compromisedLookup.set(compromisedPackage.name, new Map());
    }
    compromisedLookup.get(compromisedPackage.name).set(versionKey, compromisedPackage.original);
  });

  return compromisedLookup;
}

function findCompromisedMatch(pkg, compromisedLookup) {
  const compromisedVersions = compromisedLookup.get(pkg.name);
  if (!compromisedVersions) {
    return null;
  }

  return compromisedVersions.get(pkg.version) ?? compromisedVersions.get(ANY_VERSION) ?? null;
}

module.exports = {
  buildCompromisedLookup,
  findCompromisedMatch,
  isCompromised,
};
