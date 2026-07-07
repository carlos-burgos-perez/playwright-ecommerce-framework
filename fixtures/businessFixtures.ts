import 'dotenv/config';

import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';
import { UserFactory } from '../factories/UserFactory';
import { test as  base } from './baseTest';

const validUser = {
    ...UserFactory.registered(),
    email: process.env.VALID_EMAIL?.trim() || UserFactory.registered().email,
    password: process.env.VALID_PASSWORD?.trim() || UserFactory.registered().password
};

type BusinessPages = {
    loggedUser: LoginPage;
    guestUser: undefined;
    cartWithProduct: CartPage;
};

export const test = base.extend<BusinessPages>({

    loggedUser: async({ loginPage }, use) => {

        await loginPage.open();
        await loginPage.login(
            validUser.email,
            validUser.password
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