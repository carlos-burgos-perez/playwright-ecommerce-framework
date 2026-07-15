import { test, expect } from '../core/fixtures/businessFixtures';
import * as allure from 'allure-js-commons';
import { StepHelper } from '../utils/StepHelper';
import { AllureManager } from '../utils/AllureManager';
import { Features } from '../utils/metadata/features';
import { Severities } from '../utils/metadata/severities';

test.describe('@Cart', () => {

    test.beforeEach(async () => {
        await AllureManager.configureTest({ 
            owner: 'carlos-burgos-perez', 
            feature: Features.Cart, 
            story: 'Cart management',
            severity: Severities.Critical
        });
        await allure.tag('cart');
    });

    test('@critical @smoke should add product to cart', async ({ productsPage, cartPage }) => {
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
        await StepHelper.run('Verify the cart page shows the cart table', async () => {
            await expect(cartPage.cartTitle).toBeVisible();
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
