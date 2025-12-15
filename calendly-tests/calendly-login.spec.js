const { test, expect } = require('@playwright/test');

test('login test', async ({ page }) => {
  await page.goto('https://calendly.com/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('austin.smith+playwrightuser1@calendly.com');
  await page.locator('[data-testid="email-form"] [data-testid="primary-button"]').click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill('Welcome01@@!!');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('h1')).toContainText('Scheduling');
});