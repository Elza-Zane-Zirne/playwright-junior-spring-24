import { test, expect } from "@playwright/test";
import HomePage from "../page-objects/HomePage";
import ProductsPage from "../page-objects/ProductsPage";

//test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Successful auth tests", async () => {
  test("Sign in as standard user", async ({ page }) => {
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);

    await homePage.navigateToPage("/");
    await homePage.inputLoginData("standard_user", "secret_sauce");
    await homePage.clickLoginButton();
    await productsPage.assertPageUrl("/inventory.html");
    await productsPage.assertPageTitleText("Products");
  });
});

test.describe("Unsuccessful auth tests", async () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToPage("/");
  });
  //Sign in with incorect user data
  test("Sign in with incorect user data", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.inputLoginData("standard_user", "secret_sauce3524466");
    await homePage.clickLoginButton();

    await homePage.assertPageUrl("/");
    await homePage.assertErrorMessageText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  //Sign in with locked_out_user
  test("Sign in with locked_out_user", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.inputLoginData("locked_out_user", "secret_sauce");
    await homePage.clickLoginButton();

    await homePage.assertPageUrl("/");
    await homePage.assertErrorMessageText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });
});

test("Test generated with codegen", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText("Products");
});
