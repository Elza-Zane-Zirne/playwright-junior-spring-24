import { Page, Locator, expect } from "@playwright/test";
import BasePage from "./BasePage";

export default class CartPage extends BasePage {
  readonly page: Page;
  readonly cartItemName: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.cartItemName = this.page.getByTestId("inventory-item-name");
  }

  async assertItemIsVisibleInCart(itemName: string) {
    expect(this.cartItemName.getByText(itemName)).toBeVisible();
  }
}
