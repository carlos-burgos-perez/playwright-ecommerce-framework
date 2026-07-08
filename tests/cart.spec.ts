import { test, expect } from '../fixtures/businessFixtures';


test.describe('@Cart', () => {

    test('@critical @smoke should add product to cart', async ({ loggedUser, productsPage, cartPage }) => {

        await productsPage.goToProducts();
        await productsPage.addToCartFirstProduct();
        await cartPage.goToCart();

    });

    test('@regression should remove product from cart', async ({ cartWithProduct }) => {

        await cartWithProduct.removeFirstProduct();

        await expect(cartWithProduct.emptyCartMessage).toBeVisible();
    });
});
