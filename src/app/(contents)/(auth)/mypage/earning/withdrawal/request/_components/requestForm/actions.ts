/* eslint-disable max-statements */
"use server";

import { updateUserBalance } from "@/app/(contents)/(auth)/mypage/earning/services";
import { createWithdrawalMailContent } from "@/app/(contents)/(auth)/mypage/earning/withdrawal/request/_components/requestForm/mailTemplate";
import {
  RequestFormSchema,
  type RequestFormState,
} from "@/app/(contents)/(auth)/mypage/earning/withdrawal/request/_components/requestForm/type";
import { MESSAGE } from "@/constants/messages";
import { MYPAGE_CONTENT, MYPAGE_LINK } from "@/constants/myPage";
import { SITE_NAME } from "@/constants/site";
import { sendMailToUser } from "@/lib/mail";
import { findUserById } from "@/repositories/user";
import { createTransferRequest } from "@/repositories/user/transferRequest";

import { getFormValues } from "@/ui/form";
import { verifyForm } from "@/ui/form/securityVerifier/verifyForm";
import { formatPrice, getSessionUser } from "@/utils";

/**
 * フォームに入力された金融機関情報と出金額を登録する
 * 不備がある場合はエラーメッセージを含んだ状態を返す
 * @param prevState フォームの直前の状態
 * @param formData FormData
 */
export const requestFormAction = async (
  prevState: RequestFormState,
  formData: FormData,
): Promise<RequestFormState> => {
  const values = getFormValues(formData, prevState.values);
  const sessionUser = await getSessionUser();
  const userId = sessionUser?.id;
  const { verificationCode, withdrawalAmount } = values;

  if (!userId) {
    return {
      ...prevState,
      result: {
        message: MESSAGE.ERROR.SESSION_TIMEOUT,
        type: "error",
      },
    };
  }

  const result = await verifyForm(verificationCode);
  if (result.isFailure) {
    return {
      ...prevState,
      result: {
        message: result.error,
        type: "error",
      },
    };
  }

  const validated = RequestFormSchema.safeParse(values);
  if (!validated.success) {
    const message = validated.error.errors[0]?.message;
    return {
      ...prevState,
      result: message ? { message, type: "error" } : undefined,
    };
  }

  const user = await findUserById(userId);
  if (!user) {
    return {
      ...prevState,
      result: {
        message: MESSAGE.ERROR.USER_NOT_FOUND,
        type: "error",
      },
    };
  }

  const currentBalance = user.balance;
  if (currentBalance < Number(withdrawalAmount)) {
    return {
      ...prevState,
      result: {
        message: MESSAGE.ERROR.OVER_BALANCE,
        type: "error",
      },
    };
  }

  const newBalance = currentBalance - Number(withdrawalAmount);
  const balance = await updateUserBalance(userId, newBalance);
  const request = await createTransferRequest(userId, Number(withdrawalAmount));
  if (!balance || !request) {
    return {
      ...prevState,
      result: {
        message: MESSAGE.ERROR.REGISTRATION_FAILED,
        type: "error",
      },
    };
  }

  const { name: userName, email: userEmail } = user;
  const subject = `【${SITE_NAME}】出金申請完了のお知らせ`;
  const text = createWithdrawalMailContent(
    userName ?? "",
    request.id,
    formatPrice(Number(withdrawalAmount)),
  );
  await sendMailToUser(userEmail, subject, text);

  return {
    ...prevState,
    result: {
      message: MESSAGE.SUCCESS.REQUEST_WITHDRAWAL,
      type: "success",
    },
    redirect: MYPAGE_LINK[MYPAGE_CONTENT.EARNING],
  };
};
