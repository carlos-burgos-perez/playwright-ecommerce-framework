import { Locator, Page } from '@playwright/test';

import { BasePage } from './BasePage';

import { Environment } from '../config/Environment';
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
        await super.open(`${Environment.baseUrl}/view_cart`);
        await this.waitForVisible(this.cartTitle);
    }

    async removeFirstProduct() {
        await this.removeButton.first().click();
    }

}