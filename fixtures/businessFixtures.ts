import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';
import { test as  base } from './baseTest';
import users from './users.json';

type BusinessPages = {
    loggedUser: LoginPage;
    guestUser: undefined;
    cartWithProduct: CartPage;
};

export const test = base.extend<BusinessPages>({

    loggedUser: async({ loginPage }, use) => {

        await loginPage.open();
        await loginPage.login(
            users.validUser.email,
            users.validUser.password
        );

        await loginPage.verifyLoggedIn();
        await use(loginPage);
    },

    guestUser: async({}, use) => {

        // Intentionally empty.
        // Each Playwright test starts with a clean browser context.

        await use(undefined);
    },

    cartWithProduct: async({ loggedUser, productsPage, cartPage }, use) => {

        await productsPage.goToProducts();
        await productsPage.addToCartFirstProduct();
        await productsPage.closeAddToCartModal();
        await cartPage.goToCart();
        await use(cartPage);

    }
});

export { expect } from '@playwright/test';