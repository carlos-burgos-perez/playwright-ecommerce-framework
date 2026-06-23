import { Page, Locator } from "@playwright/test";

export class CookieBanner {

    readonly page: Page;
    readonly consentButton: Locator;

    constructor(page : Page) {

        this.page = page;

        this.consentButton = page.getByRole('button', { name: 'Consent' });
    }

    async acceptCookies() {
        try {
            // Wait for consent button to be present
            await this.consentButton.waitFor({ state: 'attached', timeout: 3000 }).catch(() => {});
            
            // Force click the consent button regardless of overlay
            if (await this.consentButton.isEnabled({ timeout: 1000 }).catch(() => false)) {
                await this.consentButton.click({ force: true, timeout: 5000 });
            }
            
            // Wait for the overlay to disappear after clicking
            await this.page.waitForSelector('.fc-dialog-overlay', { state: 'hidden', timeout: 5000 }).catch(() => {});
            
            // Final cleanup - remove any remaining overlay
            await this.page.evaluate(() => {
                document.querySelectorAll('.fc-dialog-overlay, .fc-consent-root').forEach(el => el.remove());
            });
        }
        catch (error) {
            console.error('Error while accepting cookies:', error);
        }
    }
}