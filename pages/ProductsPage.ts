import { Locator, Page } from '@playwright/test';

import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {

    readonly productsLink: Locator;
    readonly productsTitle: Locator;
    readonly productCards: Locator;
    readonly viewProductButton: Locator;
    readonly addToCartButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {

        super(page);

        this.productsLink = page.locator('a[href="/products"]');
        this.productsTitle = page.getByText('All Products');
        this.productCards = page.locator('.features_items .product-image-wrapper');
        this.viewProductButton = page.locator('a[href*="/product_details/"]').first();
        this.addToCartButton = page.locator('a[data-product-id]').first();
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        
    }

    async navigate() {
        try {
            await this.page.goto('https://automationexercise.com/', { waitUntil: 'load', timeout: 120000 });
        } catch (e) {
            // Continuar incluso si hay timeout en goto
        }
        await this.acceptCookies();
        await this.productsLink.click();
    }

    async getProductCount(): Promise<number> {
        return await this.productCards.count();
    }

    async hasProducts() {
        return (await this.productCards.count()) > 0;
    }

    async openFirstProduct() {

        await this.viewProductButton.click();   
    }

    async addToCartFirstProduct() {
        await this.productCards.first().hover();
        await this.addToCartButton.first().click();
    }

    async closeAddToCartModal() {
        await this.continueShoppingButton.click();
    }

}
