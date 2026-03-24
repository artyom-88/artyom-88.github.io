const { execSync } = require('node:child_process');

const { ROOT_DIR } = require('./compromised/compromised-script-constants');

function shouldSkipPreinstallSecurity(env = process.env) {
  return env.CI === 'true' || env.SKIP_PREINSTALL_SECURITY === '1' || env.SKIP_PREINSTALL_SECURITY === 'true';
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
  runCommand('pnpm compromised:update', options);
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
  main,
  runCommand,
  runPreinstall,
  shouldSkipPreinstallSecurity,
};
