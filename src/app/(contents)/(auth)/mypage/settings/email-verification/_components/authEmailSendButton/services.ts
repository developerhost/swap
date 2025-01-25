"use server";

import { MESSAGE } from "@/constants/messages";
import { failure, success, type Result } from "@/lib/result";
import { findEmailVerificationCode } from "@/repositories/user/emailVerificationCode";
import { getSessionUser } from "@/utils";
import { redirect } from "next/navigation";

/**
 * 取得した認証コードとDB内の認証コードが一致しているかを確認する
 * @param code URLから取得した認証コード
 * @returns Result型
 */
export const verifyEmail = async (
  code: string | undefined,
): Promise<Result<string, string>> => {
  const sessionUser = await getSessionUser();

  // ログインしていない場合
  if (!sessionUser) {
    redirect(
      `/signin?redirect=/mypage/settings/email-verification?code=${code}`,
    );
  }

  if (!code) {
    return failure(MESSAGE.ERROR.VERIFICATION_FAILED);
  }

  const emailVerificationCode = await findEmailVerificationCode(code);

  // 認証コードが見つからなかった場合
  if (!emailVerificationCode) {
    return failure(MESSAGE.ERROR.VERIFICATION_CODE_INVALID);
  }

  const { userId, expiredAt } = emailVerificationCode;

  // 認証コードが見つかったが、ユーザーIDが一致しない場合
  if (sessionUser.id !== userId) {
    return failure(MESSAGE.ERROR.VERIFICATION_CODE_INVALID);
  }

  // 認証コードが期限切れの場合
  if (new Date() > expiredAt) {
    return failure(MESSAGE.ERROR.VERIFICATION_CODE_EXPIRED);
  }

  // 認証成功
  return success(MESSAGE.SUCCESS.MAIL_VERIFIED);
};
