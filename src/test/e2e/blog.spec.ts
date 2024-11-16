import { expect, test } from '@playwright/test';

import { BlogDTO } from 'features/blog/blog-types';

test.describe('blog page', () => {
  test('has default content', async ({ page }) => {
    console.log('has default start');
    await page.goto('/#/blog');
    console.log(page.url());
    await expect(page).toHaveTitle('blog');
    await expect(page.getByTestId('nav-menu')).toBeVisible();
    await expect(page.getByText('blog')).toBeVisible();
    console.log('success');
  });

  test('has blog item list', async ({ page }) => {
    console.log('has blog item list start');
    const [response] = await Promise.all([
      page.waitForResponse((res) => res.url().includes('/api/blog') && res.status() === 200, { timeout: 60000 }),
      page.goto('/#/blog'),
    ]);
    console.log(page.url());
    const blogItems: BlogDTO[] = await response.json();
    await Promise.all(
      blogItems.map(async ({ _id: id }) => {
        await expect(page.getByTestId(`blog-item-${id}`)).toBeVisible();
      }),
    );
    console.log('success');
  });
});
