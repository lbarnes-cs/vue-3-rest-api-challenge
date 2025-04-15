import { test, expect } from '@playwright/test';

test.describe('Handle network errors', () => {
  test('handles network request failure', async ({ page }) => {
    // Intercept the network request and mock a failure response
    await page.route('**/protocols**', (route) => {
      route.fulfill({
        status: 500, // Simulate a server error
        body: JSON.stringify({ message: 'Server Error' }),
      });
    });

    await page.goto('/');

    // Perform actions (e.g., fill in search and click)
    await page.locator('[data-testid="banner-input"] input').fill('test');

    // Wait for the network request to fail (status 500)
    const [response] = await Promise.all([
      page.waitForResponse(
        (res) => res.url().includes('protocols') && res.status() === 500,
      ),
      page.locator('[data-testid="banner-btn"]').click(),
    ]);

    // ✅ Expect the loading state to be visible during the network request
    const loading = page.locator('[data-testid="results-init-loading"]');
    await expect(loading).toBeVisible(); // Loading state should be visible during the request

    // ✅ Wait for the network request to finish (it should fail)
    await response.finished();

    // ✅ Now, wait for the loading state to disappear after the response is processed
    await expect(loading).toBeHidden(); // Loading should disappear after response

    // ✅ Check for the error banner after the timeout
    const errorBanner = page.locator('[data-testid="results-fetching-error"]');
    await expect(errorBanner).toBeVisible(); // Error message should be visible after failure

    // ✅ Check what error message says about the error
    const errorMessage = page.locator('[data-testid="error-message"]');
    await expect(errorMessage).toContainText(
      'Request failed with status code 500',
    );
  });

  test('handles network timeout', async ({ page }) => {
    // Go to the page first
    await page.goto('/');

    // Simulate the network request timeout by aborting the request
    await page.route('**/protocols**', (route) => {
      route.abort(); // Abort the request to simulate a timeout
    });

    // Perform actions (e.g., fill in search and click)
    await page.locator('[data-testid="banner-input"] input').fill('test');

    // Click the search button to initiate the request
    await page.locator('[data-testid="banner-btn"]').click();

    // ✅ Wait for the loading state to appear
    const loading = page.locator('[data-testid="results-init-loading"]');
    await expect(loading).toBeVisible(); // Loading state should be visible during the request

    // ✅ Now, wait for the request to be aborted (simulating a timeout)
    // Since the request was aborted, we don't wait for a successful response.
    const requestFailed = page.locator('[data-testid="error-message"]');

    // Wait for the network failure to trigger the error message
    await expect(requestFailed).toBeVisible();

    // ✅ Ensure that the loading state is no longer visible
    await expect(loading).toBeHidden();

    // ✅ Check for the error banner after the timeout
    const errorBanner = page.locator('[data-testid="error-message"]');
    await expect(errorBanner).toBeVisible(); // Error message should appear when network fails

    // ✅ Check what error message says about the error
    await expect(requestFailed).toContainText('Network Error');
  });
});
