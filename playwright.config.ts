import { defineConfig, devices } from '@playwright/test'
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './testing/tests',
  outputDir: './testing/.test-results',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  // Limit the number of failures on CI to save resources
  maxFailures: process.env.CI ? 10 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { outputFolder: './testing/.html-report' }], ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL ?? 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    // Setup reusable state/context - useful for things like auth.
    // See: https://playwright.dev/docs/auth#basic-shared-account-in-all-tests
    { name: 'setup', testMatch: /.*\.setup\.ts/, teardown: 'cleanup', },
    { name: 'cleanup', testMatch: /.*\.teardown\.ts/, },

    { name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: 'testing/.auth/user.json', },
      dependencies: ['setup'],
    },
    { name: 'firefox',
      use: { ...devices['Desktop Firefox'], storageState: 'testing/.auth/user.json', },
      dependencies: ['setup'],
    },
    { name: 'webkit',
      use: { ...devices['Desktop Safari'], storageState: 'testing/.auth/user.json', },
      dependencies: ['setup'],
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
   command: 'docker compose up --build',
   url: 'http://localhost:3000',
   reuseExistingServer: !process.env.CI,
  }
})
