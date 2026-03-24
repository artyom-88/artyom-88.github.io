export interface PackageEntry {
  name: string;
  version: string | null;
}

export interface ExactPackageEntry {
  name: string;
  version: string;
}

export interface ProjectPackage extends ExactPackageEntry {
  sources?: string[];
}

export interface CompromisedEntry extends PackageEntry {
  original: string;
}

export interface CompromisedPackageFileState {
  packageEntries: string[];
  refreshedAt: string | null;
  manualPackages: Set<string>;
}

export interface ProjectDependencyStateInput {
  manifestDependencyNames?: Set<string>;
  manifestPackages?: ExactPackageEntry[];
  lockfilePackages?: ExactPackageEntry[];
}

export interface ProjectDependencyState {
  packageNames: Set<string>;
  exactPackages: ProjectPackage[];
}

export type CompromisedLookup = Map<string, Map<string, string>>;

export interface NpmAdvisoryPackage {
  ecosystem?: string;
  name: string;
}

export interface NpmAdvisoryVulnerability {
  package?: NpmAdvisoryPackage;
  vulnerable_version_range?: string;
  vulnerable_versions?: string;
}

export interface NpmAdvisory {
  package?: NpmAdvisoryPackage;
  vulnerabilities?: NpmAdvisoryVulnerability[];
  vulnerable_version_range?: string;
  vulnerable_versions?: string;
  withdrawn_at?: string;
  withdrawnAt?: string;
  ghsa_id?: string;
  id?: number | string;
}

export interface ParsedArguments {
  filePath: string;
  packagesToAdd: string[];
  fetchFromAPI: boolean;
}

export interface CollectedPackagesResult {
  packages: string[];
  count: number;
  skippedNonExact: number;
  skippedOutOfScope: number;
}

export interface ProjectDependencyStateLike {
  packageNames: Set<string>;
  exactPackages: ExactPackageEntry[];
}

export interface MergePackagesResult {
  packages: string[];
  added: number;
  skipped: number;
}

export interface RefreshedExistingPackagesResult {
  preservedPackages: Set<string>;
  removedStaleConfirmed: string[];
}

export interface AdvisoryRefreshData {
  advisories: object[] | null;
  packages: string[];
}

export interface PartitionedProjectEntries {
  confirmedPackages: Set<string>;
  removedNonExact: string[];
  removedOutOfScope: string[];
}
