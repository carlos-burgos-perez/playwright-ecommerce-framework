import { test, expect } from '../core/fixtures/businessFixtures';
import * as allure from 'allure-js-commons';


test.describe('@Cart', () => {

    test.beforeEach(async () => {
        await allure.feature('Cart');
        await allure.story('Cart management');
        await allure.tag('cart');
    });

    test('@critical @smoke should add product to cart', async ({ loggedUser, productsPage, cartPage }) => {
        await allure.severity('critical');
        await allure.tag('smoke');

        await allure.step('Open the products page', async () => {
            await productsPage.goToProducts();
        });

        await allure.step('Add the first product to the cart', async () => {
            await productsPage.addToCartFirstProduct();
        });

        await allure.step('Open the cart page', async () => {
            await cartPage.goToCart();
        });
    });

    test('@regression should remove product from cart', async ({ cartWithProduct }) => {
        await allure.severity('normal');
        await allure.tag('regression');

        await allure.step('Remove the first product from the cart', async () => {
            await cartWithProduct.removeFirstProduct();
        });

        await allure.step('Verify the empty cart message is shown', async () => {
            await expect(cartWithProduct.emptyCartMessage).toBeVisible();
        });
    });
});
