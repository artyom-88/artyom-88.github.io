import { resolve } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  collectPackagesFromAdvisories,
  fetchAdvisoryRefreshData,
  fetchVulnerablePackages,
} from '../../../scripts/compromised/compromised-advisory-processing.js';
import {
  fetchGitHubAdvisories,
  fetchGitHubAdvisoryType,
  getGitHubApiHeaders,
  getGitHubAuthToken,
} from '../../../scripts/compromised/compromised-github-advisories.js';
import {
  filterExistingPackagesForRefresh,
  isPackageEntryConfirmedByAdvisories,
  mergePackages,
} from '../../../scripts/compromised/compromised-refresh-policy.js';
import {
  isConfirmedPackageEntry,
  parseArguments,
  partitionProjectScopedPackageEntries,
  validateManualPackages,
} from '../../../scripts/compromised/compromised-update-cli.js';
import {
  getExplicitVersionEntries,
  getNormalizedExactVersions,
  normalizeExactVersionToken,
  versionSatisfiesRange,
} from '../../../scripts/compromised/compromised-version-range.js';

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

  it('should reject range-like vulnerable_versions tokens when collecting explicit entries', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const result = getExplicitVersionEntries('vite', '8.0.2, = 8.0.3, ^8.0.0, ~8.0.0, 8.0.0 - 8.0.4');

    expect(result).toEqual({
      exactEntries: ['vite@8.0.2', 'vite@8.0.3'],
      skippedNonExact: 3,
    });
    expect(warnSpy).toHaveBeenCalledTimes(3);
  });

  it('should normalize exact version tokens with a leading equals sign', () => {
    expect(normalizeExactVersionToken('= 3.1.1')).toBe('3.1.1');
    expect(normalizeExactVersionToken('3.1.1')).toBe('3.1.1');
    expect(normalizeExactVersionToken('^3.1.1')).toBeNull();
  });

  it('should normalize exact versions from comma-separated advisory values', () => {
    expect(getNormalizedExactVersions('= 3.1.1, 3.1.2, ^3.1.0')).toEqual(['3.1.1', '3.1.2']);
  });

  it('should prefer GH_TOKEN and GITHUB_TOKEN over gh auth token', () => {
    expect(getGitHubAuthToken({ env: { GH_TOKEN: 'gh-token', GITHUB_TOKEN: 'github-token' } })).toBe('gh-token');
    expect(getGitHubAuthToken({ env: { GITHUB_TOKEN: 'github-token' } })).toBe('github-token');
  });

  it('should fall back to gh auth token when no env token is available', () => {
    const exec = vi.fn().mockReturnValue('gh-cli-token\n');

    expect(getGitHubAuthToken({ env: {}, exec })).toBe('gh-cli-token');
    expect(exec).toHaveBeenCalledWith('gh auth token', {
      encoding: 'utf8',
      cwd: process.cwd(),
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  });

  it('should build authenticated GitHub API headers when a token is available', () => {
    expect(getGitHubApiHeaders({ env: { GH_TOKEN: 'token-123' } })).toMatchObject({
      Authorization: 'Bearer token-123',
      Accept: 'application/vnd.github+json',
    });
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

  it('should keep existing exact entries when current advisories still cover them via a range', () => {
    expect(
      isPackageEntryConfirmedByAdvisories('vite@7.0.0', [
        {
          package: { ecosystem: 'npm', name: 'vite' },
          vulnerable_version_range: '>= 7.0.0, <= 7.0.7',
        },
      ]),
    ).toBe(true);
  });

  it('should keep existing exact entries when advisories list exact versions with a leading equals sign', () => {
    expect(
      isPackageEntryConfirmedByAdvisories('color-convert@3.1.1', [
        {
          package: { ecosystem: 'npm', name: 'color-convert' },
          vulnerable_versions: '= 3.1.1',
        },
      ]),
    ).toBe(true);
  });

  it('should remove stale exact entries during advisory refreshes', () => {
    const result = filterExistingPackagesForRefresh(
      new Set(['@angular/ssr@19.0.0', 'lodash@4.17.21']),
      [
        {
          package: { ecosystem: 'npm', name: 'lodash' },
          vulnerable_versions: '4.17.21',
        },
      ],
      true,
    );

    expect(result).toEqual({
      preservedPackages: new Set(['lodash@4.17.21']),
      removedStaleConfirmed: ['@angular/ssr@19.0.0'],
    });
  });

  it('should preserve existing exact entries when refresh is disabled', () => {
    const result = filterExistingPackagesForRefresh(new Set(['@angular/ssr@19.0.0']), null, false);

    expect(result).toEqual({
      preservedPackages: new Set(['@angular/ssr@19.0.0']),
      removedStaleConfirmed: [],
    });
  });

  it('should preserve existing exact entries when using fallback data without live advisories', () => {
    const result = filterExistingPackagesForRefresh(new Set(['@angular/ssr@19.0.0']), null, true);

    expect(result).toEqual({
      preservedPackages: new Set(['@angular/ssr@19.0.0']),
      removedStaleConfirmed: [],
    });
  });

  it('should follow paginated GitHub advisory responses', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify([{ ghsa_id: 'GHSA-first' }]), {
          status: 200,
          headers: {
            link: '<https://api.github.com/advisories?per_page=100&ecosystem=npm&type=reviewed&page=2>; rel="next"',
          },
        }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify([{ ghsa_id: 'GHSA-second' }]), {
          status: 200,
        }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify([{ ghsa_id: 'GHSA-malware' }]), {
          status: 200,
        }),
      );

    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchGitHubAdvisories()).resolves.toEqual([
      { ghsa_id: 'GHSA-first' },
      { ghsa_id: 'GHSA-second' },
      { ghsa_id: 'GHSA-malware' },
    ]);
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(fetchMock.mock.calls.map(([url]) => String(url))).toEqual([
      'https://api.github.com/advisories?per_page=100&ecosystem=npm&type=reviewed',
      'https://api.github.com/advisories?per_page=100&ecosystem=npm&type=reviewed&page=2',
      'https://api.github.com/advisories?per_page=100&ecosystem=npm&type=malware',
    ]);
  });

  it('should fetch all pages for a single advisory type', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify([{ ghsa_id: 'GHSA-type-first' }]), {
          status: 200,
          headers: {
            link: '<https://api.github.com/advisories?per_page=100&ecosystem=npm&type=malware&page=2>; rel="next"',
          },
        }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify([{ ghsa_id: 'GHSA-type-second' }]), {
          status: 200,
        }),
      );

    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchGitHubAdvisoryType('malware')).resolves.toEqual([
      { ghsa_id: 'GHSA-type-first' },
      { ghsa_id: 'GHSA-type-second' },
    ]);
  });

  it('should return both advisories and materialized packages for a live refresh', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify([
            {
              ghsa_id: 'GHSA-reviewed',
              package: { ecosystem: 'npm', name: 'color-convert' },
              vulnerable_versions: '= 3.1.1',
            },
          ]),
          { status: 200 },
        ),
      )
      .mockResolvedValueOnce(new Response(JSON.stringify([]), { status: 200 }));

    vi.stubGlobal('fetch', fetchMock);

    await expect(
      fetchAdvisoryRefreshData({
        packageNames: new Set(['color-convert']),
        exactPackages: [{ name: 'color-convert', version: '3.1.1' }],
      }),
    ).resolves.toEqual({
      advisories: [
        {
          ghsa_id: 'GHSA-reviewed',
          package: { ecosystem: 'npm', name: 'color-convert' },
          vulnerable_versions: '= 3.1.1',
        },
      ],
      packages: ['color-convert@3.1.1'],
    });
  });

  it('should fail closed when GitHub advisories are unavailable and fallback is empty', async () => {
    vi.useFakeTimers();
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 403, statusText: 'Forbidden' }));
    vi.stubGlobal('fetch', fetchMock);

    try {
      const rejection = expect(
        fetchVulnerablePackages({
          packageNames: new Set(['vite']),
          exactPackages: [{ name: 'vite', version: '8.0.2' }],
        }),
      ).rejects.toThrow('GitHub advisory refresh failed and the curated fallback list is empty');

      await vi.runAllTimersAsync();
      await rejection;
    } finally {
      vi.useRealTimers();
    }
  });
});
