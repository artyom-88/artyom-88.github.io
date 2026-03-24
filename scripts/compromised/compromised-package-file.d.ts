import type { CompromisedEntry, CompromisedPackageFileState } from './compromised-script-types';

export function createCompromisedPackageFileState(): CompromisedPackageFileState;
export function parseCompromisedPackageFile(filePath: string, options?: { allowMissing?: boolean }): CompromisedPackageFileState;
export function readPackageEntries(filePath: string, options?: { allowMissing?: boolean }): string[];
export function parseCompromisedPackages(filePath: string): CompromisedEntry[];
export function parseExistingPackages(filePath: string): Set<string>;
export function writePackagesToFile(filePath: string, packages: string[], options?: { manualPackages?: Iterable<string> }): void;
