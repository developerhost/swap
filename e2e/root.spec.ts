import { expect, test } from "@playwright/test";
import { setupAgeCheckCookie } from "e2e/playwright.setup";

test.beforeEach(async ({ page, context }) => {
  await setupAgeCheckCookie(page, context);
});

test.describe("トップページ", () => {
  test("トップページにアクセスできること", async ({ page }) => {
    await page.goto("/");
    expect(page.url()).toBe("http://localhost:3000/");
  });
});
