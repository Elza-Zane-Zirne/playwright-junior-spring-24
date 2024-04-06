import { test as setup } from "@playwright/test";
import HomePage from "../../page-objects/HomePage";
import ProductsPage from "../../page-objects/ProductsPage";

const authFile = ".auth/standard-user-auth.json";

setup("Sign in as standard user", async ({ page }) => {
  const homePage = new HomePage(page);
  const productsPage = new ProductsPage(page);

  await homePage.navigateToHomePage();
  await homePage.inputLoginData("standard_user", "secret_sauce");
  await homePage.clickLoginButton();
  await productsPage.assertPageUrl("/inventory.html");
  await productsPage.assertPageTitleText("Products");

  await page.context().storageState({ path: authFile });
});
