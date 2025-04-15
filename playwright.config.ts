import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;
const baseURL = process.env.E2E_BASE_URL || 'http://localhost:4000';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,

  retries: isCI ? 2 : 0,
  use: {
    baseURL,
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: isCI ? 'github' : 'list',
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Configure environment variables
  env: {
    VITE_API_URL: process.env.VITE_API_URL,
    VITE_ENV: process.env.VITE_ENV || 'development',
  },
});
