import { findItemById } from "@/repositories/item";
import { createTransaction } from "@/repositories/transaction";
import { findUserById } from "@/repositories/user";

/**
 * 決済処理
 * 商品IDまたは購入者IDがデータベースに存在しない場合は、エラーレスポンスを返します。
 * @param {Request} request - HTTPリクエストオブジェクト。
 */
export const GET = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);
  const params = url.searchParams;

  const result = params.get("Result");
  const itemId = params.get("itemId") ?? "";
  const buyerId = params.get("BuyerId") ?? "";
  const userCouponId = null;

  if (result !== "OK") {
    return new Response(JSON.stringify({ error: "Invalid result" }), {
      status: 400,
    });
  }

  // データベースにitemIdが存在するか確認
  const item = await findItemById(itemId);
  if (!item) {
    return new Response(JSON.stringify({ error: "Item not found" }), {
      status: 404,
    });
  }

  // データベースにbuyerIdが存在するか確認
  const buyer = await findUserById(buyerId);
  if (!buyer) {
    return new Response(JSON.stringify({ error: "Buyer not found" }), {
      status: 404,
    });
  }

  const res = await createTransaction(itemId, buyerId, userCouponId);

  return new Response(JSON.stringify(res));
};
