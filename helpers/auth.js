
async function loginCalendly(page) {

  await page.goto(process.env.CALENDLY_UI_URL);

  await page.getByRole('textbox', { name: 'Email' }).fill(process.env.CALENDLY_01_USERNAME);
  await page.locator('[data-testid="email-form"] [data-testid="primary-button"]').click();

  await page.getByRole('textbox', { name: 'Enter your password' }).fill(process.env.CALENDLY_01_PASSWORD);
  await page.getByRole('button', { name: 'Continue' }).click();
}

module.exports = { loginCalendly };