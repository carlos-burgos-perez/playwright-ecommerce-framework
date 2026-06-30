import { test, expect } from '../fixtures/baseTest';

import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';

test.describe('Products Page', () => {

    test('should navigate to products page', async ({ productsPage }) => {

        await productsPage.open();

        await expect(productsPage.productsTitle).toBeVisible();
    });

    test('should display products', async ({ productsPage }) => {

        await productsPage.open();

        await expect(productsPage.productCards.first()).toBeVisible();
    });

    test('should display products list', async ({ productsPage }) => {

        await productsPage.open();

        const hasProducts = await productsPage.hasProducts();

        expect(
            await productsPage.hasProducts()
        ).toBeTruthy();
    });

    test('should open product details page when clicking on a product', async ({ productsPage, productDetailsPage }) => {

        await productsPage.open();

        await productsPage.openFirstProduct();

        await expect(productDetailsPage.productName).toBeVisible();

    });

});