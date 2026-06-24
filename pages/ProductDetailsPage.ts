import { Locator, Page } from '@playwright/test';

import { BasePage } from './BasePage';

export class ProductDetailsPage extends BasePage {

    readonly productName: Locator;

    constructor(page: Page) {

        super(page);

        this.productName = page.locator('.product-information h2');
    }
    
}