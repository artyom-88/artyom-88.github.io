export const DEFAULT_COMPROMISED_REFRESH_MAX_AGE_MS: number;
export interface PreinstallCompromisedFileState {
  refreshedAt: string | null;
}

export type PreinstallReadFileStateFn = (path: string, options?: { allowMissing?: boolean }) => PreinstallCompromisedFileState;

export function shouldSkipPreinstallSecurity(env?: NodeJS.ProcessEnv): boolean;
export function getCompromisedRefreshMaxAgeMs(env?: NodeJS.ProcessEnv): number;
export function shouldRefreshCompromisedPackages(options?: {
  env?: NodeJS.ProcessEnv;
  now?: number;
  readFileState?: PreinstallReadFileStateFn;
}): boolean;
export function runCommand(command: string, options?: { exec?: typeof import('node:child_process').execSync }): void;
export function runPreinstall(options?: {
  env?: NodeJS.ProcessEnv;
  exec?: typeof import('node:child_process').execSync;
  now?: number;
  readFileState?: PreinstallReadFileStateFn;
}): void;
export function main(): void;
