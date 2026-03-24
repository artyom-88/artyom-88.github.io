export const DEFAULT_COMPROMISED_REFRESH_MAX_AGE_MS: number;
export interface PreinstallCompromisedRefreshState {
  refreshedAt: string;
  dependencyGraphFingerprint: string;
}

export type PreinstallReadRefreshStateFn = () => PreinstallCompromisedRefreshState | null;
export type PreinstallComputeFingerprintFn = () => string;
export type PreinstallWriteRefreshStateFn = (state: PreinstallCompromisedRefreshState) => void;

export function shouldSkipPreinstallSecurity(env?: NodeJS.ProcessEnv): boolean;
export function getCompromisedRefreshMaxAgeMs(env?: NodeJS.ProcessEnv): number;
export function shouldRefreshCompromisedPackages(options?: {
  env?: NodeJS.ProcessEnv;
  now?: number;
  readRefreshState?: PreinstallReadRefreshStateFn;
  computeFingerprint?: PreinstallComputeFingerprintFn;
}): boolean;
export function runCommand(command: string, options?: { exec?: typeof import('node:child_process').execSync }): void;
export function runPreinstall(options?: {
  env?: NodeJS.ProcessEnv;
  exec?: typeof import('node:child_process').execSync;
  now?: number;
  readRefreshState?: PreinstallReadRefreshStateFn;
  computeFingerprint?: PreinstallComputeFingerprintFn;
  writeRefreshState?: PreinstallWriteRefreshStateFn;
}): void;
export function main(): void;
