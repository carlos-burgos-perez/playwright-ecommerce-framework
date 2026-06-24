import { test, expect } from '@playwright/test';

import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';

test.describe('Products Page', () => {

    test('should navigate to products page', async ({ page }) => {

        const productsPage = new ProductsPage(page);

        await productsPage.navigate();

        await expect(productsPage.productsTitle).toBeVisible();
    });

    test('should display products', async ({ page }) => {

        const productsPage = new ProductsPage(page);

        await productsPage.navigate();

        await expect(productsPage.productCards.first()).toBeVisible();
    });

    test('should display products list', async ({ page }) => {

        const productsPage = new ProductsPage(page);

        await productsPage.navigate();

        const hasProducts = await productsPage.hasProducts();

        expect(
            await productsPage.hasProducts()
        ).toBeTruthy();
    });

    test('should open product details page when clicking on a product', async ({ page }) => {

        const productsPage = new ProductsPage(page);

        const productDetailsPage = new ProductDetailsPage(page);

        await productsPage.navigate();

        await productsPage.openFirstProduct();

        await expect(productDetailsPage.productName).toBeVisible();

    });

});