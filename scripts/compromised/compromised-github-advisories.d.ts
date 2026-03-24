export const DEFAULT_MAX_RETRIES: number;
export const DEFAULT_RETRY_DELAY_MS: number;
export const GITHUB_API_PER_PAGE: number;
export const RATE_LIMIT_ERROR: string;
export const GITHUB_ADVISORY_TYPES: string[];
export const BASE_GITHUB_API_HEADERS: Record<string, string>;

export function buildGitHubAdvisoriesUrl(type: string): string;
export function getGitHubAuthToken(options?: {
  env?: Record<string, string | undefined>;
  exec?: typeof import('node:child_process').execSync;
}): string | null;
export function getGitHubApiHeaders(options?: {
  env?: Record<string, string | undefined>;
  exec?: typeof import('node:child_process').execSync;
}): Record<string, string>;
export function retryWithBackoff<T>(fn: () => Promise<T>, maxRetries?: number, initialDelay?: number): Promise<T>;
export function getNextGitHubPageUrl(linkHeader: string | null): string | null;
export function fetchGitHubAdvisoryType(type: string): Promise<object[]>;
export function fetchGitHubAdvisories(): Promise<object[]>;
