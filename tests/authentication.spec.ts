import { test, expect } from '../fixtures/businessFixtures';
import { UserFactory } from '../factories/UserFactory';

test.describe('@Authentication', () => {

    test('@smoke should navigate to login page', async ({ page, loginPage }) => {

        await loginPage.open();

        await expect(page).toHaveURL(/\/login/);
    });

    test('@regression should display login form', async ({ loginPage }) => {

        await loginPage.open();

        await expect(loginPage.loginTitle).toBeVisible();
    });

    test('@critical should not login with invalid credentials', async ({ page, loginPage }) => {

        const invalidUser = UserFactory.invalidEmail();

        await loginPage.open();     

        await loginPage.login(
            invalidUser.email,
            invalidUser.password
        );

        await page.waitForTimeout(1000);
        await expect(page).toHaveURL(/\/login/);
        await expect(loginPage.loginButton).toBeVisible();
    });

    test('@critical @smoke should login successfully with valid credentials', async ({ loggedUser }) => {

        await expect(loggedUser.loggedInUser).toBeVisible();

    })

    test('@critical should register a new user successfully', async ({ page, loginPage, signupPage }) => {

        const newUser = UserFactory.valid();

        await loginPage.open();

        await signupPage.startSignup(
            newUser.name,
            newUser.email
        );

        await expect(page).toHaveURL(/\/signup/);
    });
});