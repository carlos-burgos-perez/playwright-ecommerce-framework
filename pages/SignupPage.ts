import { Page, Locator } from '@playwright/test';

export class SignupPage {

    readonly page: Page;

    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly signupButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.nameInput = page.locator('[data-qa="signup-name"]');
        this.emailInput = page.locator('[data-qa="signup-email"]');
        this.signupButton = page.locator('[data-qa="signup-button"]');
    }

    async startSignup(
        name: string,
        email: string
    ) {

        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.signupButton.click();
    }
}