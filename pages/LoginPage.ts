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
    readonly loggedInUser: Locator;

    constructor(page: Page) {

        super(page);
        this.page = page;
        

        this.emailInput = page.locator('[data-qa="login-email"]');
        this.passwordInput = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');
        this.errorMessage = page.getByText('Your email or password is incorrect!');
        this.loginTitle = page.getByText('Login to your account');
        this.loggedInUser = page.getByText('Logged in as');
    }

    async open() {
        
        await super.open(`${Environment.baseUrl}/login`);
        await this.verifyLoaded();
    }

    async verifyLoaded(){
        
        await this.waitForVisible(this.loginTitle);

    }

    async login(
        email: string,
        password: string
    ) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click(); 
    }

    async verifyLoggedIn() {

        await this.loggedInUser.waitFor({
            state: 'visible'
        });
    }
}
