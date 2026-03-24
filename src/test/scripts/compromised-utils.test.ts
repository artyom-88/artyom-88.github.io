import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import {
  isExactVersionSpecifier,
  isPackageDuplicate,
  parsePackageNameVersion,
} from '../../../scripts/compromised/compromised-package-entry.js';
import { parseCompromisedPackages } from '../../../scripts/compromised/compromised-package-file.js';
import {
  buildCompromisedLookup,
  findCompromisedMatch,
  isCompromised,
} from '../../../scripts/compromised/compromised-package-matching.js';
import { getCompromisedFilePath } from '../../../scripts/compromised/compromised-path-safety.js';
import {
  createProjectDependencyState,
  getExactManifestPackages,
  getManifestDependencyNames,
  getPackagesFromPnpmLockfileContent,
} from '../../../scripts/compromised/compromised-project-state.js';

const tempDirs: string[] = [];

function createCompromisedFile(contents: string) {
  const tempDir = mkdtempSync(join(tmpdir(), 'compromised-utils-'));
  tempDirs.push(tempDir);

  const filePath = join(tempDir, 'compromised.txt');
  writeFileSync(filePath, contents);
  return filePath;
}

describe('compromised script modules', () => {
  afterEach(() => {
    tempDirs.splice(0).forEach((dir) => {
      rmSync(dir, { recursive: true, force: true });
    });
  });

  describe('parsePackageNameVersion', () => {
    it('should parse package with version', () => {
      const result = parsePackageNameVersion('package@1.0.0');
      expect(result).toEqual({ name: 'package', version: '1.0.0' });
    });

    it('should parse package without version', () => {
      const result = parsePackageNameVersion('package');
      expect(result).toEqual({ name: 'package', version: null });
    });

    it('should handle scoped packages with version', () => {
      const result = parsePackageNameVersion('@scope/package@1.0.0');
      expect(result).toEqual({ name: '@scope/package', version: '1.0.0' });
    });

    it('should handle scoped packages without version', () => {
      const result = parsePackageNameVersion('@scope/package');
      expect(result).toEqual({ name: '@scope/package', version: null });
    });

    it('should treat scoped packages with empty versions as versionless entries', () => {
      const result = parsePackageNameVersion('@scope/package@');
      expect(result).toEqual({ name: '@scope/package', version: null });
    });

    it('should handle invalid input', () => {
      const result = parsePackageNameVersion(null as unknown as string);
      expect(result).toEqual({ name: null, version: null });
    });

    it('should handle empty string', () => {
      const result = parsePackageNameVersion('');
      expect(result).toEqual({ name: '', version: null });
    });
  });

  describe('getCompromisedFilePath', () => {
    it('should resolve the default compromised file inside the repo root', () => {
      expect(getCompromisedFilePath([])).toBe(resolve(process.cwd(), 'compromised.txt'));
    });

    it('should allow repo-internal relative paths', () => {
      expect(getCompromisedFilePath(['security/compromised.txt'])).toBe(resolve(process.cwd(), 'security/compromised.txt'));
    });

    it('should allow absolute paths inside the repo root', () => {
      const internalPath = resolve(process.cwd(), 'security/compromised.txt');

      expect(getCompromisedFilePath([internalPath])).toBe(internalPath);
    });

    it('should reject parent traversal that escapes the repo root', () => {
      expect(() => getCompromisedFilePath(['../compromised.txt'])).toThrow(
        'Compromised file path must be inside the project root/workspace',
      );
    });

    it('should reject sibling paths outside the repo root', () => {
      const siblingPath = resolve(process.cwd(), '../artyom-88.github.io-backup/compromised.txt');

      expect(() => getCompromisedFilePath([siblingPath])).toThrow(
        'Compromised file path must be inside the project root/workspace',
      );
    });
  });

  describe('parseCompromisedPackages', () => {
    it('should preserve scoped package names from compromised files', () => {
      const filePath = createCompromisedFile('# Known compromised packages\n@angular/ssr@19.0.0\n@types/node\nlodash@4.17.21\n');

      expect(parseCompromisedPackages(filePath)).toEqual([
        {
          name: '@angular/ssr',
          version: '19.0.0',
          original: '@angular/ssr@19.0.0',
        },
        {
          name: '@types/node',
          version: null,
          original: '@types/node',
        },
        {
          name: 'lodash',
          version: '4.17.21',
          original: 'lodash@4.17.21',
        },
      ]);
    });
  });

  describe('manifest and lockfile helpers', () => {
    it('should include manifest dependency names and override targets in project scope', () => {
      const manifest = {
        dependencies: {
          react: '19.2.0',
          lodash: '^4.17.21',
        },
        devDependencies: {
          vite: '7.1.4',
        },
        optionalDependencies: {
          fsevents: '2.3.3',
        },
        pnpm: {
          overrides: {
            '@babel/runtime': '7.26.10',
            react: '$react',
            'vite@7.1.4>@types/node': '22.13.10',
          },
        },
      };

      expect(getManifestDependencyNames(manifest)).toEqual(
        new Set(['react', 'lodash', 'vite', 'fsevents', '@babel/runtime', '@types/node']),
      );
    });

    it('should keep only exact manifest versions, including exact override versions', () => {
      const manifest = {
        dependencies: {
          react: '19.2.0',
          lodash: '^4.17.21',
        },
        devDependencies: {
          vite: '7.1.4',
        },
        pnpm: {
          overrides: {
            '@babel/runtime': '7.26.10',
            react: '$react',
            'vite@7.1.4>@types/node': '22.13.10',
          },
        },
      };

      expect(isExactVersionSpecifier('$react')).toBe(false);
      expect(getExactManifestPackages(manifest)).toEqual([
        { name: 'react', version: '19.2.0' },
        { name: 'vite', version: '7.1.4' },
        { name: '@babel/runtime', version: '7.26.10' },
        { name: '@types/node', version: '22.13.10' },
      ]);
    });

    it('should parse exact packages from pnpm lockfile content', () => {
      const lockfileContent = `lockfileVersion: '9.0'
packages:
  '@scope/pkg@1.2.3':
    resolution: {integrity: sha512-example}
  'vite@7.1.4(@types/node@22.13.10)':
    resolution: {integrity: sha512-example}
  lodash@4.17.21:
    resolution: {integrity: sha512-example}
snapshots:
  lodash@4.17.21: {}
`;

      expect(getPackagesFromPnpmLockfileContent(lockfileContent)).toEqual([
        { name: '@scope/pkg', version: '1.2.3' },
        { name: 'vite', version: '7.1.4' },
        { name: 'lodash', version: '4.17.21' },
      ]);
    });

    it('should merge manifest and lockfile state into one project dependency model', () => {
      const state = createProjectDependencyState({
        manifestDependencyNames: new Set(['react', 'vite']),
        manifestPackages: [{ name: 'react', version: '19.2.0' }],
        lockfilePackages: [
          { name: 'react', version: '19.2.0' },
          { name: 'vite', version: '7.1.4' },
        ],
      });

      expect(state.packageNames).toEqual(new Set(['react', 'vite']));
      expect(state.exactPackages).toEqual(
        expect.arrayContaining([
          { name: 'react', version: '19.2.0', sources: ['manifest', 'lockfile'] },
          { name: 'vite', version: '7.1.4', sources: ['lockfile'] },
        ]),
      );
    });
  });

  describe('isCompromised', () => {
    it('should match exact package and version', () => {
      const pkg = { name: 'package', version: '1.0.0' };
      const compromised = { name: 'package', version: '1.0.0' };
      expect(isCompromised(pkg, compromised)).toBe(true);
    });

    it('should not match different versions', () => {
      const pkg = { name: 'package', version: '1.0.0' };
      const compromised = { name: 'package', version: '2.0.0' };
      expect(isCompromised(pkg, compromised)).toBe(false);
    });

    it('should match any version when compromised entry has no version', () => {
      const pkg = { name: 'package', version: '1.0.0' };
      const compromised = { name: 'package', version: null };
      expect(isCompromised(pkg, compromised)).toBe(true);
    });

    it('should match scoped packages with exact versions', () => {
      const pkg = { name: '@angular/ssr', version: '19.0.0' };
      const compromised = { name: '@angular/ssr', version: '19.0.0' };
      expect(isCompromised(pkg, compromised)).toBe(true);
    });

    it('should not match different package names', () => {
      const pkg = { name: 'package1', version: '1.0.0' };
      const compromised = { name: 'package2', version: '1.0.0' };
      expect(isCompromised(pkg, compromised)).toBe(false);
    });
  });

  describe('lookup helpers', () => {
    it('should build exact and wildcard lookup entries', () => {
      const compromisedLookup = buildCompromisedLookup([
        { name: '@angular/ssr', version: '19.0.0', original: '@angular/ssr@19.0.0' },
        { name: 'lodash', version: null, original: 'lodash' },
      ]);

      expect(compromisedLookup.get('@angular/ssr')?.get('19.0.0')).toBe('@angular/ssr@19.0.0');
      expect(compromisedLookup.get('lodash')?.get('*')).toBe('lodash');
    });

    it('should find exact and wildcard compromised matches', () => {
      const compromisedLookup = buildCompromisedLookup([
        { name: '@angular/ssr', version: '19.0.0', original: '@angular/ssr@19.0.0' },
        { name: 'lodash', version: null, original: 'lodash' },
      ]);

      expect(findCompromisedMatch({ name: '@angular/ssr', version: '19.0.0' }, compromisedLookup)).toBe('@angular/ssr@19.0.0');
      expect(findCompromisedMatch({ name: 'lodash', version: '4.17.21' }, compromisedLookup)).toBe('lodash');
      expect(findCompromisedMatch({ name: 'react', version: '19.2.0' }, compromisedLookup)).toBeNull();
    });
  });

  describe('isPackageDuplicate', () => {
    it('should identify exact duplicates', () => {
      expect(isPackageDuplicate('package@1.0.0', 'package@1.0.0')).toBe(true);
    });

    it('should identify package-only as duplicate of version-specific', () => {
      expect(isPackageDuplicate('package', 'package@1.0.0')).toBe(true);
    });

    it('should not identify version-specific as duplicate of package-only', () => {
      expect(isPackageDuplicate('package@1.0.0', 'package')).toBe(false);
    });

    it('should not identify different versions as duplicates', () => {
      expect(isPackageDuplicate('package@1.0.0', 'package@2.0.0')).toBe(false);
    });

    it('should not identify different packages as duplicates', () => {
      expect(isPackageDuplicate('package1@1.0.0', 'package2@1.0.0')).toBe(false);
    });

    it('should not identify both package-only as duplicates', () => {
      expect(isPackageDuplicate('package', 'package')).toBe(false);
    });

    it('should handle scoped packages', () => {
      expect(isPackageDuplicate('@scope/package@1.0.0', '@scope/package@1.0.0')).toBe(true);
      expect(isPackageDuplicate('@scope/package', '@scope/package@1.0.0')).toBe(true);
    });

    it('should not identify different scoped versions as duplicates', () => {
      expect(isPackageDuplicate('@scope/package@1.0.0', '@scope/package@2.0.0')).toBe(false);
    });
  });
});
