import { Locator, Page } from '@playwright/test';

export class CookieBanner {

  readonly consentButton: Locator;
  readonly acceptAllButton: Locator;

  constructor(private page: Page) {

    this.consentButton = page.locator('button:has-text("Consent")');
    this.acceptAllButton = page.locator('button:has-text("Accept all")');

  }

  async acceptCookies() {

    try {

      if (await this.consentButton.isVisible({ timeout: 10000 })) {
        await this.consentButton.click();
      } else if (await this.acceptAllButton.isVisible({ timeout: 10000 })) {
        await this.acceptAllButton.click();
      }

      await this.page.waitForSelector('.fc-dialog-overlay', { state: 'hidden', timeout: 10000 });

    } catch {

      // Cookie banner not displayed

    }

  }

}