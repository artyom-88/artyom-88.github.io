export function logUpdateSummary(
  outputFilePath: string,
  packages: string[],
  preservedCount: number,
  added: number,
  skipped: number,
  removedCount?: number,
): void;

export function main(): Promise<void>;
