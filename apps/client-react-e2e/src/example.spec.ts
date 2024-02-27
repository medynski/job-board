import { expect, test } from '@playwright/test';

test('has app name', async ({ page }) => {
  await page.goto('/');

  expect(await await page.getByTestId('app-name').innerText()).toContain(
    'JavaScript remote jobs'
  );
});
