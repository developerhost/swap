import { findUserById } from "@/repositories/user";
import {
  findTransferRequestsByRequestId,
  updateTransferRequest,
} from "@/repositories/user/transferRequest";
import { env } from "@/utils/serverEnv";

type RequestBody = {
  withdrawalStatusSecretKey: string;
};

/**
 * 出金申請の振込済みステータスを更新する
 * @param request - HTTPリクエストオブジェクト
 */
export const POST = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);
  const params = url.searchParams;

  const requestId = params.get("requestId") ?? "";

  if (request.method !== "POST") {
    return new Response("POSTメソッドが必要です。", { status: 405 });
  }

  const withdrawalStatusSecret = env.WITHDRAWAL_STATUS_SECRET;
  const body = await (request.json() as Promise<RequestBody>);
  const withdrawalStatusSecretKey = body.withdrawalStatusSecretKey;

  // リクエストから送られてきたキーと比較して、一致しない場合はエラーレスポンスを返す
  if (withdrawalStatusSecretKey !== withdrawalStatusSecret) {
    return new Response(JSON.stringify({ error: "Invalid secret key" }), {
      status: 403,
    });
  }

  const history = await findTransferRequestsByRequestId(requestId);
  // データベースに振込申請履歴が存在するか確認
  if (!history) {
    return new Response(JSON.stringify({ error: "History not found" }), {
      status: 404,
    });
  }
  // すでに振込済みの場合はエラーレスポンスを返す
  if (history.isTransferred) {
    return new Response(JSON.stringify({ error: "Already transferred" }), {
      status: 400,
    });
  }

  const requestUser = await findUserById(history.userId);
  // データベースにuserIdが存在するか確認
  if (!requestUser) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  const res = updateTransferRequest(requestId, true);

  return new Response(JSON.stringify(res));
};
