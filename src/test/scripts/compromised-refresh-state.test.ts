import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

import {
  computeCompromisedRefreshFingerprint,
  getCompromisedRefreshStateFilePath,
  readCompromisedRefreshState,
  shouldRefreshCompromisedFromState,
  writeCompromisedRefreshState,
} from '../../../scripts/compromised/compromised-refresh-state.js';

const fixtureDirs: string[] = [];

function createFixtureRepo() {
  const fixtureDir = mkdtempSync(join(tmpdir(), 'compromised-refresh-state-'));
  fixtureDirs.push(fixtureDir);

  writeFileSync(
    join(fixtureDir, 'package.json'),
    JSON.stringify(
      {
        name: 'fixture-app',
        private: true,
        dependencies: {
          vite: '8.0.2',
        },
      },
      null,
      2,
    ),
  );
  writeFileSync(
    join(fixtureDir, 'pnpm-lock.yaml'),
    ['lockfileVersion: "9.0"', '', 'importers:', '  .:', '    dependencies:', '      vite:', '        specifier: 8.0.2'].join(
      '\n',
    ),
  );

  return fixtureDir;
}

describe('compromised refresh state helpers', () => {
  afterEach(() => {
    fixtureDirs.splice(0).forEach((fixtureDir) => {
      rmSync(fixtureDir, { recursive: true, force: true });
    });
  });

  it('should compute different dependency fingerprints when project metadata changes', () => {
    const fixtureDir = createFixtureRepo();
    const initialFingerprint = computeCompromisedRefreshFingerprint(fixtureDir);

    writeFileSync(
      join(fixtureDir, 'pnpm-lock.yaml'),
      ['lockfileVersion: "9.0"', '', 'importers:', '  .:', '    dependencies:', '      vite:', '        specifier: 8.1.0'].join(
        '\n',
      ),
    );

    expect(computeCompromisedRefreshFingerprint(fixtureDir)).not.toBe(initialFingerprint);
  });

  it('should write and read local refresh state from the .codex cache', () => {
    const fixtureDir = createFixtureRepo();
    const filePath = getCompromisedRefreshStateFilePath(fixtureDir);

    writeCompromisedRefreshState(
      {
        refreshedAt: '2026-03-23T12:00:00.000Z',
        dependencyGraphFingerprint: 'fingerprint-1',
      },
      filePath,
    );

    expect(readCompromisedRefreshState(filePath)).toEqual({
      refreshedAt: '2026-03-23T12:00:00.000Z',
      dependencyGraphFingerprint: 'fingerprint-1',
    });
    expect(readFileSync(filePath, 'utf8')).toContain('"dependencyGraphFingerprint": "fingerprint-1"');
  });

  it('should refresh when state is missing, stale, invalid, or fingerprint does not match', () => {
    expect(shouldRefreshCompromisedFromState(null, 'fingerprint-1', Date.UTC(2026, 2, 23), 1000)).toBe(true);
    expect(
      shouldRefreshCompromisedFromState(
        {
          refreshedAt: 'not-a-date',
          dependencyGraphFingerprint: 'fingerprint-1',
        },
        'fingerprint-1',
        Date.UTC(2026, 2, 23),
        1000,
      ),
    ).toBe(true);
    expect(
      shouldRefreshCompromisedFromState(
        {
          refreshedAt: '2026-03-23T12:00:00.000Z',
          dependencyGraphFingerprint: 'fingerprint-1',
        },
        'fingerprint-2',
        Date.UTC(2026, 2, 23, 12, 0, 0),
        1000,
      ),
    ).toBe(true);
    expect(
      shouldRefreshCompromisedFromState(
        {
          refreshedAt: '2026-03-23T11:59:58.000Z',
          dependencyGraphFingerprint: 'fingerprint-1',
        },
        'fingerprint-1',
        Date.UTC(2026, 2, 23, 12, 0, 0),
        1000,
      ),
    ).toBe(true);
  });

  it('should skip refresh when state is recent and fingerprint matches', () => {
    expect(
      shouldRefreshCompromisedFromState(
        {
          refreshedAt: '2026-03-23T12:00:00.000Z',
          dependencyGraphFingerprint: 'fingerprint-1',
        },
        'fingerprint-1',
        Date.UTC(2026, 2, 23, 12, 0, 0, 500),
        1000,
      ),
    ).toBe(false);
  });
});
