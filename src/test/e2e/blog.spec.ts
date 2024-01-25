import { expect, test } from '@playwright/test';

test.describe('blog page', () => {
  test('has title', async ({ page }) => {
    await page.goto('/#/blog');
    await expect(page).toHaveTitle('blog');
  });
});
