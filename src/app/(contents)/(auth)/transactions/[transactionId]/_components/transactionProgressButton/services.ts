"use server";

import { updateTransaction } from "@/repositories/transaction";
import { revalidatePath } from "next/cache";

/**
 * 取引ステータス変更ボタン押下時のサーバー側処理
 * @param id トランザクションID
 * @param statusCode 取引ステータス
 */
export const updateTransactionStatus = async (
  id: string,
  statusCode: number,
) => {
  await updateTransaction({ id, statusCode });
  revalidatePath(`/transactions/${id}`);
};
