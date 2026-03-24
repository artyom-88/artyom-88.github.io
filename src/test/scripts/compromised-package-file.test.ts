import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

import { parseCompromisedPackageFile, writePackagesToFile } from '../../../scripts/compromised/compromised-package-file.js';

const fixtureDirs: string[] = [];

describe('compromised package file helpers', () => {
  afterEach(() => {
    fixtureDirs.splice(0).forEach((fixtureDir) => {
      rmSync(fixtureDir, { recursive: true, force: true });
    });
  });

  it('should parse manual entries while ignoring non-semantic comments in compromised.txt', () => {
    const fixtureDir = mkdtempSync(join(tmpdir(), 'compromised-file-'));
    fixtureDirs.push(fixtureDir);
    const filePath = join(fixtureDir, 'compromised.txt');

    writeFileSync(
      filePath,
      ['# refreshed-at: 2026-03-23T12:00:00.000Z', '# manual-entry: vite@8.0.2', '', 'vite@8.0.2', 'lodash@4.17.21', ''].join(
        '\n',
      ),
    );

    expect(parseCompromisedPackageFile(filePath)).toEqual({
      packageEntries: ['vite@8.0.2', 'lodash@4.17.21'],
      manualPackages: new Set(['vite@8.0.2']),
    });
  });

  it('should write manual entries only for packages that exist in the file', () => {
    const fixtureDir = mkdtempSync(join(tmpdir(), 'compromised-file-'));
    fixtureDirs.push(fixtureDir);
    const filePath = join(fixtureDir, 'compromised.txt');

    writePackagesToFile(filePath, ['lodash@4.17.21', 'vite@8.0.2'], {
      manualPackages: ['vite@8.0.2', 'missing@1.0.0'],
    });

    expect(readFileSync(filePath, 'utf8')).toBe(
      ['# manual-entry: vite@8.0.2', '', 'lodash@4.17.21', 'vite@8.0.2', ''].join('\n'),
    );
  });
});
