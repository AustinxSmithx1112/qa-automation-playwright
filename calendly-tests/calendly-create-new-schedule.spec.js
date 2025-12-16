import { test, expect } from '@playwright/test';

function randomString(length = 8) {
  return Math.random().toString(36).slice(2, 2 + length);
}

function escapeRegex(input) {
  // Escapes characters that have special meaning in regex
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

test('create and delete schedule with random name', async ({ page }) => {
  await page.goto('https://calendly.com/login');

  await page.getByRole('textbox', { name: 'Email' }).fill(process.env.CALENDLY_01_USERNAME);
  await page.locator('[data-testid="email-form"] [data-testid="primary-button"]').click();

  await page.getByRole('textbox', { name: 'Enter your password' }).fill(process.env.CALENDLY_01_PASSWORD);
  await page.getByRole('button', { name: 'Continue' }).click();

  await page.getByRole('link', { name: 'Availability' }).click();
  await page.getByRole('button', { name: 'Schedule' }).click();
  await page.getByRole('button', { name: 'Create schedule' }).click();

  const scheduleName = `QA Schedule ${randomString()}`;
  await page.getByRole('textbox', { name: 'Schedule name' }).fill(scheduleName);
  await page.getByRole('button', { name: 'Create' }).click();

  // Open the schedule you just created
  await page.getByRole('button', { name: 'Schedule' }).click();
  await page.getByRole('button', { name: scheduleName }).click();

  // Open settings for that exact schedule (regex lets it match “<name> settings” reliably)
  const settingsName = new RegExp(`^${escapeRegex(scheduleName)}\\s*settings$`, 'i');
  await page.getByRole('button', { name: settingsName }).click();

  await page.getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('button', { name: 'Delete schedule' }).click();

  // Optional sanity check that it’s gone
  await page.getByRole('button', { name: 'Schedule' }).click();
  await expect(page.getByRole('button', { name: scheduleName })).toHaveCount(0);
});