import type { MergePackagesResult, RefreshedExistingPackagesResult } from './compromised-script-types';

export function mergePackages(existingPackages: Set<string>, packagesToAdd: string[]): MergePackagesResult;
export function isPackageEntryConfirmedByAdvisories(packageEntry: string, advisories: object[] | null): boolean;
export function filterExistingPackagesForRefresh(
  existingPackages: Set<string>,
  advisories: object[] | null,
  fetchFromAPI: boolean,
  manualPackages?: Set<string>,
): RefreshedExistingPackagesResult;
export function collectNewPackages(
  packagesToAdd: string[],
  fetchFromAPI: boolean,
  projectDependencyState: { packageNames: Set<string> },
  validateManualPackages: (packagesToAdd: string[], projectPackageNames: Set<string>) => void,
): Promise<{ newPackages: string[]; advisories: object[] | null }>;
