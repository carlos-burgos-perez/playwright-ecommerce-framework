import { Locator, Page } from '@playwright/test';

export class CookieBanner {

  readonly consentButton: Locator;

  constructor(private page: Page) {

    this.consentButton =
      page.getByRole('button', {
        name: 'Consent'
      });

  }

  async acceptCookies() {

    try {

      if (
        await this.consentButton
          .isVisible({ timeout: 2000 })
      ) {

        await this.consentButton.click();

      }

    } catch {

      // Cookie banner not displayed

    }

  }

}