import { test, expect } from '../fixtures/businessFixtures';


test.describe('Cart Page', () => {

    test('should add product to cart', async ({ loggedUser, productsPage, cartPage }) => {

        await productsPage.goToProducts();
        await productsPage.addToCartFirstProduct();
        await cartPage.goToCart();

    });

    test('should remove product from cart', async ({ cartWithProduct }) => {

        await cartWithProduct.removeFirstProduct();

        await expect(cartWithProduct.emptyCartMessage).toBeVisible();
    });
});
