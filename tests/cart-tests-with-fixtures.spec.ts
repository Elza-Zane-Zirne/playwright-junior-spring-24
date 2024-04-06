import test from "../fixtures/pages";

// test.beforeEach(async ({ homePage, productsPage }) => {
//   await homePage.navigateToHomePage();
//   await homePage.inputLoginData("standard_user", "secret_sauce");
//   await homePage.clickLoginButton();
//   await productsPage.assertPageUrl("/inventory.html");
//   await productsPage.assertPageTitleText("Products");
// });

test("Add an item to cart", async ({ productsPage, cartPage }) => {
  await productsPage.addBackpackToCart();
  await productsPage.clickCartButton();

  await cartPage.assertPageUrl("/cart.html");
  await cartPage.assertItemIsVisibleInCart("Sauce Labs Backpack");
});
