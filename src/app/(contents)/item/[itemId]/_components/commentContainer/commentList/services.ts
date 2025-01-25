"use server";

import { MESSAGE } from "@/constants/messages";
import { failure, success } from "@/lib/result";
import {
  createItemCommentReport,
  findItemCommentReport,
} from "@/repositories/item/itemCommentReport";

/**
 * コメントの通報処理を行う
 * @param commentId コメントID
 * @param userId ユーザーID
 * @param reason 通報理由
 */
export const reportComment = async (
  commentId: string,
  userId: string,
  reason: string,
) => {
  const existingReport = await findItemCommentReport(commentId, userId);
  if (existingReport) {
    return failure(MESSAGE.ERROR.COMMENT_ALREADY_REPORTED);
  }
  await createItemCommentReport(commentId, userId, reason);
  return success();
};
