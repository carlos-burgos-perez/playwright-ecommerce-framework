import { Locator, Page } from '@playwright/test';

import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {

    readonly productsLink: Locator;
    readonly productsTitle: Locator;
    readonly productCards: Locator;

    constructor(page: Page) {

        super(page);

        this.productsLink = page.locator('a[href="/products"]');
        this.productsTitle = page.getByText('All Products');
        this.productCards = page.locator('.features_items .product-image-wrapper');
    }

    async navigate() {
        await this.page.goto('https://automationexercise.com/');
        await this.acceptCookies();
        await this.productsLink.click();
    }

    async getProductCount(): Promise<number> {
        return await this.productCards.count();
    }

    async hasProducts() {
        return (await this.productCards.count()) > 0;
    }
}