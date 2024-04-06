import { test } from "@playwright/test";
import HomePage from "../page-objects/HomePage";
import ProductsPage from "../page-objects/ProductsPage";
import CartPage from "../page-objects/CartPage";

// Create test case:  Add an item to cart

// Steps:
// -Sign in
// -Add first product to the card
// -Make sure that it is visible in cart

test("Add an item to cart", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await productsPage.navigateToPage("/inventory.html");
  await productsPage.addBackpackToCart();
  await productsPage.clickCartButton();

  await cartPage.assertPageUrl("/cart.html");
  await cartPage.assertItemIsVisibleInCart("Sauce Labs Backpack");
});
