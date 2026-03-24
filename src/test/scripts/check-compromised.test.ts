import { describe, expect, it } from 'vitest';
import { assertCompromisedPackagesDefined, findCompromisedPackages } from '../../../scripts/check-compromised.js';
import { buildCompromisedLookup } from '../../../scripts/compromised/compromised-package-matching.js';

describe('check-compromised helpers', () => {
  it('should fail when compromised.txt contains no defined packages', () => {
    expect(() => assertCompromisedPackagesDefined([], '/repo/compromised.txt')).toThrow(
      'No compromised packages defined in compromised.txt. Empty lists are treated as configuration errors.',
    );
  });

  it('should report exact and wildcard compromised matches', () => {
    const compromisedLookup = buildCompromisedLookup([
      { name: '@angular/ssr', version: '19.0.0', original: '@angular/ssr@19.0.0' },
      { name: 'lodash', version: null, original: 'lodash' },
    ]);

    const foundPackages = findCompromisedPackages(
      [
        { name: '@angular/ssr', version: '19.0.0', sources: ['manifest', 'lockfile'] },
        { name: 'lodash', version: '4.17.21' },
        { name: 'react', version: '19.2.0' },
      ],
      compromisedLookup,
    );

    expect(foundPackages).toEqual([
      {
        package: '@angular/ssr@19.0.0',
        compromised: '@angular/ssr@19.0.0',
        sources: ['manifest', 'lockfile'],
      },
      {
        package: 'lodash@4.17.21',
        compromised: 'lodash',
      },
    ]);
  });
});
