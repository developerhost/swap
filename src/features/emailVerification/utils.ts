"use server";

import { createVerificationEmailContent } from "@/app/(contents)/(auth)/mypage/settings/email-verification/_components/authEmailSendButton/mailTemplates";
import { MESSAGE } from "@/constants/messages";
import { sendMailToUser } from "@/lib/mail";
import { failure, success, type Result } from "@/lib/result";
import { upsertEmailVerificationCode } from "@/repositories/user/emailVerificationCode";
import { getSessionUser } from "@/utils/session";
import { type EmailVerificationCode } from "@prisma/client";
import { randomUUID } from "crypto";

/**
 * 認証コードを生成しユーザーに紐付ける
 * @param userId 対象ユーザーのID
 */
export const generateEmailVerificationCode = async (userId: string) => {
  const verificationCode = randomUUID();
  const expirationMinute = 30; // 有効期限30分
  const expiredAt = new Date(Date.now() + expirationMinute * 60000);
  const emailVerificationCode = await upsertEmailVerificationCode(
    userId,
    verificationCode,
    expiredAt,
  );
  return emailVerificationCode;
};

/**
 * 認証コード付きのURLをEmailで送信する
 * @param emailVerificationCode 認証コードオブジェクト
 */
export const sendEmailWithVerificationCode = async (
  emailVerificationCode: EmailVerificationCode,
): Promise<Result<string, string>> => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return failure(MESSAGE.ERROR.SESSION_TIMEOUT);
  }
  const { userId, code } = emailVerificationCode;

  if (sessionUser.id !== userId) {
    return failure(MESSAGE.ERROR.USER_NOT_MATCH);
  }

  if (!sessionUser.email) {
    return failure(MESSAGE.ERROR.EMAIL_NOT_REGISTERED);
  }

  const emailContent = createVerificationEmailContent(code);

  const sendResult = await sendMailToUser(
    sessionUser.email,
    "メールアドレスの認証を行ってください",
    emailContent,
  );
  return sendResult
    ? success(MESSAGE.SUCCESS.CONFIRMATION_CODE_SENT)
    : failure(MESSAGE.ERROR.SEND_MAIL_FAILED);
};
