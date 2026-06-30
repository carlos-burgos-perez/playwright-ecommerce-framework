import { test, expect } from '../fixtures/businessFixtures';

import users from '../fixtures/users.json';

test.describe('Authentication', () => {

    test('should navigate to login page', async ({ page, loginPage }) => {

        await loginPage.open();

        await expect(page).toHaveURL(/\/login/);
    });

    test('should display login form', async ({ loginPage }) => {

        await loginPage.open();

        await expect(loginPage.loginTitle).toBeVisible();
    });

    test ('should not login with invalid credentials', async ({ page, loginPage }) => {

        await loginPage.open();     

        await loginPage.login(
            users.invalidUser.email,
            users.invalidUser.password
        );

        await page.waitForTimeout(1000);
        await expect(loginPage.errorMessage).toBeVisible();
    });

    test('should login successfully with valid credentials', async ({ loggedUser }) => {

        await expect(loggedUser.loggedInUser).toBeVisible();

    })

    test('should register a new user successfully', async ({ page, loginPage, signupPage }) => {

        const email = `qa${Date.now()}@test.com`;

        await loginPage.open();

        await signupPage.startSignup(
            users.newUser.name,
            email
        );

        await expect(page).toHaveURL(/\/signup/);
    });
});