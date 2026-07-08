import { test, expect } from '../fixtures/businessFixtures';
import * as allure from 'allure-js-commons';

import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('@Checkout', () => {

    test.beforeEach(async () => {
        await allure.feature('Checkout');
        await allure.story('Checkout flow');
        await allure.tag('checkout');
    });

    test('@critical @smoke should navigate successfully to checkout', async ({ cartWithProduct, checkoutPage }) => {
        await allure.severity('critical');
        await allure.tag('smoke');

        await allure.step('Proceed to checkout', async () => {
            await checkoutPage.proceedToCheckout();
        });

        await allure.step('Verify the checkout page is loaded', async () => {
            await checkoutPage.verifyLoaded();
        });
    });
});

