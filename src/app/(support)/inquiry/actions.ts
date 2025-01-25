"use server";

import { subject, text } from "@/app/(support)/inquiry/mailConfig";
import {
  InquiryFormSchema,
  initialInquiryFormValues,
  type InquiryFormState,
} from "@/app/(support)/inquiry/types";
import { MESSAGE } from "@/constants/messages";
import { sendMailToAdmin, sendMailToUser } from "@/lib/mail";
import { verifyForm } from "@/ui/form/securityVerifier/verifyForm";
import { getFormValues } from "@/ui/form/utils";
import { ipCheck } from "@/utils/ipCheck";
import { headers } from "next/headers";

/**
 * フォームに入力されたお問い合わせ内容を送信する
 * 不備がある場合はエラーメッセージを含んだ状態を返す
 * 送信に成功した場合はフォームを空にし、メッセージを表示する
 * 送信に失敗した場合はエラーメッセージを表示する
 * @param prevState 前の状態
 * @param formData FormData
 */
export const sendInquiry = async (
  prevState: InquiryFormState,
  formData: FormData,
): Promise<InquiryFormState> => {
  const values = getFormValues(formData, prevState.values);
  const verifyResult = await verifyForm(values.verificationCode);

  if (verifyResult.isFailure) {
    return {
      ...prevState,
      result: {
        message: verifyResult.error,
        type: "error",
      },
    };
  }

  const validated = InquiryFormSchema.safeParse(values);
  if (!validated.success) {
    const message = validated.error.errors[0]?.message;
    return {
      ...prevState,
      result: message ? { message, type: "error" } : undefined,
    };
  }

  const header = headers();
  const ip = header.get("x-real-ip") || header.get("x-forwarded-for") || "";
  if (ip) {
    // 日本IPであるかどうかのチェックを行う
    const isJPIP = await ipCheck(ip);
    if (!isJPIP) {
      return {
        ...prevState,
        result: {
          message: MESSAGE.ERROR.INQUIRY_FROM_FOREIGN_COUNTRY,
          type: "error",
        },
      };
    }
  }

  const { name, email, category, body } = values;
  const inquiryBody = `${category} お問い合わせフォームからの連絡
  
  ${body}`;

  const sendMailResult = await sendMailToAdmin(name, email, inquiryBody);
  if (!sendMailResult) {
    return {
      ...prevState,
      result: {
        message: MESSAGE.ERROR.SEND_MAIL_FAILED,
        type: "error",
      },
    };
  }

  await sendMailToUser(email, subject, text);
  return {
    ...initialInquiryFormValues,
    result: {
      message: MESSAGE.SUCCESS.INQUIRY_RECEIVED,
      type: "success",
    },
  };
};
