import { Page, Locator } from "@playwright/test";
import BasePage from "./BasePage";

export default class HomePage extends BasePage {
  readonly page: Page;
  readonly userNameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorToastMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.userNameInput = this.page.getByTestId("username");
    this.passwordInput = this.page.getByPlaceholder("Password");
    this.loginButton = this.page.locator("//*[@id='login-button']");
    this.errorToastMessage = this.page.getByTestId("error");
  }

  async inputLoginData(username: string, password: string) {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.clickButton(this.loginButton);
  }

  async assertErrorMessageText(messageText: string) {
    await this.assertText(this.errorToastMessage, messageText);
  }
}
