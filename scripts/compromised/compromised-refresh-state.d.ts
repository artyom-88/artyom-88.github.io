import type { CompromisedRefreshState } from './compromised-script-types';

export function getCompromisedRefreshStateFilePath(rootDir?: string): string;
export function computeCompromisedRefreshFingerprint(rootDir?: string): string;
export function isValidCompromisedRefreshState(value: unknown): value is CompromisedRefreshState;
export function readCompromisedRefreshState(filePath?: string): CompromisedRefreshState | null;
export function writeCompromisedRefreshState(state: CompromisedRefreshState, filePath?: string): void;
export function shouldRefreshCompromisedFromState(
  state: CompromisedRefreshState | null,
  dependencyGraphFingerprint: string,
  now?: number,
  maxAgeMs?: number,
): boolean;
