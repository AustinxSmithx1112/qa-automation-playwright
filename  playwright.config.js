// playwright.config.js
// Config for Practice Software Testing site
require('dotenv').config();

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  use: {
    baseURL: 'https://practicesoftwaretesting.com',
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    testIdAttribute: 'data-test',
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
});