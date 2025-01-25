"use server";

import { reportComment } from "@/app/(contents)/item/[itemId]/_components/commentContainer/commentList/services";
import { MESSAGE } from "@/constants/messages";
import { failure, success, type Result } from "@/lib/result";
import { deleteItemComment } from "@/repositories/item/itemComment";
import { fetchVerifyResult } from "@/ui/form/securityVerifier/fetcher";
import { getSessionUser } from "@/utils";

/**
 * コメントを削除
 * @param commentId コメントID
 */
export const removeItemComment = async (
  commentId: string,
): Promise<
  Result<
    {
      itemId: string;
    },
    string
  >
> => {
  const user = await getSessionUser();
  if (!user) return failure(MESSAGE.ERROR.SESSION_TIMEOUT);
  const comment = await deleteItemComment(commentId, user.id);
  if (!comment) return failure("削除可能なコメントが見つかりませんでした");
  return success(comment);
};

/**
 * コメントの通報
 * @param commentId コメントID
 * @param reason 通報理由
 * @param verificationCode reCAPTCHA v3で取得した値
 * @returns
 */
export const addItemCommentReport = async (
  commentId: string,
  reason: string,
  verificationCode: string,
): Promise<Result<undefined, string>> => {
  if (!verificationCode) {
    return failure(MESSAGE.ERROR.VERIFICATION_FAILED);
  }
  const verifyResult = await fetchVerifyResult(verificationCode);
  if (!verifyResult) {
    return failure(MESSAGE.ERROR.AUTHENTICATION_FAILED);
  }
  const user = await getSessionUser();
  if (!user) {
    return failure(MESSAGE.ERROR.SESSION_TIMEOUT);
  }
  return await reportComment(commentId, user.id, reason);
};
