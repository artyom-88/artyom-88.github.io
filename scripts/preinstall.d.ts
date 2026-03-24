export function shouldSkipPreinstallSecurity(env?: NodeJS.ProcessEnv): boolean;
export function runCommand(command: string, options?: { exec?: typeof import('node:child_process').execSync }): void;
export function runPreinstall(options?: { env?: NodeJS.ProcessEnv; exec?: typeof import('node:child_process').execSync }): void;
export function main(): void;
