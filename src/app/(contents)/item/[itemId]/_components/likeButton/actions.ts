"use server";

import { MESSAGE } from "@/constants/messages";
import { failure, success, type Result } from "@/lib/result";
import { createLike, deleteLike } from "@/repositories/item/like";
import { getSessionUser } from "@/utils";
import { revalidatePath } from "next/cache";

export type LikeResult = Result<undefined, string>;

/**
 * いいねをする
 * @param itemId 商品ID
 */
export const like = async (itemId: string): Promise<LikeResult> => {
  const user = await getSessionUser();
  if (!user) return failure(MESSAGE.ERROR.SESSION_TIMEOUT);
  try {
    const like = await createLike(itemId, user.id);
    if (!like) return failure(MESSAGE.ERROR.LIKE_FAILED);
    revalidatePath(`/item/${itemId}`);
    return success();
  } catch {
    return failure(MESSAGE.ERROR.LIKE_FAILED);
  }
};

/**
 * いいねを解除する
 * @param itemId 商品ID
 */
export const unlike = async (itemId: string): Promise<LikeResult> => {
  const user = await getSessionUser();
  if (!user) return failure(MESSAGE.ERROR.SESSION_TIMEOUT);
  try {
    const like = await deleteLike(itemId, user.id);
    if (!like) return failure(MESSAGE.ERROR.UNLIKE_FAILED);
    revalidatePath(`/item/${itemId}`);
    return success();
  } catch {
    return failure(MESSAGE.ERROR.UNLIKE_FAILED);
  }
};
