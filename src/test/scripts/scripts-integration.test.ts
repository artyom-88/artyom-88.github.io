import { spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

const fixtureDirs: string[] = [];
const repoScriptsDir = resolve(process.cwd(), 'scripts');

function createFixtureRepo() {
  const fixtureDir = mkdtempSync(join(tmpdir(), 'scripts-integration-'));
  fixtureDirs.push(fixtureDir);

  cpSync(repoScriptsDir, join(fixtureDir, 'scripts'), { recursive: true });

  return fixtureDir;
}

function writeJson(filePath: string, value: unknown) {
  writeFileSync(filePath, JSON.stringify(value, null, 2));
}

function runNodeScript(cwd: string, scriptPath: string, args: string[] = [], env: NodeJS.ProcessEnv = {}) {
  return spawnSync(process.execPath, [scriptPath, ...args], {
    cwd,
    env: { ...process.env, ...env },
    encoding: 'utf8',
  });
}

function runCommand(command: string, args: string[], cwd: string, env: NodeJS.ProcessEnv = {}) {
  return spawnSync(command, args, {
    cwd,
    env: { ...process.env, ...env },
    encoding: 'utf8',
  });
}

function createExecutable(filePath: string, contents: string) {
  writeFileSync(filePath, contents, { mode: 0o755 });
}

describe('scripts CLI integration', () => {
  afterEach(() => {
    fixtureDirs.splice(0).forEach((fixtureDir) => {
      rmSync(fixtureDir, { recursive: true, force: true });
    });
  });

  it('should update compromised.txt through the update-compromised CLI', () => {
    const fixtureDir = createFixtureRepo();

    writeJson(join(fixtureDir, 'package.json'), {
      name: 'fixture-app',
      private: true,
      dependencies: {
        vite: '8.0.2',
      },
    });
    writeFileSync(join(fixtureDir, 'compromised.txt'), '');

    const result = runNodeScript(fixtureDir, 'scripts/update-compromised.js', ['--no-fetch', 'compromised.txt', 'vite@8.0.2']);

    expect(result.status).toBe(0);
    expect(readFileSync(join(fixtureDir, 'compromised.txt'), 'utf8')).not.toContain('# refreshed-at:');
    expect(readFileSync(join(fixtureDir, 'compromised.txt'), 'utf8')).toContain('# manual-entry: vite@8.0.2');
    expect(readFileSync(join(fixtureDir, 'compromised.txt'), 'utf8')).toContain('\nvite@8.0.2\n');
    expect(result.stdout).toContain('✅ Update complete!');
  });

  it('should fail through the check-compromised CLI when manifest or lockfile state matches a compromised package', () => {
    const fixtureDir = createFixtureRepo();

    writeJson(join(fixtureDir, 'package.json'), {
      name: 'fixture-app',
      private: true,
      dependencies: {
        vite: '8.0.2',
      },
    });
    writeFileSync(join(fixtureDir, 'compromised.txt'), 'vite@8.0.2\n');

    const result = runNodeScript(fixtureDir, 'scripts/check-compromised.js', ['compromised.txt']);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('SECURITY ALERT');
    expect(result.stderr).toContain('vite@8.0.2');
  });

  it('should run the pre-commit CLI, refresh compromised data, and restage compromised.txt when dependency metadata is staged', () => {
    const fixtureDir = createFixtureRepo();
    const binDir = join(fixtureDir, '.test-bin');
    mkdirSync(binDir);

    createExecutable(join(binDir, 'tsc'), "#!/bin/sh\nprintf 'tsc\\n' >> hook.log\n");
    createExecutable(join(binDir, 'lint-staged'), "#!/bin/sh\nprintf 'lint-staged\\n' >> hook.log\n");

    writeJson(join(fixtureDir, 'package.json'), {
      name: 'fixture-app',
      private: true,
      scripts: {
        'compromised:update':
          "node -e \"const fs=require('node:fs'); fs.appendFileSync('hook.log','update\\n'); fs.writeFileSync('compromised.txt','vite@8.0.2\\n');\"",
        'compromised:check': "node -e \"require('node:fs').appendFileSync('hook.log','check\\n');\"",
      },
    });
    writeFileSync(join(fixtureDir, 'compromised.txt'), '');

    expect(runCommand('git', ['init', '-q'], fixtureDir).status).toBe(0);
    expect(runCommand('git', ['add', 'package.json'], fixtureDir).status).toBe(0);

    const result = runNodeScript(fixtureDir, 'scripts/pre-commit.js', [], {
      PATH: `${binDir}:${process.env.PATH || ''}`,
    });

    expect(result.status).toBe(0);
    expect(readFileSync(join(fixtureDir, 'hook.log'), 'utf8')).toBe('update\ncheck\ntsc\nlint-staged\n');
    expect(readFileSync(join(fixtureDir, 'compromised.txt'), 'utf8')).toBe('vite@8.0.2\n');

    const stagedFiles = runCommand('git', ['diff', '--cached', '--name-only'], fixtureDir);
    expect(stagedFiles.stdout).toContain('package.json');
    expect(stagedFiles.stdout).toContain('compromised.txt');
  });
});
