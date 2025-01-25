import { type BrowserContext, type Page } from "@playwright/test";

const baseURL = "http://localhost:3000";

/**
 * 年齢確認のCookieをセットアップする
 * @param page ページ
 * @param context ブラウザコンテキスト
 */
export const setupAgeCheckCookie = async (
  page: Page,
  context: BrowserContext,
) => {
  await page.goto("/");
  await context.addCookies([
    { url: baseURL, name: "age_check", value: "true" },
  ]);
};

/**
 * ユーザーのログイン情報をSessionにセットアップする
 * @param page ページ
 * @param context ブラウザコンテキスト
 * @todo 未完成のため、後に実装する
 */
export const setupLoginUser = async (page: Page, context: BrowserContext) => {
  await page.goto("/");
  await context.storageState({ path: "e2e/storage-state.json" });
};
