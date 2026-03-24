/**
 * Pre-commit hook helpers.
 * Runs dependency security refreshes only when package metadata changed in the staged set.
 */

export const DEPENDENCY_TRIGGER_FILES: ReadonlySet<string>;

export function parseStagedFiles(output: string | null | undefined): string[];

export function getStagedFiles(options?: {
  exec?: (
    command: string,
    options: {
      encoding: string;
      cwd: string;
      stdio: [string, string, string];
    },
  ) => string;
}): string[];

export function hasDependencyGraphChanges(stagedFiles: string[]): boolean;

export function runCommand(
  command: string,
  options?: {
    exec?: (
      command: string,
      options: {
        cwd: string;
        stdio: string;
      },
    ) => void;
  },
): void;

export function runPreCommit(options?: {
  stagedFiles?: string[];
  exec?: (command: string, options?: object) => string | undefined;
}): void;

export function main(): void;
