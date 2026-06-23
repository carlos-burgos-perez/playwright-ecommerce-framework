import { test, expect } from '@playwright/test';

import users from '../fixtures/users.json';

import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CookieBanner } from '../pages/components/CookieBanner';
import { SignupPage } from '../pages/SignupPage';

test.describe('Authentication', () => {

    test('should navigate to login page', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.navigate();

        await expect(page).toHaveURL(/\/login/);
    });

    test('should display login form', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.navigate();

        await expect(loginPage.loginTitle).toBeVisible();
    });

    test ('should not login with invalid credentials', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.navigate();     

        await loginPage.login(
            users.invalidUser.email,
            users.invalidUser.password
        );

        await page.waitForTimeout(1000);
        await expect(loginPage.errorMessage).toBeVisible();
    });

    test('should login successfully with valid credentials', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.navigate();

        await loginPage.login(
            users.validUser.email,
            users.validUser.password
        );

        await page.waitForTimeout(2000);
        await expect(loginPage.loggedInUser).toBeVisible();

    })

    test('should register a new user successfully', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const signupPage = new SignupPage(page);

        const email = `qa${Date.now()}@test.com`;

        await loginPage.navigate();

        await signupPage.startSignup(
            users.newUser.name,
            email
        );

        await expect(page).toHaveURL(/\/signup/);
    });
});