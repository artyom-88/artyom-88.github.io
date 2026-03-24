export function assertUpdatedPackagesDefined(outputFilePath: string, packages: string[]): void;

export function logUpdateSummary(
  outputFilePath: string,
  packages: string[],
  preservedCount: number,
  added: number,
  skipped: number,
  removedCount?: number,
): void;

export function main(): Promise<void>;
