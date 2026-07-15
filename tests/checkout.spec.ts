import { test } from '../core/fixtures/businessFixtures';
import * as allure from 'allure-js-commons';
import { StepHelper } from '../utils/StepHelper';
import { AllureManager } from '../utils/AllureManager';
import { Features } from '../utils/metadata/features';
import { Severities } from '../utils/metadata/severities';

test.describe('@Checkout', () => {

    test.beforeEach(async () => {
        await AllureManager.configureTest({ 
            owner: 'carlos-burgos-perez', 
            feature: Features.Checkout, 
            story: 'Checkout flow', 
            severity: Severities.Critical, 
            description: 'Test case for navigating to checkout page' 
        });
        await allure.tag('checkout');
    });

    test('@critical @smoke should navigate successfully to checkout', async ({ checkoutPage }) => {
        await allure.severity('critical');
        await allure.tag('smoke');

        await StepHelper.run('Proceed to checkout', async () => {
            await checkoutPage.proceedToCheckout();
        });

        await StepHelper.run('Verify the checkout page is loaded', async () => {
            await checkoutPage.verifyLoaded();
        });
        await StepHelper.run('Sanity check - checkout title visible', async () => {
            await expect(checkoutPage.checkoutTitle).toBeVisible();
        });
    });
});

