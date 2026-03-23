import { resolve } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  collectPackagesFromAdvisories,
  isConfirmedPackageEntry,
  mergePackages,
  parseArguments,
  partitionProjectScopedPackageEntries,
  validateManualPackages,
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
      new Set(['lodash']),
    );

    expect(result).toEqual({
      packages: ['lodash@4.17.21'],
      count: 1,
      skippedNonExact: 2,
      skippedOutOfScope: 1,
    });
    expect(warnSpy).toHaveBeenCalledTimes(2);
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
});
