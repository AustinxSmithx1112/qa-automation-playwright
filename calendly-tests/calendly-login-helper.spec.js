const { test, expect } = require('@playwright/test');
const { loginCalendly } = require('../helpers/auth');

test('login using helper function', async ({ page }) => {
  await loginCalendly(page);

  await expect(page).not.toHaveURL(/calendly\.com\/app\/login/, { timeout: 30_000 });
});