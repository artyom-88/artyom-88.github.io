import { describe, expect, it, vi } from 'vitest';
import { runPreinstall, shouldSkipPreinstallSecurity } from '../../../scripts/preinstall.js';

describe('preinstall hook helpers', () => {
  it('should skip security checks in CI', () => {
    expect(shouldSkipPreinstallSecurity({ CI: 'true' } as NodeJS.ProcessEnv)).toBe(true);
    expect(shouldSkipPreinstallSecurity({ SKIP_PREINSTALL_SECURITY: '1' } as NodeJS.ProcessEnv)).toBe(true);
    expect(shouldSkipPreinstallSecurity({ SKIP_PREINSTALL_SECURITY: 'true' } as NodeJS.ProcessEnv)).toBe(true);
    expect(shouldSkipPreinstallSecurity({} as NodeJS.ProcessEnv)).toBe(false);
  });

  it('should not run commands when CI skip is active', () => {
    const exec = vi.fn();

    runPreinstall({
      env: { CI: 'true' } as NodeJS.ProcessEnv,
      exec,
    });

    expect(exec).not.toHaveBeenCalled();
  });

  it('should run only-allow and compromised checks locally', () => {
    const exec = vi.fn();

    runPreinstall({
      env: {} as NodeJS.ProcessEnv,
      exec,
    });

    expect(exec.mock.calls.map(([command]) => command)).toEqual([
      'npx --yes only-allow@1.2.2 pnpm',
      'pnpm compromised:update',
      'pnpm compromised:check',
    ]);
  });
});
