import { describe, expect, it, vi } from 'vitest';
import { getStagedFiles, hasDependencyGraphChanges, parseStagedFiles, runPreCommit } from '../../../scripts/pre-commit.js';

describe('pre-commit hook helpers', () => {
  it('should parse staged files from git output', () => {
    expect(parseStagedFiles('package.json\npnpm-lock.yaml\nREADME.md\n')).toEqual([
      'package.json',
      'pnpm-lock.yaml',
      'README.md',
    ]);
  });

  it('should detect staged dependency graph changes', () => {
    expect(hasDependencyGraphChanges(['README.md', 'package.json'])).toBe(true);
    expect(hasDependencyGraphChanges(['README.md', 'src/app/App.tsx'])).toBe(false);
  });

  it('should read staged files from git diff --cached', () => {
    const exec = vi.fn().mockReturnValue('package.json\ncompromised.txt\n');

    expect(getStagedFiles({ exec })).toEqual(['package.json', 'compromised.txt']);
    expect(exec).toHaveBeenCalledWith('git diff --cached --name-only --diff-filter=ACMR', {
      encoding: 'utf8',
      cwd: process.cwd(),
      stdio: ['ignore', 'pipe', 'pipe'],
    });
  });

  it('should skip compromised refresh when dependency metadata is not staged', () => {
    const exec = vi.fn();

    runPreCommit({
      stagedFiles: ['README.md'],
      exec,
    });

    expect(exec.mock.calls.map(([command]) => command)).toEqual(['tsc', 'lint-staged']);
  });

  it('should refresh and restage compromised packages when dependency metadata is staged', () => {
    const exec = vi.fn();

    runPreCommit({
      stagedFiles: ['pnpm-lock.yaml'],
      exec,
    });

    expect(exec.mock.calls.map(([command]) => command)).toEqual([
      'pnpm compromised:update',
      'pnpm compromised:check',
      'git add compromised.txt',
      'tsc',
      'lint-staged',
    ]);
  });
});
