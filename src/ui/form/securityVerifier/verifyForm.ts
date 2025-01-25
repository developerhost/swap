import { MESSAGE } from "@/constants/messages";
import { failure, success } from "@/lib/result";
import { fetchVerifyResult } from "@/ui/form/securityVerifier/fetcher";

/**
 * 認証コードを検証する
 * @param verificationCode 認証コード
 * @returns result型の認証結果 成功時はsuccess() 失敗時はfailure(エラーメッセージ)
 */
export const verifyForm = async (verificationCode: string) => {
  if (!verificationCode) {
    return failure(MESSAGE.ERROR.VERIFICATION_FAILED);
  }
  const isVerify = await fetchVerifyResult(verificationCode);
  if (!isVerify) {
    return failure(MESSAGE.ERROR.VERIFICATION_FAILED);
  }
  return success();
};
