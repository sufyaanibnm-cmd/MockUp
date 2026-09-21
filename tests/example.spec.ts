import { test, expect } from '@playwright/test';

test('Shaffedits homepage loads', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await expect(page).toHaveTitle(/.*/);

  console.log('Page title:', await page.title());

  await page.screenshot({
    path: 'screenshots/homepage.png',
    fullPage: true
  });
});