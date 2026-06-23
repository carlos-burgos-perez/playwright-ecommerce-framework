import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import { CookieBanner } from '../../pages/components/CookieBanner';

test.describe('Authentication', () => {

  test('should not login with invalid credentials', async ({ page }) => {
    
      const loginPage = new LoginPage(page);
      const cookieBanner = new CookieBanner(page);

      await loginPage.navigate();

      await cookieBanner.acceptCookies();

      await loginPage.login(
        'fake@email.com',
        'fakepassword'
      );

      await expect(loginPage.errorMessage).toBeVisible();
  });

  test('should navigate to login page', async ({ page }) => {

    const homePage = new HomePage(page);

    await homePage.navigate();

    const cookieBanner = new CookieBanner(page);

    await cookieBanner.acceptCookies();

    await homePage.signupLoginLink.click();

    await expect(page).toHaveURL('https://automationexercise.com/login');
  });
    
});
