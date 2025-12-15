## What this repo demonstrates

- Designing stable, maintainable automated tests
- Testing authentication flows and protected routes
- Writing selectors that survive UI changes
- Validating navigation, state changes, and error handling
- Translating real customer behavior into test coverage

## Testing philosophy

I approach testing by thinking beyond the happy path.

My background in customer support exposed me to how users actually behave:
mis-clicks, retries, partial inputs, and assumptions that don’t match the system.

These tests are designed to:
- Break workflows intentionally
- Validate real-world misuse cases
- Surface regressions that matter to customers

## Running the tests

```bash
npm install
npx playwright install
npx playwright test

To run a specific spec:
npx playwright test tests/calendly/login.spec.js