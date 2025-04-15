import { test, expect } from '@playwright/test';

test.describe('Search API Request and UI Behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Check the API query parameters include the searchKey
  test('sends a request with the correct search keyword', async ({ page }) => {
    await page.locator('[data-testid="banner-input"] input').fill('test');
    const [request] = await Promise.all([
      page.waitForRequest(
        (req) =>
          req.url().includes('protocols?') && req.url().includes('key=test'),
      ),
      page.locator('[data-testid="banner-btn"]').click(),
    ]);

    expect(request.url()).toContain('key=test');
  });

  // Has the inital `isLoading` state
  test('displays loading state after submitting the form', async ({ page }) => {
    await page.locator('[data-testid="banner-input"] input').fill('test');
    await page.locator('[data-testid="banner-btn"]').click();

    const loading = page.locator('[data-testid="results-init-loading"]');
    await expect(loading).toBeVisible();
  });

  test('defaults to 10 items per page in request, response, and UI', async ({
    page,
  }) => {
    const pageSize = 10;

    await page.locator('[data-testid="banner-input"] input').fill('test');

    const [response] = await Promise.all([
      page.waitForResponse(
        (res) =>
          res.url().includes('/protocols?') &&
          res.url().includes('key=test') &&
          res.url().includes(`page_size=${pageSize}`) &&
          res.status() === 200,
      ),
      page.locator('[data-testid="banner-btn"]').click(),
    ]);

    // ✅ Confirm request URL contains correct page_size
    expect(response.url()).toContain(`page_size=${pageSize}`);

    // ✅ Parse and check response body
    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('pagination');
    expect(responseBody.pagination.page_size).toBe(pageSize); // page_size is set to 10

    expect(Array.isArray(responseBody.items)).toBe(true);
    expect(responseBody.items.length).toBe(pageSize); // 10 items in the `items` array

    // ✅ Wait for cards to render
    const protocolCards = page.locator('[data-testid="protocol-card"]');
    await protocolCards.first().waitFor();

    // ✅ Check that 10 cards are rendered in the UI
    await expect(protocolCards).toHaveCount(pageSize);

    // ✅ Summary of information should show Page Size is 10
    const pageSizeElement = page.locator(
      '[data-testid="cards-summary-page-size"]',
    );

    await expect(pageSizeElement).toContainText(`${pageSize}`);
  });

  test('sends a request when the second pagination is clicked', async ({
    page,
  }) => {
    // Fill search input and trigger search
    await page.locator('[data-testid="banner-input"] input').fill('test');

    // Intercept the initial request and wait for the response
    const [initialResponse] = await Promise.all([
      page.waitForResponse(
        (res) =>
          res.url().includes('protocols?') &&
          res.url().includes('key=test') &&
          res.status() === 200,
      ),
      page.locator('[data-testid="banner-btn"]').click(),
    ]);

    // Ensure the initial request was completed successfully
    expect(initialResponse.url()).toContain('key=test');
    expect(initialResponse.status()).toBe(200);

    // Wait for the initial cards to load
    await page.waitForSelector('[data-testid="protocol-card"]');

    // Pagination component
    const pagination = page.locator('[data-test="v-pagination-root"]');
    await expect(pagination).toHaveAttribute('data-current-page', '1');

    // Check current page count
    const currentPage = page.locator(
      '[data-testid="cards-summary-current-page"]',
    );
    await expect(currentPage).toHaveText('1');

    // Locate second pagination item (page 2 is usually index 1)
    const secondPageItem = page
      .locator('[data-test="v-pagination-item"]')
      .nth(1);

    // Click the second page item
    await secondPageItem.click();

    // Run loading state assertions immediately after triggering the request
    await expect(
      page.locator('[data-testid="cards-loading-skeleton"]'),
    ).toBeVisible();

    await expect(
      page.locator('[data-testid="cards-summary-current-page-loading"]'),
    ).toBeVisible();

    // Then wait for the response to complete
    const secondPageResponse = await page.waitForResponse(
      (res) =>
        res.url().includes('protocols?') &&
        res.url().includes('key=test') &&
        res.url().includes('page_id=1') &&
        res.status() === 200,
    );

    // Confirm the response is as expected
    expect(secondPageResponse.status()).toBe(200);

    expect(secondPageResponse.status()).toBe(200);

    // Current page should now be on 2
    await expect(currentPage).toHaveText('2');
  });
});
