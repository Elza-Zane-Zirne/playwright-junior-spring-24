import { test, expect } from "@playwright/test";

test.describe.skip("Successful auth tests", async () => {
  test("Sign in as standard user", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.locator("//*[@id='login-button']").click();
    await expect(page).toHaveURL("/inventory.html");
    await expect(page.getByTestId("title")).toHaveText("Products");
  });
});

test.describe.skip("Unsuccessful auth tests", async () => {
  test.beforeEach(async ({ page }) => {
    //Go to page https://www.saucedemo.com/
    await page.goto("/");
  });
  //Sign in with incorect user data
  test("Sign in with incorect user data", async ({ page }) => {
    // 2. Enter username standard_user
    await page.getByTestId("username").fill("standard_user");
    // 3. Enter password secret_sauce3524466
    await page.getByPlaceholder("Password").fill("secret_sauce3524466");
    // 4. Click on login button
    await page.locator("//*[@id='login-button']").click();
    // 5. Assert that user is still on the homepage
    await expect(page).toHaveURL("/");
    // 6. assert that the error message is shown
    await expect(page.getByTestId("error")).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  //Sign in with locked_out_user
  test("Sign in with locked_out_user", async ({ page }) => {
    // 2. Enter username locked_out_user
    await page.getByTestId("username").fill("locked_out_user");
    // 3. Enter password secret_sauce
    await page.getByPlaceholder("Password").fill("secret_sauce");
    // 4. Click on login button
    await page.locator("//*[@id='login-button']").click();
    // 5. Assert that user is still on the homepage
    await expect(page).toHaveURL("/");
    // 6. assert that the error message is shown
    await expect(page.getByTestId("error")).toHaveText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });
});
