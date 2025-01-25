import { redirect } from "next/navigation";

/**
 * 決済処理後のコールバック関数です。
 * @param request リクエストオブジェクト
 */
export const POST = (request: Request) => {
  if (request.method !== "POST") {
    return new Response("POSTメソッドが必要です。", { status: 405 });
  }
  const url =
    process.env.NODE_ENV === "production"
      ? "https://payment.swappy.jp"
      : "http://localhost:3000";
  return redirect(`${url}/mypage/items/buy-in-progress`);
};
