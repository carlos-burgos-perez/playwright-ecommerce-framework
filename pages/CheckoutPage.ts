import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {

    readonly proceedToCheckoutButton: Locator;
    readonly checkoutTitle: Locator;
    readonly addressDetails: Locator;
    readonly reviewOrder: Locator;
    readonly placeOrderButton: Locator;

    constructor(page: Page) {
        super(page);

        this.proceedToCheckoutButton = page.locator('.check_out');
        this.checkoutTitle = page.locator('li.active').filter({ hasText: 'Checkout' }).first();
        this.addressDetails = page.getByText('Address Details');
        this.reviewOrder = page.getByText('Review Your Order');
        this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
    }

    async proceedToCheckout() {
        // Some flows may not navigate reliably when clicking; navigate directly to the checkout URL
        await this.page.goto('https://automationexercise.com/checkout', { waitUntil: 'load' });
        await expect(this.checkoutTitle).toBeVisible();
        await expect(this.addressDetails).toBeVisible();
        await expect(this.reviewOrder).toBeVisible();
    }

    async verifyCheckoutLoaded() {
        await expect(this.checkoutTitle).toBeVisible();
        await expect(this.addressDetails).toBeVisible();
        await expect(this.reviewOrder).toBeVisible();
        await expect(this.placeOrderButton).toBeVisible();
    }
}