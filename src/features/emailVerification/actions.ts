"use server";

import { sendEmailWithVerificationCode } from "@/features/emailVerification/utils";
import { failure, type Result } from "@/lib/result";
import { generateEmailVerificationCode, getSessionUser } from "@/utils";

const couldNotFindEmailAddress =
  "送信先のEmailアドレスが見つかりませんでした。正しいユーザーでログインしているかをご確認ください。";

/**
 * 認証コードの発行とemailの送信をする
 * @returns Result型
 */
export const createCodeAndSendEmail = async (): Promise<
  Result<string, string>
> => {
  const user = await getSessionUser();
  // ログインしていない場合
  if (!user) {
    return failure(couldNotFindEmailAddress);
  }
  const email = user?.email;
  // メールアドレスが登録されていない場合
  if (!email) {
    return failure(couldNotFindEmailAddress);
  }

  const emailVerificationCode = await generateEmailVerificationCode(user.id);
  return sendEmailWithVerificationCode(emailVerificationCode);
};
