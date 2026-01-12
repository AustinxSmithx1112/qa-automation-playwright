import { test, expect } from '@playwright/test';
const { loginCalendly } = require('../helpers/auth');

test('get current user via API context', async ({ request }) => {
  const apiURL = 'https://api.calendly.com/users/me';

  const response = await request.get(apiURL, {
    headers: {
      Authorization: `Bearer ${process.env.CALENDLY_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log('Current User:', body);
});

test('event types page triggers /users/me/event_types with 200', async ({ page }) => {
  await loginCalendly(page);
  await expect(page).not.toHaveURL(/calendly\.com\/app\/login/, { timeout: 30_000 });

  // Pattern for the API call the UI should make
  const apiPathFragment = '/users/me/event_types';

  // In parallel: start waiting for the API response AND navigate to the page
  const [apiResponse] = await Promise.all([
    page.waitForResponse((res) =>
      res.url().includes(apiPathFragment) && res.request().method() === 'GET'
    ),
    page.goto('https://calendly.com/app/scheduling/meeting_types/user/me'),
  ]);

  // Assert the API call from the page was successful
  expect(apiResponse.status(), 'users/me/event_types should return HTTP 200').toBe(200);

  const apiBody = await apiResponse.json();
  console.log('Event Types API payload:', apiBody);

  // Optional: still assert that the UI rendered something based on that API call
  const eventTypeCards = page.locator('[data-testid="event-type-card"]');
  await expect(eventTypeCards).toHaveCountGreaterThan(0);
});