import { test, expect } from '../fixtures/businessFixtures';


import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('@Checkout', () => {

    test('@critical @smoke should navigate successfully to checkout', async ({ cartWithProduct, checkoutPage }) => {

        await checkoutPage.proceedToCheckout();
        await checkoutPage.verifyLoaded();
    });
});

