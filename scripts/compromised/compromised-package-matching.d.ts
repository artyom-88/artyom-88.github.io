import type { CompromisedEntry, CompromisedLookup, PackageEntry, ProjectPackage } from './compromised-script-types';

export function isCompromised(pkg: PackageEntry, compromised: PackageEntry): boolean;
export function buildCompromisedLookup(entries: CompromisedEntry[]): CompromisedLookup;
export function findCompromisedMatch(pkg: ProjectPackage, compromisedLookup: CompromisedLookup): string | null;
