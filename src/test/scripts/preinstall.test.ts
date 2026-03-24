import { describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_COMPROMISED_REFRESH_MAX_AGE_MS,
  getCompromisedRefreshMaxAgeMs,
  runPreinstall,
  shouldRefreshCompromisedPackages,
  shouldSkipPreinstallSecurity,
} from '../../../scripts/preinstall.js';

describe('preinstall hook helpers', () => {
  it('should skip security checks in CI', () => {
    expect(shouldSkipPreinstallSecurity({ CI: 'true' } as NodeJS.ProcessEnv)).toBe(true);
    expect(shouldSkipPreinstallSecurity({ SKIP_PREINSTALL_SECURITY: '1' } as NodeJS.ProcessEnv)).toBe(true);
    expect(shouldSkipPreinstallSecurity({ SKIP_PREINSTALL_SECURITY: 'true' } as NodeJS.ProcessEnv)).toBe(true);
    expect(shouldSkipPreinstallSecurity({} as NodeJS.ProcessEnv)).toBe(false);
  });

  it('should use the default compromised refresh max age when env is unset or invalid', () => {
    expect(getCompromisedRefreshMaxAgeMs({} as NodeJS.ProcessEnv)).toBe(DEFAULT_COMPROMISED_REFRESH_MAX_AGE_MS);
    expect(getCompromisedRefreshMaxAgeMs({ COMPROMISED_REFRESH_MAX_AGE_MS: 'invalid' } as NodeJS.ProcessEnv)).toBe(
      DEFAULT_COMPROMISED_REFRESH_MAX_AGE_MS,
    );
  });

  it('should allow overriding the compromised refresh max age in milliseconds', () => {
    expect(getCompromisedRefreshMaxAgeMs({ COMPROMISED_REFRESH_MAX_AGE_MS: '60000' } as NodeJS.ProcessEnv)).toBe(60000);
  });

  it('should not run commands when CI skip is active', () => {
    const exec = vi.fn();

    runPreinstall({
      env: { CI: 'true' } as NodeJS.ProcessEnv,
      exec,
    });

    expect(exec).not.toHaveBeenCalled();
  });

  it('should refresh compromised packages locally when the file is stale', () => {
    const staleReadFileState = vi.fn().mockReturnValue({
      refreshedAt: new Date(Date.now() - DEFAULT_COMPROMISED_REFRESH_MAX_AGE_MS - 1).toISOString(),
    });

    expect(
      shouldRefreshCompromisedPackages({
        readFileState: staleReadFileState,
      }),
    ).toBe(true);
  });

  it('should skip the compromised refresh locally when the file is recent', () => {
    const recentReadFileState = vi.fn().mockReturnValue({
      refreshedAt: new Date().toISOString(),
    });

    expect(
      shouldRefreshCompromisedPackages({
        readFileState: recentReadFileState,
      }),
    ).toBe(false);
  });

  it('should refresh compromised packages locally when the file has no refresh metadata', () => {
    const readFileState = vi.fn().mockReturnValue({
      refreshedAt: null,
    });

    expect(
      shouldRefreshCompromisedPackages({
        readFileState,
      }),
    ).toBe(true);
  });

  it('should run only-allow, refresh, and compromised check locally when the file is stale', () => {
    const exec = vi.fn();

    runPreinstall({
      env: {} as NodeJS.ProcessEnv,
      exec,
      readFileState: () => ({
        refreshedAt: new Date(Date.now() - DEFAULT_COMPROMISED_REFRESH_MAX_AGE_MS - 1).toISOString(),
      }),
    });

    expect(exec.mock.calls.map(([command]) => command)).toEqual([
      'npx --yes only-allow@1.2.2 pnpm',
      'pnpm compromised:update',
      'pnpm compromised:check',
    ]);
  });

  it('should skip the refresh but still run the check locally when the file is recent', () => {
    const exec = vi.fn();

    runPreinstall({
      env: {} as NodeJS.ProcessEnv,
      exec,
      readFileState: () => ({
        refreshedAt: new Date().toISOString(),
      }),
    });

    expect(exec.mock.calls.map(([command]) => command)).toEqual(['npx --yes only-allow@1.2.2 pnpm', 'pnpm compromised:check']);
  });
});
