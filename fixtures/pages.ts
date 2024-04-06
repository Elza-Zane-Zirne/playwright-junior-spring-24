import { test as baseTest } from "@playwright/test";
import BasePage from "../page-objects/BasePage";
import HomePage from "../page-objects/HomePage";
import ProductsPage from "../page-objects/ProductsPage";
import CartPage from "../page-objects/CartPage";

type Pages = {
  basePage: BasePage;
  homePage: HomePage;
  productsPage: ProductsPage;
  cartPage: CartPage;
};

const test = baseTest.extend<Pages>({
  basePage: async ({ page }, use) => await use(new BasePage(page)),
  homePage: async ({ page }, use) => await use(new HomePage(page)),
  productsPage: async ({ page }, use) => await use(new ProductsPage(page)),
  cartPage: async ({ page }, use) => await use(new CartPage(page)),
});

export default test;
