import { test, expect } from '../core/fixtures/businessFixtures';
import * as allure from 'allure-js-commons';
import { StepHelper } from '../utils/StepHelper';
import { AllureManager } from '../utils/AllureManager';
import { Features } from '../utils/metadata/features';
import { Severities } from '../utils/metadata/severities';

test.describe('@Products', () => {

    test.beforeEach(async () => {
        await AllureManager.configureTest({ 
            owner: 'carlos-burgos-perez', 
            feature: Features.Products, 
            story: 'Product browsing',
            severity: Severities.Critical
        });
        await allure.tag('products');
    });

    test('@smoke should navigate to products page', async ({ productsPage }) => {
        await allure.severity('critical');
        await allure.tag('smoke');

        await StepHelper.run('Open the products page', async () => {
            await productsPage.open();
        });

        await StepHelper.run('Verify the products title is visible', async () => {
            await expect(productsPage.productsTitle).toBeVisible();
        });
    });

    test('@regression should display products', async ({ productsPage }) => {
        await allure.severity('normal');
        await allure.tag('regression');

        await StepHelper.run('Open the products page', async () => {
            await productsPage.open();
        });

        await StepHelper.run('Verify product cards are visible', async () => {
            await expect(productsPage.productCards.first()).toBeVisible();
        });
    });

    test('@regression should display products list', async ({ productsPage }) => {
        await allure.severity('normal');
        await allure.tag('regression');

        await StepHelper.run('Open the products page', async () => {
            await productsPage.open();
        });

        await StepHelper.run('Verify the products list is populated', async () => {
            expect(await productsPage.hasProducts()).toBeTruthy();
        });
    });

    test('@critical should open product details page when clicking on a product', async ({ productsPage, productDetailsPage }) => {
        await allure.severity('critical');
        await allure.tag('critical');

        await StepHelper.run('Open the products page', async () => {
            await productsPage.open();
        });

        await StepHelper.run('Open the first product details page', async () => {
            await productsPage.openFirstProduct();
        });

        await StepHelper.run('Verify the product details page is displayed', async () => {
            await expect(productDetailsPage.productName).toBeVisible();
        });
    });

});