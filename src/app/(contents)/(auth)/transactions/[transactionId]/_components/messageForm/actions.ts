"use server";

import {
  TransactionMessageSchema,
  type TransactionMessageFormState,
} from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/messageForm/types";
import { sendMailToRecipient } from "@/app/(contents)/(auth)/transactions/[transactionId]/_components/messageForm/utils";
import { MESSAGE } from "@/constants/messages";
import { createTransactionComment } from "@/repositories/transaction/transactionComment";
import { getFormValues } from "@/ui/form";
import { verifyForm } from "@/ui/form/securityVerifier/verifyForm";
import { getSessionUser } from "@/utils";
import { revalidatePath } from "next/cache";

/**
 * メッセージフォームsubmit時の処理
 * @param prevState 前の状態
 * @param formData FormData
 */
export const messageFormAction = async (
  prevState: TransactionMessageFormState,
  formData: FormData,
): Promise<TransactionMessageFormState> => {
  const values = getFormValues(formData, prevState.values);
  const sessionUser = await getSessionUser();
  const userId = sessionUser?.id;
  const { message, transactionId, verificationCode } = values;
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

  const validated = TransactionMessageSchema.safeParse(values);
  if (!validated.success) {
    const message = validated.error.errors[0]?.message;
    return {
      ...prevState,
      result: message ? { message, type: "error" } : undefined,
    };
  }

  try {
    const transactionComment = await createTransactionComment(
      message,
      userId,
      transactionId,
    );
    await sendMailToRecipient(transactionComment);
    revalidatePath(`/transactions/${transactionId}`);
    return {
      ...prevState,
      result: {
        message: "メッセージを送信しました",
        type: "success",
      },
    };
  } catch (error) {
    return {
      ...prevState,
      result: {
        message: "メッセージの送信に失敗しました",
        type: "error",
      },
    };
  }
};
