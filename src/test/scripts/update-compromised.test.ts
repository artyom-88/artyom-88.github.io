import { resolve } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  collectPackagesFromAdvisories,
  fetchGitHubAdvisories,
  isConfirmedPackageEntry,
  mergePackages,
  parseArguments,
  partitionProjectScopedPackageEntries,
  validateManualPackages,
  versionSatisfiesRange,
} from '../../../scripts/update-compromised.js';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('update-compromised helpers', () => {
  it('should parse flags, output path, and packages consistently', () => {
    const result = parseArguments(['--no-fetch', '--file', 'security/compromised.txt', '@angular/ssr@19.0.0', 'lodash@4.17.21']);

    expect(result).toEqual({
      filePath: resolve(process.cwd(), 'security/compromised.txt'),
      packagesToAdd: ['@angular/ssr@19.0.0', 'lodash@4.17.21'],
      fetchFromAPI: false,
    });
  });

  it('should treat scoped package entries as packages rather than output paths', () => {
    const result = parseArguments(['--no-fetch', '@angular/ssr@19.0.0']);

    expect(result).toEqual({
      filePath: resolve(process.cwd(), 'compromised.txt'),
      packagesToAdd: ['@angular/ssr@19.0.0'],
      fetchFromAPI: false,
    });
  });

  it('should normalize advisory payloads into mergeable package entries', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const result = collectPackagesFromAdvisories(
      [
        {
          vulnerabilities: [
            {
              package: { ecosystem: 'npm', name: '@angular/ssr' },
              vulnerable_version_range: '< 19.0.1',
            },
            {
              package: { ecosystem: 'npm', name: 'lodash' },
              vulnerable_versions: '4.17.21, *',
            },
            {
              package: { ecosystem: 'maven', name: 'ignore-me' },
              vulnerable_versions: '1.0.0',
            },
          ],
        },
        {
          package: { ecosystem: 'npm', name: 'react' },
          vulnerable_versions: '19.2.0',
        },
      ],
      {
        packageNames: new Set(['@angular/ssr', 'lodash']),
        exactPackages: [
          { name: '@angular/ssr', version: '19.0.0' },
          { name: '@angular/ssr', version: '19.0.1' },
          { name: 'lodash', version: '4.17.21' },
        ],
      },
    );

    expect(result).toEqual({
      packages: ['@angular/ssr@19.0.0', 'lodash@4.17.21'],
      count: 2,
      skippedNonExact: 1,
      skippedOutOfScope: 1,
    });
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });

  it('should warn when a vulnerable range cannot be materialized to a project exact version', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const result = collectPackagesFromAdvisories(
      [
        {
          package: { ecosystem: 'npm', name: 'vite' },
          vulnerable_version_range: '< 7.1.0',
        },
      ],
      {
        packageNames: new Set(['vite']),
        exactPackages: [{ name: 'vite', version: '8.0.2' }],
      },
    );

    expect(result).toEqual({
      packages: [],
      count: 0,
      skippedNonExact: 1,
      skippedOutOfScope: 0,
    });
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });

  it('should support caret npm ranges when matching project versions', () => {
    expect(versionSatisfiesRange('1.2.4', '^1.2.3')).toBe(true);
    expect(versionSatisfiesRange('2.0.0', '^1.2.3')).toBe(false);
    expect(versionSatisfiesRange('0.2.4', '^0.2.3')).toBe(true);
    expect(versionSatisfiesRange('0.3.0', '^0.2.3')).toBe(false);
    expect(versionSatisfiesRange('0.0.4', '^0.0.3')).toBe(false);
  });

  it('should support tilde npm ranges when matching project versions', () => {
    expect(versionSatisfiesRange('1.2.4', '~1.2.3')).toBe(true);
    expect(versionSatisfiesRange('1.3.0', '~1.2.3')).toBe(false);
    expect(versionSatisfiesRange('0.2.9', '~0.2.3')).toBe(true);
    expect(versionSatisfiesRange('0.3.0', '~0.2.3')).toBe(false);
  });

  it('should materialize exact versions from caret and tilde advisory ranges', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const result = collectPackagesFromAdvisories(
      [
        {
          package: { ecosystem: 'npm', name: 'react-router-dom' },
          vulnerable_version_range: '^7.13.0',
        },
        {
          package: { ecosystem: 'npm', name: 'vite' },
          vulnerable_version_range: '~8.0.0',
        },
      ],
      {
        packageNames: new Set(['react-router-dom', 'vite']),
        exactPackages: [
          { name: 'react-router-dom', version: '7.13.2' },
          { name: 'vite', version: '8.0.2' },
          { name: 'vite', version: '8.1.0' },
        ],
      },
    );

    expect(result).toEqual({
      packages: ['react-router-dom@7.13.2', 'vite@8.0.2'],
      count: 2,
      skippedNonExact: 0,
      skippedOutOfScope: 0,
    });
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('should ignore withdrawn advisories', () => {
    const result = collectPackagesFromAdvisories(
      [
        {
          package: { ecosystem: 'npm', name: 'cacheable-request' },
          vulnerable_version_range: '<= 6.1.0',
          withdrawn_at: '2025-01-01T00:00:00Z',
        },
      ],
      {
        packageNames: new Set(['cacheable-request']),
        exactPackages: [{ name: 'cacheable-request', version: '6.1.0' }],
      },
    );

    expect(result).toEqual({
      packages: [],
      count: 0,
      skippedNonExact: 0,
      skippedOutOfScope: 0,
    });
  });

  it('should treat only exact package@version entries as confirmed', () => {
    expect(isConfirmedPackageEntry('@angular/ssr@19.0.0')).toBe(true);
    expect(isConfirmedPackageEntry('@angular/ssr')).toBe(false);
    expect(isConfirmedPackageEntry('lodash')).toBe(false);
  });

  it('should separate retained entries from non-exact and out-of-scope ones', () => {
    const result = partitionProjectScopedPackageEntries(
      ['@angular/ssr@19.0.0', '@angular/ssr', 'lodash@4.17.21'],
      new Set(['@angular/ssr']),
    );

    expect(result).toEqual({
      confirmedPackages: new Set(['@angular/ssr@19.0.0']),
      removedNonExact: ['@angular/ssr'],
      removedOutOfScope: ['lodash@4.17.21'],
    });
  });

  it('should reject manual package additions that do not include an exact version', () => {
    expect(() => validateManualPackages(['@angular/ssr', 'lodash@4.17.21'], new Set(['@angular/ssr', 'lodash']))).toThrow(
      'Manual package additions must use exact package@version entries: @angular/ssr',
    );
  });

  it('should reject exact manual additions outside the current dependency scope', () => {
    expect(() => validateManualPackages(['react@19.2.0'], new Set(['vite']))).toThrow(
      'Manual package additions must reference packages from the current project dependency graph: react@19.2.0',
    );
  });

  it('should preserve existing exact entries while adding only non-duplicates', () => {
    const result = mergePackages(new Set(['@angular/ssr@19.0.0', 'lodash@4.17.21']), ['lodash@4.17.21', 'react@19.2.0']);

    expect(result).toEqual({
      packages: ['@angular/ssr@19.0.0', 'lodash@4.17.21', 'react@19.2.0'],
      added: 1,
      skipped: 1,
    });
  });

  it('should follow paginated GitHub advisory responses', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify([{ ghsa_id: 'GHSA-first' }]), {
          status: 200,
          headers: {
            link: '<https://api.github.com/advisories?per_page=100&ecosystem=npm&page=2>; rel="next"',
          },
        }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify([{ ghsa_id: 'GHSA-second' }]), {
          status: 200,
        }),
      );

    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchGitHubAdvisories()).resolves.toEqual([{ ghsa_id: 'GHSA-first' }, { ghsa_id: 'GHSA-second' }]);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
