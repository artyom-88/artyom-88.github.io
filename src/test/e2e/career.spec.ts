import { expect, test } from '@playwright/test';

test.describe('career page', () => {
  test('has title', async ({ page }) => {
    await page.goto('/#/career');
    await expect(page).toHaveTitle('career');
  });
});
