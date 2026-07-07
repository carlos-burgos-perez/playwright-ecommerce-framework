import { Locator, Page } from '@playwright/test';

import { BasePage } from './BasePage';

import { Environment } from '../config/Environment';

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

    async open() {
        
        await super.open(`${Environment.baseUrl}/products`);
        await this.goToProducts();

    }

    async goToProducts() {

        await this.page.goto('https://automationexercise.com/products', { waitUntil: 'load' });
        await this.verifyLoaded();

    }

    async getProductCount(): Promise<number> {
        return await this.productCards.count();
    }

    async hasProducts() {
        return (await this.productCards.count()) > 0;
    }

    async verifyLoaded() {
        await this.waitForVisible(this.productsTitle);
    }

    async openFirstProduct() {
        const firstView = this.page.locator('a[href*="/product_details/"]').first();
        const href = await firstView.getAttribute('href');
        if (href) {
            await this.page.goto(new URL(href, 'https://automationexercise.com').toString(), { waitUntil: 'load' });
        } else {
            await firstView.click();
        }
        // wait for product details to load
        await this.page.waitForSelector('.product-information h2', { state: 'visible', timeout: 10000 });
    }

    async addToCartFirstProduct() {
        await this.productCards.first().hover();
        await this.addToCartButton.first().click();
        await this.page.waitForSelector('button:has-text("Continue Shopping"), a:has-text("Continue Shopping")', { timeout: 10000 });
    }

    async closeAddToCartModal() {
        await this.continueShoppingButton.click();
        try {
            await this.page.waitForSelector('button:has-text("Continue Shopping"), a:has-text("Continue Shopping")', { state: 'hidden', timeout: 10000 });
        } catch {
            // continue button already hidden
        }
    }

}
