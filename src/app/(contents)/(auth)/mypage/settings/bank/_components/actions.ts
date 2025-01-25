"use server";

import {
  BankAccountFormSchema,
  type BankAccountFormState,
} from "@/app/(contents)/(auth)/mypage/settings/bank/_components/bankAccountForm/type";
import { failure, success } from "@/lib/result";
import { findUserById } from "@/repositories/user";
import {
  createBankAccount,
  deleteBankAccount,
} from "@/repositories/user/bankAcoount";
import { getFormValues } from "@/ui/form";
import { verifyForm } from "@/ui/form/securityVerifier/verifyForm";
import { getSessionUser } from "@/utils";
import { revalidatePath } from "next/cache";

/**
 * フォームに入力された銀行情報を登録する
 * 不備がある場合はエラーメッセージを含んだ状態を返す
 * @param prevState フォームの直前の状態
 * @param formData FormData
 */
export const bankAccountFormAction = async (
  prevState: BankAccountFormState,
  formData: FormData,
): Promise<BankAccountFormState> => {
  const values = getFormValues(formData, prevState.values);
  const sessionUser = await getSessionUser();
  const userId = sessionUser?.id;
  const {
    verificationCode,
    bankName,
    branchName,
    bankCode,
    branchNumber,
    accountType,
    accountNumber,
    familyName,
    firstName,
  } = values;

  /**
   * createBankAccountの引数に渡すための銀行情報
   * フォームで取り扱う値が文字列型のためaccountTypeを数値型に変換している
   */
  const bankInfo = {
    bankName,
    branchName,
    bankCode,
    branchNumber,
    accountType: Number(accountType),
    accountNumber,
    accountName: `${familyName} ${firstName}`,
  };

  if (!userId) {
    return {
      ...prevState,
      result: {
        message: "セッションが切れました。再度ログインしてください。",
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

  const validated = BankAccountFormSchema.safeParse(values);
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
        message:
          "ユーザー情報が取得できませんでした。時間をおいて再度お試しください。",
        type: "error",
      },
    };
  }

  const bankAccount = await createBankAccount(userId, bankInfo);
  if (!bankAccount) {
    return {
      ...prevState,
      result: {
        message: "銀行口座の登録に失敗しました",
        type: "error",
      },
    };
  }

  revalidatePath("/mypage/settings/bank");

  return {
    ...prevState,
    result: {
      message: "銀行口座を登録しました",
      type: "success",
    },
  };
};

/**
 * 銀行口座情報を削除する
 * @param bankId 削除する銀行口座ID
 */
export const bankAccountDeleteAction = async (bankId: string) => {
  const bankAccount = await deleteBankAccount(bankId);
  if (!bankAccount) return failure("銀行口座の削除に失敗しました");
  revalidatePath("/mypage/settings/bank");
  return success(bankAccount);
};
