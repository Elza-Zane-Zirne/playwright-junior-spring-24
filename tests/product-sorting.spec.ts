import { test, expect } from "@playwright/test";
import HomePage from "../page-objects/HomePage";
import ProductsPage from "../page-objects/ProductsPage";

// Create test case:  Change sorting option to Name (Z to A)
// Steps:
// -Sign in
// -Change sorting option
// -Make sure elemets are sorted accordingly

test.use({ storageState: ".auth/standard-user-auth.json" });

test.beforeEach(async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.navigateToPage("/inventory.html");
});

test("Change sorting option to Name (Z to A)", async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.selectSortingOption("Name (Z to A)");
  await productsPage.verifyItemsSortedDesc();
});
