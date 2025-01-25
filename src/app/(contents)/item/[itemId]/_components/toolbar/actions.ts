"use server";

import { MESSAGE } from "@/constants/messages";
import { failure, success } from "@/lib/result";
import { deleteItem, findItemById } from "@/repositories/item";
import { createItemReport } from "@/repositories/item/itemReport";
import { fetchVerifyResult } from "@/ui/form/securityVerifier/fetcher";
import { getSessionUser } from "@/utils";
import { revalidatePath } from "next/cache";

/**
 * 商品の削除
 * @param itemId 商品ID
 * @returns
 */
export const removeItem = async (itemId: string) => {
  const item = await findItemById(itemId);
  const user = await getSessionUser();
  if (item.sellerId !== user?.id) {
    return failure(MESSAGE.ERROR.NOT_ITEM_OWNER);
  }
  await deleteItem(itemId);
  revalidatePath(`/item/${itemId}`);
  return success();
};

/**
 * 商品の通報
 * @param itemId 商品ID
 * @param reason 通報理由
 * @param verificationCode reCAPTCHA認証コード
 * @returns
 */
export const addItemReport = async (
  itemId: string,
  reason: string,
  verificationCode: string,
) => {
  if (!verificationCode) {
    return {
      message: MESSAGE.ERROR.VERIFICATION_FAILED,
      error: true,
    };
  }
  const verifyResult = await fetchVerifyResult(verificationCode);
  if (!verifyResult) {
    return {
      message: MESSAGE.ERROR.VERIFICATION_FAILED,
      error: true,
    };
  }
  const user = await getSessionUser();
  if (!user) {
    return {
      message: MESSAGE.ERROR.SESSION_TIMEOUT,
      error: true,
    };
  }
  const userId = user.id;
  return await createItemReport(itemId, userId, reason);
};
