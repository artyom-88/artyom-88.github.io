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
 * Result of deciding which existing entries survive a refreshed advisory sync.
 */
export interface RefreshedExistingPackagesResult {
  preservedPackages: Set<string>;
  removedStaleConfirmed: string[];
}

/**
 * Result of a live advisory refresh: raw advisories when available plus the
 * exact package entries materialized from them.
 */
export interface AdvisoryRefreshData {
  advisories: object[] | null;
  packages: string[];
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
 * Fetches all pages for a single advisory type from the GitHub advisories API.
 */
export function fetchGitHubAdvisoryType(type: string): Promise<object[]>;

/**
 * Fetches advisories and the exact package entries materialized from them.
 */
export function fetchAdvisoryRefreshData(projectDependencyState: ProjectDependencyStateLike): Promise<AdvisoryRefreshData>;

/**
 * Fetches exact compromised packages for the current project dependency state.
 */
export function fetchVulnerablePackages(projectDependencyState: ProjectDependencyStateLike): Promise<string[]>;

/**
 * Resolves the GitHub token from env vars or the local gh CLI.
 */
export function getGitHubAuthToken(options?: {
  env?: Record<string, string | undefined>;
  exec?: typeof import('node:child_process').execSync;
}): string | null;

/**
 * Builds the headers used for advisory API requests.
 */
export function getGitHubApiHeaders(options?: {
  env?: Record<string, string | undefined>;
  exec?: typeof import('node:child_process').execSync;
}): Record<string, string>;

/**
 * Returns the curated fallback list or throws when the fallback is empty.
 */
export function getFallbackPackagesOrThrow(reason?: string): Promise<string[]>;

/**
 * Extracts exact `package@version` entries from a comma-separated advisory
 * field and rejects range-like tokens.
 */
export function getExplicitVersionEntries(
  packageName: string,
  vulnerableVersions: string,
): { exactEntries: string[]; skippedNonExact: number };

/**
 * Normalizes exact advisory tokens from a comma-separated version field.
 */
export function getNormalizedExactVersions(vulnerableVersions?: string): string[];

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
 * Normalizes an exact advisory token, stripping a leading `=` when present.
 */
export function normalizeExactVersionToken(version: string): string | null;

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
 * Selects which existing exact entries survive a refreshed advisory fetch.
 */
export function filterExistingPackagesForRefresh(
  existingPackages: Set<string>,
  advisories: object[] | null,
  fetchFromAPI: boolean,
): RefreshedExistingPackagesResult;

/**
 * Returns `true` when an existing exact package entry is still confirmed by
 * the current live advisories.
 */
export function isPackageEntryConfirmedByAdvisories(packageEntry: string, advisories: object[] | null): boolean;

/**
 * Validates manually supplied exact package entries before they are written to
 * the compromised package file.
 */
export function validateManualPackages(packagesToAdd: string[], projectPackageNames: Set<string>): void;

/**
 * Returns `true` when an exact version satisfies the supplied advisory range.
 */
export function versionSatisfiesRange(version: string, range: string): boolean;
