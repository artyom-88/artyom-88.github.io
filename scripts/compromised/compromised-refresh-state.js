const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const { DEFAULT_COMPROMISED_REFRESH_STATE_FILE, ROOT_DIR } = require('./compromised-script-constants');

function getCompromisedRefreshStateFilePath(rootDir = ROOT_DIR) {
  return path.join(rootDir, DEFAULT_COMPROMISED_REFRESH_STATE_FILE);
}

function computeCompromisedRefreshFingerprint(rootDir = ROOT_DIR) {
  const manifestContent = fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8');
  const lockfileContent = fs.readFileSync(path.join(rootDir, 'pnpm-lock.yaml'), 'utf8');
  const fingerprintInput = [`package.json:${manifestContent}`, `pnpm-lock.yaml:${lockfileContent}`].join('\n---\n');

  return crypto.createHash('sha256').update(fingerprintInput).digest('hex');
}

function isValidCompromisedRefreshState(value) {
  return Boolean(
    value &&
      typeof value === 'object' &&
      typeof value.refreshedAt === 'string' &&
      value.refreshedAt &&
      typeof value.dependencyGraphFingerprint === 'string' &&
      value.dependencyGraphFingerprint,
  );
}

function readCompromisedRefreshState(filePath = getCompromisedRefreshStateFilePath()) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const parsedValue = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return isValidCompromisedRefreshState(parsedValue) ? parsedValue : null;
}

function writeCompromisedRefreshState(state, filePath = getCompromisedRefreshStateFilePath()) {
  const normalizedState = {
    refreshedAt: state.refreshedAt,
    dependencyGraphFingerprint: state.dependencyGraphFingerprint,
  };

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(normalizedState, null, 2)}\n`, 'utf8');
}

function shouldRefreshCompromisedFromState(state, dependencyGraphFingerprint, now = Date.now(), maxAgeMs = 0) {
  if (!isValidCompromisedRefreshState(state)) {
    return true;
  }

  if (state.dependencyGraphFingerprint !== dependencyGraphFingerprint) {
    return true;
  }

  const refreshedAtMs = Date.parse(state.refreshedAt);
  if (!Number.isFinite(refreshedAtMs)) {
    return true;
  }

  const ageMs = now - refreshedAtMs;
  if (ageMs < 0) {
    return true;
  }

  return ageMs > maxAgeMs;
}

module.exports = {
  computeCompromisedRefreshFingerprint,
  getCompromisedRefreshStateFilePath,
  isValidCompromisedRefreshState,
  readCompromisedRefreshState,
  shouldRefreshCompromisedFromState,
  writeCompromisedRefreshState,
};
