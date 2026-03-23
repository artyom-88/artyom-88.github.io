/**
 * Shared types and helper declarations for the compromised-package scripts.
 *
 * These declarations intentionally mirror the JavaScript runtime modules so the
 * scripts can stay plain Node.js while tests and editor tooling still get
 * useful type information.
 */

/**
 * A package entry where the version may be omitted.
 *
 * Package-only entries are used by the scripts to represent wildcard matches in
 * `compromised.txt`, while exact package versions use a non-null `version`.
 */
export interface PackageEntry {
  name: string;
  version: string | null;
}

/**
 * A package entry that is guaranteed to have an exact version.
 */
export interface ExactPackageEntry {
  name: string;
  version: string;
}

/**
 * An exact package entry plus the sources that contributed it to the current
 * project dependency state.
 */
export interface ProjectPackage extends ExactPackageEntry {
  sources?: string[];
}

/**
 * A parsed entry from `compromised.txt`, preserving the original line for
 * reporting and duplicate detection.
 */
export interface CompromisedEntry extends PackageEntry {
  original: string;
}

/**
 * Input used to build the project dependency model from manifest, lockfile, and
 * installed package state.
 */
export interface ProjectDependencyStateInput {
  manifestDependencyNames?: Set<string>;
  manifestPackages?: ExactPackageEntry[];
  lockfilePackages?: ExactPackageEntry[];
  installedPackages?: ExactPackageEntry[];
}

/**
 * Normalized project dependency model used by both update and check scripts.
 */
export interface ProjectDependencyState {
  packageNames: Set<string>;
  exactPackages: ProjectPackage[];
}

/**
 * Lookup table keyed by package name, then exact version. Wildcard entries are
 * stored under `"*"`.
 */
export type CompromisedLookup = Map<string, Map<string, string>>;

/**
 * Builds a fast lookup table for exact and wildcard compromised package
 * matches.
 */
export function buildCompromisedLookup(entries: CompromisedEntry[]): CompromisedLookup;

/**
 * Merges manifest, lockfile, and installed packages into a single project
 * dependency model.
 */
export function createProjectDependencyState(input?: ProjectDependencyStateInput): ProjectDependencyState;

/**
 * Finds the matching compromised entry for an exact project package, if any.
 */
export function findCompromisedMatch(pkg: ProjectPackage, compromisedLookup: CompromisedLookup): string | null;

/**
 * Extracts exact package versions from `package.json`.
 */
export function getExactManifestPackages(manifest?: Record<string, unknown>): ExactPackageEntry[];

/**
 * Collects all package names that define the project dependency scope.
 */
export function getManifestDependencyNames(manifest?: Record<string, unknown>): Set<string>;

/**
 * Parses exact packages from `pnpm-lock.yaml` content.
 */
export function getPackagesFromPnpmLockfileContent(content: string): ExactPackageEntry[];

/**
 * Checks whether a project package matches a compromised package entry.
 */
export function isCompromised(pkg: PackageEntry, compromised: PackageEntry): boolean;

/**
 * Returns `true` when a dependency specifier is already an exact version.
 */
export function isExactVersionSpecifier(specifier: string): boolean;

/**
 * Compares two `package@version` style strings for duplicate semantics.
 */
export function isPackageDuplicate(existingPackage: string, packageToAdd: string): boolean;

/**
 * Parses `compromised.txt` into structured entries.
 */
export function parseCompromisedPackages(filePath: string): CompromisedEntry[];

/**
 * Splits a package string into its package name and optional version.
 */
export function parsePackageNameVersion(packageString: string): PackageEntry;
