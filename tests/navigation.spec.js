const { test, expect } = require('@playwright/test');

test('has link to login page', async ({ page }) => {

  await page.goto('http://localhost:3000/');

  await page.click("text=Login");

  await expect(page).toHaveURL('http://localhost:3000/user/login');

  await expect(page.locator('h1')).toContainText('Zaloguj się na konto 😀');
});
