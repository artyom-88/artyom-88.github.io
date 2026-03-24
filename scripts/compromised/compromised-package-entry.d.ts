import type { CompromisedEntry, PackageEntry } from './compromised-script-types';

export function findVersionSeparatorIndex(packageString: string): number;
export function parsePackageNameVersion(packageString: string): PackageEntry;
export function toCompromisedEntry(packageEntry: string): CompromisedEntry;
export function toPackageKey(pkg: { name: string; version: string }): string;
export function isExactVersionSpecifier(specifier: string): boolean;
export function isPackageDuplicate(existingPackage: string, packageToAdd: string): boolean;
