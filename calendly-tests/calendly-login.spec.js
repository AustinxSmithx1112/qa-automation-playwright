const { test, expect } = require('@playwright/test');

test.describe('Login test with json auth file', () => {
  test.use({storageState: '.auth/calendly-customer.json',});
  
  test.beforeEach(async ({ page }) => {
      await page.goto('https://calendly.com/app/scheduling/meeting_types/user/me');
    })

  test('Verify user is logged in using storage state', async ({ page }) => {
        await expect(page).not.toHaveURL(/calendly\.com\/app\/login/, { timeout: 30_000 });
    });
  });