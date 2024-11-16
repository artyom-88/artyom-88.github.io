import { expect, test } from '@playwright/test';

test.describe.skip('main page', () => {
  test('has title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Hi! My name is Artёm.');
  });

  test('get started link', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('nav-menu').click();
    await expect(page.getByTestId('nav-menu-content')).toBeVisible();
  });
});
