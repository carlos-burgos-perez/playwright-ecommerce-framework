import { test, expect } from '../fixtures/baseTest';

import { CartPage } from '../pages/CartPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Cart Page', () => {

    test('should add product to cart', async ({ productsPage, cartPage }) => {

        await productsPage.open();
        await productsPage.addToCartFirstProduct();
        await productsPage.closeAddToCartModal();
        await cartPage.goToCart();

        await expect(cartPage.cartTitle).toBeVisible();
    });

    test('should remove product from cart', async ({ productsPage, cartPage }) => {

        await productsPage.open();
        await productsPage.addToCartFirstProduct();
        await productsPage.closeAddToCartModal();
        await cartPage.goToCart();
        await cartPage.removeFirstProduct();

        await expect(cartPage.emptyCartMessage).toBeVisible();
    });
});
