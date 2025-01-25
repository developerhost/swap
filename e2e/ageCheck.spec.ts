import { expect, test } from "@playwright/test";
import { setupAgeCheckCookie } from "e2e/playwright.setup";

test.describe("年齢確認", () => {
  test("年齢確認が表示されること", async ({ page }) => {
    await page.goto("/");
    const ageCheckTitle = page.getByText("年齢確認");
    await expect(ageCheckTitle).toBeVisible();
  });

  test("Cookieがセットされている場合は年齢確認が表示されないこと", async ({
    page,
    context,
  }) => {
    await setupAgeCheckCookie(page, context);
    await page.goto("/");
    const elements = await page
      .getByRole("heading", { name: "あなたは18歳以上ですか？" })
      .count();
    expect(elements).toBe(0);
  });

  test("年齢確認後にページにアクセスできること", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "はい" }).click();
    expect(page.url()).toBe("http://localhost:3000/");
  });

  test("年齢確認でいいえを選択するとリダイレクトされること", async ({
    page,
  }) => {
    await page.goto("/");
    await page.goto("http://localhost:3000/");
    await page.getByRole("button", { name: "いいえ" }).click();
    await page.waitForURL("http://localhost:3000/no-available-service");
    expect(page.url()).toBe("http://localhost:3000/no-available-service");
  });
});
