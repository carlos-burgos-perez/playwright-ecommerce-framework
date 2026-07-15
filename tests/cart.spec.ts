import { test, expect } from '../core/fixtures/businessFixtures';
import * as allure from 'allure-js-commons';
import { StepHelper } from '../utils/StepHelper';


test.describe('@Cart', () => {

    test.beforeEach(async () => {
        await allure.feature('Cart');
        await allure.story('Cart management');
        await allure.tag('cart');
    });

    test('@critical @smoke should add product to cart', async ({ loggedUser, productsPage, cartPage }) => {
        await allure.severity('critical');
        await allure.tag('smoke');

        await StepHelper.run('Open the products page', async () => {
            await productsPage.goToProducts();
        });

        await StepHelper.run('Add the first product to the cart', async () => {
            await productsPage.addToCartFirstProduct();
        });

        await StepHelper.run('Open the cart page', async () => {
            await cartPage.goToCart();
        });
    });

    test('@regression should remove product from cart', async ({ cartWithProduct }) => {
        await allure.severity('normal');
        await allure.tag('regression');

        await StepHelper.run('Remove the first product from the cart', async () => {
            await cartWithProduct.removeFirstProduct();
        });

        await StepHelper.run('Verify the empty cart message is shown', async () => {
            await expect(cartWithProduct.emptyCartMessage).toBeVisible();
        });
    });
});
