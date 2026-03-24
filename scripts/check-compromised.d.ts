import type { CompromisedLookup, ProjectPackage } from './compromised-utils.js';

/**
 * A compromised package found in the current project dependency state.
 */
export interface CompromisedPackageMatch {
  package: string;
  compromised: string;
  sources?: string[];
}

/**
 * Throws when the compromised-package list is empty.
 */
export function assertCompromisedPackagesDefined(
  compromisedPackages: Array<{ name: string; version: string | null; original: string }>,
  compromisedFilePath: string,
): void;

/**
 * Finds exact project packages that match the compromised-package lookup.
 */
export function findCompromisedPackages(
  projectPackages: ProjectPackage[],
  compromisedLookup: CompromisedLookup,
): CompromisedPackageMatch[];

/**
 * Formats CLI output and returns the intended process exit code.
 */
export function reportResults(foundPackages: CompromisedPackageMatch[]): number;

/**
 * CLI entrypoint for the compromised-package check script.
 */
export function main(): void;
