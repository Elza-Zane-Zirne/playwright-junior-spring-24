import { test } from "@playwright/test";
import HomePage from "../page-objects/HomePage";
import ProductsPage from "../page-objects/ProductsPage";
import CartPage from "../page-objects/CartPage";

// Create test case:  Add an item to cart

// Steps:
// -Sign in
// -Add first product to the card
// -Make sure that it is visible in cart

// test.beforeEach(async ({ page }) => {
//   const homePage = new HomePage(page);
//   const productsPage = new ProductsPage(page);

//   await homePage.navigateToHomePage();
//   await homePage.inputLoginData("standard_user", "secret_sauce");
//   await homePage.clickLoginButton();
//   await productsPage.assertPageUrl("/inventory.html");
//   await productsPage.assertPageTitleText("Products");
// });

test("Add an item to cart", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await productsPage.addBackpackToCart();
  await productsPage.clickCartButton();

  await cartPage.assertPageUrl("/cart.html");
  await cartPage.assertItemIsVisibleInCart("Sauce Labs Backpack");
});
