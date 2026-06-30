import { test, expect } from '../fixtures/businessFixtures';

test.describe('Products Page', () => {

    test('should navigate to products page', async ({ guestUser, productsPage }) => {

        await productsPage.open();

        await expect(productsPage.productsTitle).toBeVisible();
    });

    test('should display products', async ({ guestUser, productsPage }) => {

        await productsPage.open();

        await expect(productsPage.productCards.first()).toBeVisible();
    });

    test('should display products list', async ({ guestUser, productsPage }) => {

        await productsPage.open();

        expect(await productsPage.hasProducts()).toBeTruthy();
    });

    test('should open product details page when clicking on a product', async ({ guestUser, productsPage, productDetailsPage }) => {

        await productsPage.open();

        await productsPage.openFirstProduct();

        await expect(productDetailsPage.productName).toBeVisible();

    });

});