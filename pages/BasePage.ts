import { Locator, Page } from '@playwright/test';

import { CookieBanner } from './components/CookieBanner';

export class BasePage {

    protected readonly page: Page;
    protected readonly cookieBanner : CookieBanner;

    constructor(page: Page) {
        this.page = page;
        this.cookieBanner = new CookieBanner(page);
    }

    protected async open(url: string) {
        await this.page.goto(url, {
            waitUntil: 'domcontentloaded'
        });
        await this.page.waitForLoadState('load', { timeout: 20000 });

        await this.cookieBanner.acceptCookies();

        try {
            await this.page.waitForSelector('.fc-dialog-overlay', { state: 'hidden', timeout: 10000 });
        } catch {
            // overlay already hidden or not present
        }

    }

    protected async waitForVisible(locator: Locator) {
        await locator.waitFor({ state: 'visible', timeout: 10000 });
    }

}