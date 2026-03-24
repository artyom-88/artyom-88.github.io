import type { ExactPackageEntry, ProjectDependencyState, ProjectDependencyStateInput } from './compromised-script-types';

export function readProjectManifest(filePath?: string): Record<string, unknown>;
export function getOverridePackageName(selector: string): string | null;
export function getManifestOverrideEntries(manifest?: Record<string, unknown>): Array<{ name: string; specifier: unknown }>;
export function getManifestDependencyNames(manifest?: Record<string, unknown>): Set<string>;
export function getExactManifestPackages(manifest?: Record<string, unknown>): ExactPackageEntry[];
export function normalizeResolvedVersion(version: string): string;
export function stripPeerDependencySuffix(value: string): string;
export function stripYamlQuotes(value: string): string;
export function getPackagesFromPnpmLockfileContent(content: string): ExactPackageEntry[];
export function getPackagesFromPnpmLockfile(filePath?: string): ExactPackageEntry[];
export function createProjectDependencyState(input?: ProjectDependencyStateInput): ProjectDependencyState;
export function getProjectDependencyState(options?: { manifestPath?: string; lockfilePath?: string }): ProjectDependencyState;
