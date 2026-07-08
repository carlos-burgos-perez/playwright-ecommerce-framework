import { CartPage } from '../../pages/CartPage';
import { LoginPage } from '../../pages/LoginPage';
import { UserFactory } from '../../factories/UserFactory';
import { Environment } from '../config/Environment';
import { test as  base } from './baseTest';

const registeredUser = UserFactory.registered();

const normalizeEnvValue = (value: string | undefined, fallback: string) => {
    const trimmedValue = value?.trim();

    if (!trimmedValue) {
        return fallback;
    }

    const placeholderValues = ['your-email@test.com', 'your-email', 'your-password'];

    return placeholderValues.includes(trimmedValue.toLowerCase()) ? fallback : trimmedValue;
};

const validUser = {
    ...registeredUser,
    email: normalizeEnvValue(Environment.validEmail, registeredUser.email),
    password: normalizeEnvValue(Environment.validPassword, registeredUser.password)
};

type BusinessPages = {
    loggedUser: LoginPage;
    authenticatedUser: LoginPage;
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

    authenticatedUser: async({ loginPage }, use) => {

        await loginPage.verifyLoggedIn();
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