import { test, expect } from '@playwright/test';

import { CartPage } from '../pages/CartPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Cart Page', () => {

    test('should add product to cart', async ({ page }) => {

        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await productsPage.open();
        await productsPage.addToCartFirstProduct();
        await productsPage.closeAddToCartModal();
        await cartPage.goToCart();

        await expect(cartPage.cartTitle).toBeVisible();
    });

    test('should remove product from cart', async ({ page }) => {

        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await productsPage.open();
        await productsPage.addToCartFirstProduct();
        await productsPage.closeAddToCartModal();
        await cartPage.goToCart();
        await cartPage.removeFirstProduct();

        await expect(cartPage.emptyCartMessage).toBeVisible();
    });
});
