import { expect, test } from '@playwright/test';

import { CareerDTO } from 'features/career/career-types';

test.describe('career page', () => {
  test('has default content', async ({ page }) => {
    await page.goto('/#/career');
    await expect(page).toHaveTitle('career');
    await expect(page.getByTestId('nav-menu')).toBeVisible();
    await expect(page.getByText('career')).toBeVisible();
  });

  test('has career item list', async ({ page }) => {
    const [response] = await Promise.all([
      page.waitForResponse((res) => res.url().includes('/api/career') && res.status() === 200),
      page.goto('/#/career'),
    ]);
    const careerItems: CareerDTO[] = await response.json();
    await Promise.all(
      careerItems.map(async ({ _id: id }) => {
        await expect(page.getByTestId(`career-item-${id}`)).toBeVisible();
      }),
    );
  });
});
