const { execSync } = require('node:child_process');
const path = require('node:path');

const { ROOT_DIR } = require('./compromised/compromised-script-constants');
const { parseCompromisedPackageFile } = require('./compromised/compromised-package-file');

const DEFAULT_COMPROMISED_REFRESH_MAX_AGE_MS = 24 * 60 * 60 * 1000;

function shouldSkipPreinstallSecurity(env = process.env) {
  return env.CI === 'true' || env.SKIP_PREINSTALL_SECURITY === '1' || env.SKIP_PREINSTALL_SECURITY === 'true';
}

function getCompromisedRefreshMaxAgeMs(env = process.env) {
  const configuredValue = env.COMPROMISED_REFRESH_MAX_AGE_MS;
  const parsedValue = Number(configuredValue);

  if (!Number.isFinite(parsedValue) || parsedValue < 0) {
    return DEFAULT_COMPROMISED_REFRESH_MAX_AGE_MS;
  }

  return parsedValue;
}

function shouldRefreshCompromisedPackages(options = {}) {
  const { env = process.env, now = Date.now(), readFileState = parseCompromisedPackageFile } = options;
  const compromisedFilePath = path.join(ROOT_DIR, 'compromised.txt');

  try {
    const { refreshedAt } = readFileState(compromisedFilePath, { allowMissing: true });
    const refreshedAtMs = refreshedAt ? Date.parse(refreshedAt) : Number.NaN;
    const maxAgeMs = getCompromisedRefreshMaxAgeMs(env);
    const fileAgeMs = now - refreshedAtMs;

    if (!Number.isFinite(refreshedAtMs) || fileAgeMs < 0) {
      return true;
    }

    return fileAgeMs > maxAgeMs;
  } catch {
    return true;
  }
}

function runCommand(command, options = {}) {
  const { exec = execSync } = options;

  exec(command, {
    cwd: ROOT_DIR,
    stdio: 'inherit',
  });
}

function runPreinstall(options = {}) {
  const { env = process.env } = options;

  if (shouldSkipPreinstallSecurity(env)) {
    console.log('ℹ️  Skipping preinstall security checks in CI');
    return;
  }

  runCommand('npx --yes only-allow@1.2.2 pnpm', options);

  if (shouldRefreshCompromisedPackages(options)) {
    console.log('🔄 Refreshing compromised package data before install');
    runCommand('pnpm compromised:update', options);
  } else {
    console.log('ℹ️  Skipping compromised package refresh: compromised.txt was updated recently');
  }

  runCommand('pnpm compromised:check', options);
}

function main() {
  try {
    runPreinstall();
  } catch (error) {
    if (typeof error.status === 'number') {
      process.exit(error.status);
    }

    throw error;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  DEFAULT_COMPROMISED_REFRESH_MAX_AGE_MS,
  getCompromisedRefreshMaxAgeMs,
  main,
  runCommand,
  runPreinstall,
  shouldRefreshCompromisedPackages,
  shouldSkipPreinstallSecurity,
};
