import { Locator, Page } from '@playwright/test';

import { BasePage } from './BasePage';

export class CartPage extends BasePage {

    readonly cartLink: Locator;
    readonly cartTitle: Locator;
    readonly removeButton: Locator;
    readonly emptyCartMessage: Locator;

    constructor(page: Page) {

        super(page);

        this.cartLink = page.locator('.shop-menu a[href="/view_cart"]');
        this.cartTitle = page.locator('#cart_info_table');
        this.removeButton = page.locator('.cart_quantity_delete');
        this.emptyCartMessage = page.getByText('Cart is empty!');
    
    }

    async goToCart() {
        await this.page.goto('https://automationexercise.com/view_cart', { waitUntil: 'load', timeout: 120000 });
        await this.waitForVisible(this.cartTitle);
    }

    async removeFirstProduct() {
        await this.removeButton.first().click();
    }

}