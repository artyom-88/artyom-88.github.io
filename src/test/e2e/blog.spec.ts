import { expect, test } from '@playwright/test';

import { BlogDTO } from 'features/blog/blog-types';

test.describe('blog page', () => {
  test('has default content', async ({ page }) => {
    await page.goto('/#/blog');
    await expect(page).toHaveTitle('blog');
    await expect(page.getByTestId('nav-menu')).toBeVisible();
    await expect(page.getByText('blog')).toBeVisible();
  });

  test('has blog item list', async ({ page }) => {
    const [response] = await Promise.all([
      page.waitForResponse((res) => res.url().includes('/api/blog') && res.status() === 200, { timeout: 30000 }),
      page.goto('/#/blog'),
    ]);
    const blogItems: BlogDTO[] = await response.json();
    await Promise.all(
      blogItems.map(async ({ _id: id }) => {
        await expect(page.getByTestId(`blog-item-${id}`)).toBeVisible();
      }),
    );
  });
});
