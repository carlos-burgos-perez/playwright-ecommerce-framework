import { test } from '../fixtures/baseTest';

import users from '../fixtures/users.json';

import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout', () => {

    test ('should navigate successfully to checkout', async ({ loginPage, productsPage, cartPage, checkoutPage }) => {

        await loginPage.open();
        await loginPage.login(users.validUser.email, users.validUser.password);
        await productsPage.goToProducts();
        await productsPage.addToCartFirstProduct();
        await productsPage.closeAddToCartModal();
        await cartPage.goToCart();
        await checkoutPage.proceedToCheckout();
        await checkoutPage.verifyLoaded();
    });
});

