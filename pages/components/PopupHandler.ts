import { Page } from '@playwright/test';

export class PopupHandler {

    constructor(private page: Page) {}

    async closeKnownPopups() {
        
        const closeButtons = [
            this.page.locator('.close'),
            this.page.locator('.modal .btn-close'),
            this.page.getByRole('button', { name: '/close/i' }),
            this.page.getByRole('button', { name: '/dismiss/i' }),
            this.page.getByRole('button', { name: '/no/i' }),
            this.page.getByRole('button', { name: '×' })
        ];

        for (const button of closeButtons) {

            try {

                if (await button.first().isVisible({ timeout: 2000 })) {
                    await button.first().click();
                }
            } catch (e) {
                // Ignorar errores si el botón no está presente o no es visible
            }       
        }
    }
}