const { test, expect } = require('@playwright/test');

test('Calendly login succeeds with valid credentials', async ({ page }) => {
  await page.goto('https://calendly.com/login');

  await page.getByRole('textbox', { name: 'Email' }).fill(
    process.env.CALENDLY_01_USERNAME
  );

  await page.locator(
    '[data-testid="email-form"] [data-testid="primary-button"]'
  ).click();

  await page.getByRole('textbox', { name: 'Enter your password' }).fill(
    process.env.CALENDLY_01_PASSWORD
  );

  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page).toHaveURL(/calendly\.com\/app\//, { timeout: 30_000 });
});