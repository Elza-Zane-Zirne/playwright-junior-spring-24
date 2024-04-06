import { Page, Locator, expect } from "@playwright/test";
import BasePage from "./BasePage";

export default class ProductsPage extends BasePage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly sortingDropdown: Locator;
  readonly selectedSortingOption: Locator;
  readonly productNames: Locator;
  readonly addToCartBackpackButton: Locator;
  readonly shoppingCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.pageTitle = this.page.getByTestId("title");
    this.sortingDropdown = this.page.getByTestId("product-sort-container");
    this.selectedSortingOption = this.page.getByTestId("active-option");
    this.productNames = this.page.getByTestId("inventory-item-name");
    this.addToCartBackpackButton = this.page.getByTestId(
      "add-to-cart-sauce-labs-backpack"
    );
    this.shoppingCartButton = this.page.getByTestId("shopping-cart-link");
  }

  async assertPageTitleText(titleText: string) {
    await this.assertText(this.pageTitle, titleText);
  }

  async selectSortingOption(option: string) {
    await this.sortingDropdown.selectOption(option);
    await this.assertText(this.selectedSortingOption, option);
  }

  async verifyItemsSortedDesc() {
    const itemNames = await this.productNames.allTextContents();
    const itemNamesSorted = itemNames.sort();

    expect(itemNames).toEqual(itemNamesSorted);
  }

  async addBackpackToCart() {
    await this.clickButton(this.addToCartBackpackButton);
  }

  async clickCartButton() {
    await this.clickButton(this.shoppingCartButton);
  }
}
