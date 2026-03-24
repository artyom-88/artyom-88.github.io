/**
 * Minimal npm advisory shape used by the updater when reading the GitHub
 * Security Advisories API payload.
 */
export interface NpmAdvisoryPackage {
  ecosystem?: string;
  name: string;
}

/**
 * A single vulnerable package entry from an advisory.
 */
export interface NpmAdvisoryVulnerability {
  package?: NpmAdvisoryPackage;
  vulnerable_version_range?: string;
  vulnerable_versions?: string;
}

/**
 * Advisory shape accepted by the updater helper functions.
 */
export interface NpmAdvisory {
  package?: NpmAdvisoryPackage;
  vulnerabilities?: NpmAdvisoryVulnerability[];
  vulnerable_version_range?: string;
  vulnerable_versions?: string;
  withdrawn_at?: string;
  withdrawnAt?: string;
}

/**
 * Parsed CLI arguments for the compromised updater.
 */
export interface ParsedArguments {
  filePath: string;
  packagesToAdd: string[];
  fetchFromAPI: boolean;
}

/**
 * Exact compromised package entries collected from advisory data.
 */
export interface CollectedPackagesResult {
  packages: string[];
  count: number;
  skippedNonExact: number;
  skippedOutOfScope: number;
}

/**
 * Minimal project dependency state consumed by the updater when translating
 * advisory ranges into exact package@version entries for the current project.
 */
export interface ProjectDependencyStateLike {
  packageNames: Set<string>;
  exactPackages: Array<{
    name: string;
    version: string;
  }>;
}

/**
 * Result of merging existing and newly discovered package entries.
 */
export interface MergePackagesResult {
  packages: string[];
  added: number;
  skipped: number;
}

/**
 * Result of filtering existing file entries to exact, project-scoped entries.
 */
export interface PartitionedProjectEntries {
  confirmedPackages: Set<string>;
  removedNonExact: string[];
  removedOutOfScope: string[];
}

/**
 * Converts advisory payloads into exact compromised package entries that belong
 * to the current project dependency scope.
 */
export function collectPackagesFromAdvisories(
  advisories: NpmAdvisory[],
  projectDependencyState: ProjectDependencyStateLike,
): CollectedPackagesResult;

/**
 * Fetches every page from the GitHub Security Advisories API.
 */
export function fetchGitHubAdvisories(): Promise<object[]>;

/**
 * Returns `true` only for exact `package@version` entries.
 */
export function isConfirmedPackageEntry(packageEntry: string): boolean;

/**
 * Merges existing entries with new exact entries while preserving sort-ready
 * output and duplicate counts.
 */
export function mergePackages(existingPackages: Set<string>, packagesToAdd: string[]): MergePackagesResult;

/**
 * Parses updater CLI arguments into file path, manual package entries, and the
 * fetch/no-fetch mode.
 */
export function parseArguments(args?: string[]): ParsedArguments;

/**
 * Splits existing file entries into retained, non-exact, and out-of-scope
 * groups for project-scoped rewriting.
 */
export function partitionProjectScopedPackageEntries(
  packageEntries: Iterable<string>,
  projectPackageNames: Set<string>,
): PartitionedProjectEntries;

/**
 * Validates manually supplied exact package entries before they are written to
 * the compromised package file.
 */
export function validateManualPackages(packagesToAdd: string[], projectPackageNames: Set<string>): void;

/**
 * Returns `true` when an exact version satisfies the supplied advisory range.
 */
export function versionSatisfiesRange(version: string, range: string): boolean;
