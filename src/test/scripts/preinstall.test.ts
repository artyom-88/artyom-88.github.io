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
    const staleReadRefreshState = vi.fn().mockReturnValue({
      refreshedAt: new Date(Date.now() - DEFAULT_COMPROMISED_REFRESH_MAX_AGE_MS - 1).toISOString(),
      dependencyGraphFingerprint: 'fingerprint-1',
    });

    expect(
      shouldRefreshCompromisedPackages({
        readRefreshState: staleReadRefreshState,
        computeFingerprint: () => 'fingerprint-1',
      }),
    ).toBe(true);
  });

  it('should skip the compromised refresh locally when the state is recent and the dependency graph matches', () => {
    const recentReadRefreshState = vi.fn().mockReturnValue({
      refreshedAt: new Date().toISOString(),
      dependencyGraphFingerprint: 'fingerprint-1',
    });

    expect(
      shouldRefreshCompromisedPackages({
        readRefreshState: recentReadRefreshState,
        computeFingerprint: () => 'fingerprint-1',
      }),
    ).toBe(false);
  });

  it('should refresh compromised packages locally when no refresh state exists', () => {
    const readRefreshState = vi.fn().mockReturnValue(null);

    expect(
      shouldRefreshCompromisedPackages({
        readRefreshState,
        computeFingerprint: () => 'fingerprint-1',
      }),
    ).toBe(true);
  });

  it('should refresh compromised packages locally when the dependency graph fingerprint changed', () => {
    const readRefreshState = vi.fn().mockReturnValue({
      refreshedAt: new Date().toISOString(),
      dependencyGraphFingerprint: 'fingerprint-1',
    });

    expect(
      shouldRefreshCompromisedPackages({
        readRefreshState,
        computeFingerprint: () => 'fingerprint-2',
      }),
    ).toBe(true);
  });

  it('should run only-allow, refresh, persist local state, and compromised check locally when state is stale', () => {
    const exec = vi.fn();
    const writeRefreshState = vi.fn();
    const now = Date.UTC(2026, 2, 23, 12, 0, 0);

    runPreinstall({
      env: {} as NodeJS.ProcessEnv,
      exec,
      now,
      readRefreshState: () => ({
        refreshedAt: new Date(now - DEFAULT_COMPROMISED_REFRESH_MAX_AGE_MS - 1).toISOString(),
        dependencyGraphFingerprint: 'fingerprint-1',
      }),
      computeFingerprint: () => 'fingerprint-1',
      writeRefreshState,
    });

    expect(exec.mock.calls.map(([command]) => command)).toEqual([
      'npx --yes only-allow@1.2.2 pnpm',
      'pnpm compromised:update',
      'pnpm compromised:check',
    ]);
    expect(writeRefreshState).toHaveBeenCalledWith({
      refreshedAt: '2026-03-23T12:00:00.000Z',
      dependencyGraphFingerprint: 'fingerprint-1',
    });
  });

  it('should skip the refresh but still run the check locally when the state is recent', () => {
    const exec = vi.fn();
    const writeRefreshState = vi.fn();

    runPreinstall({
      env: {} as NodeJS.ProcessEnv,
      exec,
      readRefreshState: () => ({
        refreshedAt: new Date().toISOString(),
        dependencyGraphFingerprint: 'fingerprint-1',
      }),
      computeFingerprint: () => 'fingerprint-1',
      writeRefreshState,
    });

    expect(exec.mock.calls.map(([command]) => command)).toEqual(['npx --yes only-allow@1.2.2 pnpm', 'pnpm compromised:check']);
    expect(writeRefreshState).not.toHaveBeenCalled();
  });
});
