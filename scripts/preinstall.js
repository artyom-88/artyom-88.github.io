const { execSync } = require('node:child_process');

const { ROOT_DIR } = require('./compromised/compromised-script-constants');
const {
  computeCompromisedRefreshFingerprint,
  readCompromisedRefreshState,
  shouldRefreshCompromisedFromState,
  writeCompromisedRefreshState,
} = require('./compromised/compromised-refresh-state');

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
  const {
    env = process.env,
    now = Date.now(),
    readRefreshState = readCompromisedRefreshState,
    computeFingerprint = computeCompromisedRefreshFingerprint,
  } = options;

  try {
    const maxAgeMs = getCompromisedRefreshMaxAgeMs(env);
    const refreshState = readRefreshState();
    const dependencyGraphFingerprint = computeFingerprint();

    return shouldRefreshCompromisedFromState(refreshState, dependencyGraphFingerprint, now, maxAgeMs);
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
  const {
    env = process.env,
    now = Date.now(),
    readRefreshState = readCompromisedRefreshState,
    computeFingerprint = computeCompromisedRefreshFingerprint,
    writeRefreshState = writeCompromisedRefreshState,
  } = options;

  if (shouldSkipPreinstallSecurity(env)) {
    console.log('ℹ️  Skipping preinstall security checks in CI');
    return;
  }

  runCommand('npx --yes only-allow@1.2.2 pnpm', options);

  if (
    shouldRefreshCompromisedPackages({
      env,
      now,
      readRefreshState,
      computeFingerprint,
    })
  ) {
    console.log('🔄 Refreshing compromised package data before install');
    runCommand('pnpm compromised:update', options);

    try {
      writeRefreshState({
        refreshedAt: new Date(now).toISOString(),
        dependencyGraphFingerprint: computeFingerprint(),
      });
    } catch (error) {
      console.warn(`⚠️  Unable to persist local compromised refresh state: ${error.message}`);
    }
  } else {
    console.log('ℹ️  Skipping compromised package refresh: dependency graph is still current locally');
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
