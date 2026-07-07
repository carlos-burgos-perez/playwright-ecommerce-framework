import { Page, Locator } from '@playwright/test';

import { BasePage } from './BasePage';

import { Environment } from '../config/Environment';
export class LoginPage extends BasePage {

    readonly page: Page;

    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly loginTitle: Locator;
    readonly loginForm: Locator;
    readonly loggedInUser: Locator;

    constructor(page: Page) {

        super(page);
        this.page = page;
        

        this.emailInput = page.locator('[data-qa="login-email"]');
        this.passwordInput = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');
        this.errorMessage = page.getByText('Your email or password is incorrect!');
        this.loginTitle = page.getByText('Login to your account');
        this.loginForm = page.locator('[data-qa="login-email"]');
        this.loggedInUser = page.getByText('Logged in as');
    }

    async open() {
        await this.page.context().clearCookies();

        await super.open(`${Environment.baseUrl}/login`);

        try {
            await this.page.evaluate(() => {
                window.localStorage.clear();
                window.sessionStorage.clear();
            });
        } catch {
            // Ignore storage access issues on blank or cross-origin pages.
        }

        await this.verifyLoaded();
    }

    async verifyLoaded(){
        await this.waitForVisible(this.loginForm);
        await this.waitForVisible(this.loginButton);
    }

    async login(
        email: string,
        password: string
    ) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);

        try {
            await this.page.locator('button:has-text("Consent")').click({ timeout: 2000 });
        } catch {
            // Consent banner not present.
        }

        try {
            await this.page.waitForSelector('.fc-dialog-overlay', { state: 'hidden', timeout: 5000 });
        } catch {
            // Overlay may already be gone or not present.
        }

        await this.loginButton.scrollIntoViewIfNeeded();
        await this.loginButton.click();
    }

    async verifyLoggedIn() {

        await this.loggedInUser.waitFor({
            state: 'visible'
        });
    }
}
