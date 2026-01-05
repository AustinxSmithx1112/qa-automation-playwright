import { test as setup, expect } from '@playwright/test';

setup('Create calendly user oauth', async ({ page, context }) => {
  const email = process.env.CALENDLY_01_USERNAME;
  const password = process.env.CALENDLY_01_PASSWORD;
  const customerOAuthfile = '.auth/calendly-customer.json';

  await page.goto('https://calendly.com/login');

  await page.getByRole('textbox', { name: 'Email' }).fill(email);
   await page.locator('[data-testid="email-form"] [data-testid="primary-button"]'
  ).click();

  const passwordBox = page.getByRole('textbox', { name: /password/i });
  await passwordBox.fill(password);

  await page.getByRole('button', { name: /continue/i }).click();

  await expect(page).toHaveURL(/calendly\.com/);

  await context.storageState({ path: customerOAuthfile });
});