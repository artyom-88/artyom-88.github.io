import { describe, expect, it } from 'vitest';
import { findCompromisedPackages } from '../../../scripts/check-compromised.js';
import { buildCompromisedLookup } from '../../../scripts/compromised-utils.js';

describe('check-compromised helpers', () => {
  it('should report exact and wildcard compromised matches', () => {
    const compromisedLookup = buildCompromisedLookup([
      { name: '@angular/ssr', version: '19.0.0', original: '@angular/ssr@19.0.0' },
      { name: 'lodash', version: null, original: 'lodash' },
    ]);

    const foundPackages = findCompromisedPackages(
      [
        { name: '@angular/ssr', version: '19.0.0', sources: ['manifest', 'installed'] },
        { name: 'lodash', version: '4.17.21' },
        { name: 'react', version: '19.2.0' },
      ],
      compromisedLookup,
    );

    expect(foundPackages).toEqual([
      {
        package: '@angular/ssr@19.0.0',
        compromised: '@angular/ssr@19.0.0',
        sources: ['manifest', 'installed'],
      },
      {
        package: 'lodash@4.17.21',
        compromised: 'lodash',
      },
    ]);
  });
});
