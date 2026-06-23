import { Page } from '@playwright/test';

import { CookieBanner } from './components/CookieBanner';

export class BasePage {

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async acceptCookies() {
        
        const cookieBanner = new CookieBanner(this.page);
        await cookieBanner.acceptCookies();
    }
}