import path from 'node:path';
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: [path.resolve(__dirname, '.', '.env.local'), path.resolve(__dirname, '.', '.env.test')] });

const baseUrl = `https://${process.env.VITE_DOMAIN}:${process.env.VITE_PORT}`;

export default defineConfig({
  testDir: '././src/test/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: 'html',
  use: {
    baseURL: baseUrl,
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'pnpm start',
    ignoreHTTPSErrors: true,
    reuseExistingServer: !process.env.CI,
    url: baseUrl,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // TODO: fix HTTPS issue with Firefox tests
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
});
