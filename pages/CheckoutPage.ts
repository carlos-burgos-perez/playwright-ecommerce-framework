import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {

    readonly proceedToCheckoutButton: Locator;
    readonly checkoutTitle: Locator;
    readonly addressDetails: Locator;
    readonly reviewOrderTitle: Locator;
    readonly placeOrderButton: Locator;

    constructor(page: Page) {
        super(page);

        this.proceedToCheckoutButton = page.locator('.check_out');
        this.checkoutTitle = page.locator('li.active').filter({ hasText: 'Checkout' }).first();
        this.addressDetails = page.getByText('Address Details');
        this.reviewOrderTitle = page.getByText('Review Your Order');
        this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
    }

    async proceedToCheckout() {

        await this.proceedToCheckoutButton.click();

    }

    async verifyLoaded() {

        await expect(this.checkoutTitle).toBeVisible();
        await expect(this.addressDetails).toBeVisible();
        await expect(this.reviewOrderTitle).toBeVisible();
        await expect(this.placeOrderButton).toBeVisible();
        
    }
}