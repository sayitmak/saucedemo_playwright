import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.zara.com/');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('tab', { name: 'MAN', exact: true }).click();
  await page.getByRole('tabpanel', { name: 'MAN', exact: true }).getByRole('button', { name: 'NEW ARRIVALS' }).click();
  await page.getByRole('link', { name: 'JACKETS' }).nth(2).click();
  await page.getByRole('link', { name: 'Padded jacket set with car' }).click();
  await page.getByRole('button', { name: 'Add FORD © JACQUARD QUILTED' }).click();
  await page.getByRole('button', { name: 'M', exact: true }).click();
  await page.getByRole('button', { name: 'Close' }).click();
});