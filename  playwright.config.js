require('dotenv').config();

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '.',
  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
  },

  use: {
    baseURL: 'https://calendly.com',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    testIdAttribute: 'data-test',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.js/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'chromium',
      testMatch: /.*\.spec\.js/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/calendly-customer.json',
      },
    },
  ],

  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
});