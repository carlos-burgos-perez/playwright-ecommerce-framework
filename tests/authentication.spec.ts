import { test, expect } from '../core/fixtures/businessFixtures';
import { UserFactory } from '../factories/UserFactory';
import * as allure from 'allure-js-commons';
import { StepHelper } from '../utils/StepHelper';

test.describe('@Authentication', () => {

    test.beforeEach(async () => {
        await allure.feature('Authentication');
        await allure.story('Login');
        await allure.tag('authentication');
    });

    test('@smoke should navigate to login page', async ({ page, loginPage }) => {
        await allure.severity('critical');
        await allure.tag('smoke');

        await StepHelper.run('Open the login page', async () => {
            await loginPage.open();
        });

        await StepHelper.run('Verify the login page is displayed', async () => {
            await expect(page).toHaveURL(/\/login/);
        });
    });

    test('@regression should display login form', async ({ loginPage }) => {
        await allure.severity('normal');
        await allure.tag('regression');

        await StepHelper.run('Open the login page', async () => {
            await loginPage.open();
        });

        await StepHelper.run('Verify the login form is visible', async () => {
            await expect(loginPage.loginTitle).toBeVisible();
        });
    });

    test('@critical should not login with invalid credentials', async ({ page, loginPage }) => {
        await allure.severity('critical');
        await allure.tag('critical');

        const invalidUser = UserFactory.invalidEmail();

        await StepHelper.run('Open the login page', async () => {
            await loginPage.open();
        });

        await StepHelper.run('Attempt login with invalid credentials', async () => {
            await loginPage.login(
                invalidUser.email,
                invalidUser.password
            );
        });

        await StepHelper.run('Verify the error state is preserved', async () => {
            await page.waitForTimeout(1000);
            await expect(page).toHaveURL(/\/login/);
            await expect(loginPage.loginButton).toBeVisible();
        });
    });

    test('@critical @smoke should login successfully with valid credentials', async ({ loggedUser }) => {
        await allure.severity('critical');
        await allure.tag('smoke');
        await allure.tag('critical');

        await StepHelper.run('Verify the authenticated user is displayed', async () => {
            await expect(loggedUser.loggedInUser).toBeVisible();
        });
    });

    test('@critical should register a new user successfully', async ({ page, loginPage, signupPage }) => {
        await allure.severity('critical');
        await allure.tag('critical');

        const newUser = UserFactory.valid();

        await StepHelper.run('Open the login page', async () => {
            await loginPage.open();
        });

        await StepHelper.run('Start the signup flow for a new user', async () => {
            await signupPage.startSignup(
                newUser.name,
                newUser.email
            );
        });

        await StepHelper.run('Verify the signup page is displayed', async () => {
            await expect(page).toHaveURL(/\/signup/);
        });
    });
});