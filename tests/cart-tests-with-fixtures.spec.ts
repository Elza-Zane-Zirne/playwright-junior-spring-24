import test from "../fixtures/pages";

test("Add an item to cart", async ({ productsPage, cartPage }) => {
  await productsPage.navigateToPage("/inventory.html");

  await productsPage.addBackpackToCart();
  await productsPage.clickCartButton();

  await cartPage.assertPageUrl("/cart.html");
  await cartPage.assertItemIsVisibleInCart("Sauce Labs Backpack");
});
