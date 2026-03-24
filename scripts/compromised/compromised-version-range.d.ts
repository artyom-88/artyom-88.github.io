import type { ProjectDependencyStateLike } from './compromised-script-types';

export function parseComparableVersion(version: string): {
  major: number;
  minor: number;
  patch: number;
  prerelease: Array<number | string>;
} | null;
export function comparePrereleaseIdentifiers(left: number | string, right: number | string): number;
export function compareComparableVersions(leftVersion: string, rightVersion: string): number | null;
export function getCaretRangeUpperBound(version: string): string | null;
export function getTildeRangeUpperBound(version: string): string | null;
export function expandNpmOperatorToken(token: string): string[];
export function parseRangeComparators(rangeClause: string): Array<{ operator: string; version: string }>;
export function matchesComparator(version: string, comparator: { operator: string; version: string }): boolean;
export function versionSatisfiesRange(version: string, range: string): boolean;
export function normalizeExactVersionToken(version: string): string | null;
export function isSpecificVersion(version: string): boolean;
export function warnSkippedNonExactAdvisory(packageName: string, versionDescriptor: string): void;
export function getExplicitVersionEntries(
  packageName: string,
  vulnerableVersions: string,
): { exactEntries: string[]; skippedNonExact: number };
export function getNormalizedExactVersions(vulnerableVersions?: string): string[];
export function getMatchingProjectEntriesForRange(
  packageName: string,
  vulnerableVersionRange: string,
  projectDependencyState: ProjectDependencyStateLike,
): string[];
