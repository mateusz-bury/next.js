const { test, expect } = require('@playwright/test');

test('Przekierowanie niezalogowanego użytkownika do logowania', async ({ page }) => {

  await page.goto('http://localhost:3000/user/profile');


  await expect(page).toHaveURL('http://localhost:3000/user/login');


  await expect(page.locator('h1')).toContainText('Zaloguj się na konto 😀');
});
