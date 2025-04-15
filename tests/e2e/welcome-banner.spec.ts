// tests/e2e/welcome-banner.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Welcome Banner Tests', () => {
  // Ensure the page is loaded before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/'); // Navigate to your app
  });

  test('loads the default page', async ({ page }) => {
    // 1. Load the app
    await page.goto('/'); // Adjust URL if necessary

    // 2. Ensure you are on the welcomeBanner
    const welcomeBanner = await page.locator('[data-testid="banner"]');
    await expect(welcomeBanner).toBeVisible();

    // 3. Ensure searchResult is not visible
    const searchResults = await page.locator('[data-testid="searchResults"]');
    await expect(searchResults).not.toBeVisible();
  });

  test('tests the input and button', async ({ page }) => {
    // 1. Ensure the input field and button are visible
    const inputField = await page.locator('[data-testid="banner-input"]');
    const submitButton = await page.locator('[data-testid="banner-btn"]');
    await expect(inputField).toBeVisible();
    await expect(submitButton).toBeVisible();

    // 2. Ensure there are no errors by default
    const errorAlert = await page.locator('[data-testid="banner-error"]');
    await expect(errorAlert).not.toBeVisible();
  });

  test('test the error states', async ({ page }) => {
    const form = await page.locator('[data-testid="banner-form"]');
    const submitButton = await page.locator('[data-testid="banner-btn"]');
    const errorAlert = await page.locator('[data-testid="banner-error"]');
    const inputField = await page.locator('[data-testid="banner-input"] input');

    // 1. Click the submit button and expect an error message
    await submitButton.click();
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toHaveText('Please enter a search value');

    // 2. Ensure the class 'submit-form--hasError' is applied to the form
    await expect(form).toHaveClass(/submit-form--hasError/);

    // 3. Type a keyword "test", and ensure the error message is gone
    await inputField.fill('test');
    await expect(errorAlert).not.toBeVisible();
  });

  test('submitting a keyword takes you to the searchResult view', async ({
    page,
  }) => {
    const submitButton = await page.locator('[data-testid="banner-btn"]');
    const searchResults = await page.locator('[data-testid="searchResults"]');
    const inputField = await page.locator('[data-testid="banner-input"] input');

    // 1. Type a keyword "test"
    await inputField.fill('test');

    // 2. Click the submit button again, and expect to be redirected to the other view
    await submitButton.click();

    // 3. Ensure the searchResults component is visible on the new page
    await expect(searchResults).toBeVisible();
  });
});
