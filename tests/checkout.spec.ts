import { test } from '@playwright/test';

import users from '../fixtures/users.json';

import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Page', () => {

    test ('should navigate successfully to checkout', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await loginPage.open();
        await loginPage.login(users.validUser.email, users.validUser.password);
        await loginPage.page.waitForTimeout(1000);
        await productsPage.open();
        await productsPage.addToCartFirstProduct();
        await productsPage.closeAddToCartModal();
        await cartPage.goToCart();
        await checkoutPage.proceedToCheckout();
        await checkoutPage.verifyCheckoutLoaded();
    });
});

