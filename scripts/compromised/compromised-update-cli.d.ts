import type { ParsedArguments, PartitionedProjectEntries } from './compromised-script-types';

export function isScopedPackageSpecifier(arg: string): boolean;
export function isFilePath(arg: string): boolean;
export function isPackageName(arg: string): boolean;
export function isConfirmedPackageEntry(packageEntry: string): boolean;
export function validateManualPackages(packagesToAdd: string[], projectPackageNames: Set<string>): void;
export function partitionProjectScopedPackageEntries(
  packageEntries: Iterable<string>,
  projectPackageNames: Set<string>,
): PartitionedProjectEntries;
export function logDependencyStateSource(): void;
export function resolveOutputFilePath(filePathArg: string | null): string;
export function parseArguments(args?: string[]): ParsedArguments;
