import { expect, test } from '@playwright/test';

import type { BlogDTO } from 'features/blog/blog-types';

test.describe('blog page', () => {
  test('has default content', async ({ page }) => {
    await page.goto('/#/blog');
    await expect(page).toHaveTitle('blog');
    await expect(page.getByTestId('nav-menu')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'blog' })).toBeVisible();
  });

  test('has blog item list', async ({ page }) => {
    const [response] = await Promise.all([
      page.waitForResponse((res) => res.url().includes('/api/blog') && res.status() === 200),
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
