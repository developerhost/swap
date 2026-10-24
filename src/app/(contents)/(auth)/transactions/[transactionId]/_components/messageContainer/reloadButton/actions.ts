"use server";

import { revalidatePath } from "next/cache";

/**
 * 取引ページを再読み込みする
 * @param transactionId 取引ID
 */
export const reload = async (transactionId: string) => {
  revalidatePath(`/transactions/${transactionId}`);
};
