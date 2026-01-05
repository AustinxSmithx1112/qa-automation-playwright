import { test, expect } from '@playwright/test';

test('testing logging out after logging in', async ({ page }) => {
  await page.goto('https://calendly.com/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(process.env.CALENDLY_01_USERNAME);
  await page.locator('[data-testid="email-form"] [data-testid="primary-button"]').click();
  await page.getByRole('textbox', { name: 'Enter your password' }).fill(process.env.CALENDLY_01_PASSWORD);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Account settings' }).click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
  await expect(page.locator('#right-side-components')).toContainText('Log In');
});