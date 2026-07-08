import { test, expect } from '../core/fixtures/businessFixtures';
import { UserFactory } from '../factories/UserFactory';
import * as allure from 'allure-js-commons';

test.describe('@Authentication', () => {

    test.beforeEach(async () => {
        await allure.feature('Authentication');
        await allure.story('Login');
        await allure.tag('authentication');
    });

    test('@smoke should navigate to login page', async ({ page, loginPage }) => {
        await allure.severity('critical');
        await allure.tag('smoke');

        await allure.step('Open the login page', async () => {
            await loginPage.open();
        });

        await allure.step('Verify the login page is displayed', async () => {
            await expect(page).toHaveURL(/\/login/);
        });
    });

    test('@regression should display login form', async ({ loginPage }) => {
        await allure.severity('normal');
        await allure.tag('regression');

        await allure.step('Open the login page', async () => {
            await loginPage.open();
        });

        await allure.step('Verify the login form is visible', async () => {
            await expect(loginPage.loginTitle).toBeVisible();
        });
    });

    test('@critical should not login with invalid credentials', async ({ page, loginPage }) => {
        await allure.severity('critical');
        await allure.tag('critical');

        const invalidUser = UserFactory.invalidEmail();

        await allure.step('Open the login page', async () => {
            await loginPage.open();
        });

        await allure.step('Attempt login with invalid credentials', async () => {
            await loginPage.login(
                invalidUser.email,
                invalidUser.password
            );
        });

        await allure.step('Verify the error state is preserved', async () => {
            await page.waitForTimeout(1000);
            await expect(page).toHaveURL(/\/login/);
            await expect(loginPage.loginButton).toBeVisible();
        });
    });

    test('@critical @smoke should login successfully with valid credentials', async ({ loggedUser }) => {
        await allure.severity('critical');
        await allure.tag('smoke');
        await allure.tag('critical');

        await allure.step('Verify the authenticated user is displayed', async () => {
            await expect(loggedUser.loggedInUser).toBeVisible();
        });
    });

    test('@critical should register a new user successfully', async ({ page, loginPage, signupPage }) => {
        await allure.severity('critical');
        await allure.tag('critical');

        const newUser = UserFactory.valid();

        await allure.step('Open the login page', async () => {
            await loginPage.open();
        });

        await allure.step('Start the signup flow for a new user', async () => {
            await signupPage.startSignup(
                newUser.name,
                newUser.email
            );
        });

        await allure.step('Verify the signup page is displayed', async () => {
            await expect(page).toHaveURL(/\/signup/);
        });
    });
});