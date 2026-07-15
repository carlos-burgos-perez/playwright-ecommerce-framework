import {Page, Locator } from '@playwright/test';

export class HomePage {

    readonly page: Page;

    readonly signupLoginLink: Locator;

    constructor(page: Page) {

        this.page = page;

        this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    }

    async navigate() {
        await this.page.goto('https://automationexercise.com/');
    }
}