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
