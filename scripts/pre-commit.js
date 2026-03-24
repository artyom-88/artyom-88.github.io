const { execSync } = require('node:child_process');

const { ROOT_DIR } = require('./compromised/compromised-script-constants');

const DEPENDENCY_TRIGGER_FILES = new Set(['package.json', 'pnpm-lock.yaml']);

function parseStagedFiles(output) {
  if (typeof output !== 'string') {
    return [];
  }

  return output
    .split(/\r?\n/u)
    .map((filePath) => filePath.trim())
    .filter(Boolean);
}

function getStagedFiles(options = {}) {
  const { exec = execSync } = options;
  const output = exec('git diff --cached --name-only --diff-filter=ACMR', {
    encoding: 'utf8',
    cwd: ROOT_DIR,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  return parseStagedFiles(output);
}

function hasDependencyGraphChanges(stagedFiles) {
  return stagedFiles.some((filePath) => DEPENDENCY_TRIGGER_FILES.has(filePath));
}

function runCommand(command, options = {}) {
  const { exec = execSync } = options;

  exec(command, {
    cwd: ROOT_DIR,
    stdio: 'inherit',
  });
}

function runPreCommit(options = {}) {
  const stagedFiles = options.stagedFiles || getStagedFiles(options);

  if (hasDependencyGraphChanges(stagedFiles)) {
    console.log('📦 Dependency graph changes staged. Refreshing compromised package data...');
    runCommand('pnpm compromised:update', options);
    runCommand('pnpm compromised:check', options);
    runCommand('git add compromised.txt', options);
  } else {
    console.log('ℹ️  Skipping compromised package refresh: no staged package manifest or lockfile changes');
  }

  runCommand('tsc', options);
  runCommand('lint-staged', options);
}

function main() {
  try {
    runPreCommit();
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
  DEPENDENCY_TRIGGER_FILES,
  getStagedFiles,
  hasDependencyGraphChanges,
  main,
  parseStagedFiles,
  runCommand,
  runPreCommit,
};
