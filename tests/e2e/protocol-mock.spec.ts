import { test, expect } from '@playwright/test';
import { protocolsFixture } from '../fixtures/protocolsFixture'; // Import the fixture

test.describe('Welcome Banner Tests', () => {
  test('The first protocol card is render correctly', async ({ page }) => {
    await page.route('**/protocols**', async (route, request) => {
      console.log('Intercepted request:', request.url());
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(protocolsFixture),
      });
    });

    await page.goto('/');

    const submitButton = page.locator('[data-testid="banner-btn"]');
    const inputField = page.locator('[data-testid="banner-input"] input');

    await inputField.fill('test');
    await submitButton.click();

    await page.waitForSelector('[data-testid="protocol-card"]');

    const cards = page.locator('[data-testid="protocol-card"]');
    await expect(cards).toHaveCount(10);

    const firstCard = cards.first();

    // Creator info
    await expect(firstCard.locator('[data-testid="creator-name"]')).toHaveText(
      'Laurence Barnes',
    );

    await expect(
      firstCard.locator('[data-testid="creator-link"]'),
    ).toHaveAttribute('href', 'https://github.com/lbarnes-cs/');

    // Title
    await expect(
      firstCard.locator('[data-testid="protocol-title"]'),
    ).toHaveText('Html Title should include a paragraph and a strong word');

    const titleHTML = await firstCard
      .locator('[data-testid="protocol-title"]')
      .innerHTML();
    expect(titleHTML).toBe(
      'Html Title should include a paragraph and a <strong>strong</strong> word',
    );

    // Stats
    await expect(
      firstCard.locator('[data-testid="stats-steps"]'),
    ).toContainText('19');
    await expect(
      firstCard.locator('[data-testid="stats-views"]'),
    ).toContainText('1.4k');
    await expect(
      firstCard.locator('[data-testid="stats-exports"]'),
    ).toContainText('3');
    await expect(
      firstCard.locator('[data-testid="stats-bookmarks"]'),
    ).toContainText('500');
    await expect(
      firstCard.locator('[data-testid="stats-comments"]'),
    ).toContainText('75.6k');
    await expect(
      firstCard.locator('[data-testid="stats-votes"]'),
    ).not.toBeVisible();

    // Card expansion: Check that `protocol-expanded` doesn't exist initially
    const expandButton = firstCard.locator(
      '[data-testid="protocol-expand-btn"]',
    );
    const expandedSection = firstCard.locator(
      '[data-testid="protocol-expand-section"]',
    );

    // Check that `protocol-expand-section` is not visible initially
    await expect(expandedSection).not.toBeVisible();

    // Click the expand button
    await expandButton.click();

    // Now verify `protocol-expand-section` exists
    await expect(expandedSection).toBeTruthy(); // Should now exist

    // Verify that `protocol-affiliation` is visible and contains the correct text
    const affiliation = firstCard.locator(
      '[data-testid="protocol-affiliation"]',
    );
    await expect(affiliation).toBeVisible();
    await expect(affiliation).toContainText(
      'RMIT, Royal Melbourne Institute of Technology',
    );
  });
});
