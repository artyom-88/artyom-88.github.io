import type { CompromisedEntry } from './compromised-script-types';

export function readPackageEntries(filePath: string, options?: { allowMissing?: boolean }): string[];
export function parseCompromisedPackages(filePath: string): CompromisedEntry[];
export function parseExistingPackages(filePath: string): Set<string>;
export function writePackagesToFile(filePath: string, packages: string[]): void;
