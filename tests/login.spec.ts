import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {

  test('should display login form', async ({ page }) => {

    await page.goto('https://automationexercise.com/login');

    await expect(
      page.getByText('Login to your account')
    ).toBeVisible();

  });

  test('should login with valid credentials', async ({ page }) => {
    
    await page.goto('https://automationexercise.com/login');

    await page.locator('[data-qa="login-email"]').fill('fake@email.com');
    await page.locator('[data-qa="login-password"]').fill('fakepassword');
    await page.locator('[data-qa="login-button"]').click();

    await expect(
      page.getByText('Logged in as')
    ).toBeVisible();

  });
});