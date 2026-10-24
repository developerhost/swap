"use server";

import { type CookieKey } from "@/utils/cookies/const";
import { type ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

/**
 * Cookieを安全にセットするためのサーバー側ラッパー関数
 * @param args Cookieのキーかオプション
 */
export const setCookie = async (
  ...args:
    | [
        key: CookieKey,
        value: string,
        cookie?: Partial<ResponseCookie> | undefined,
      ]
    | [options: ResponseCookie]
) => {
  (await cookies()).set(...args);
};

/**
 * Cookieを安全に取得するためのサーバー側ラッパー関数
 * @param key 定数に登録済みのCookieキー
 */
export const getCookie = async (key: CookieKey) => (await cookies()).get(key);

/**
 * Cookieを安全に削除するためのサーバー側ラッパー関数
 * @param  args Cookieのキーかオプション
 */
export const deleteCookie = async (
  ...args:
    | [key: CookieKey]
    | [options: Omit<ResponseCookie, "value" | "expires">]
) => {
  (await cookies()).delete(...args);
};
