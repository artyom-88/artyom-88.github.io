export function assertUpdatedPackagesDefined(outputFilePath: string, packages: string[]): void;
export function arePackageEntrySetsEqual(leftEntries: Set<string>, rightEntries: Set<string>): boolean;
export function shouldWriteUpdatedPackages(
  packages: string[],
  existingPackages: Set<string>,
  manualPackages: Set<string>,
  existingManualPackages: Set<string>,
  removedCounts: number[],
): boolean;

export function logUpdateSummary(
  outputFilePath: string,
  packages: string[],
  preservedCount: number,
  added: number,
  skipped: number,
  removedCount?: number,
): void;

export function main(): Promise<void>;
