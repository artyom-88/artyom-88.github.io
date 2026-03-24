import type {
  AdvisoryRefreshData,
  CollectedPackagesResult,
  NpmAdvisory,
  ProjectDependencyStateLike,
} from './compromised-script-types';

export function extractNpmPackageEntries(
  advisory: NpmAdvisory,
): Array<{ packageName: string; vulnerableVersionRange?: string; vulnerableVersions?: string }>;
export function isWithdrawnAdvisory(advisory: NpmAdvisory): boolean;
export function collectPackagesFromAdvisories(
  advisories: NpmAdvisory[],
  projectDependencyState: ProjectDependencyStateLike,
): CollectedPackagesResult;
export function fetchFromKnownVulnerabilities(): Promise<string[]>;
export function getFallbackPackagesOrThrow(reason?: string): Promise<string[]>;
export function fetchAdvisoryRefreshData(projectDependencyState: ProjectDependencyStateLike): Promise<AdvisoryRefreshData>;
export function fetchVulnerablePackages(projectDependencyState: ProjectDependencyStateLike): Promise<string[]>;
