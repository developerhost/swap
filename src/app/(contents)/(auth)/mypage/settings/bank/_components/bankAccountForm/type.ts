import {
  bankInfoValidationRules,
  initialBankInfoValues,
} from "@/features/bankFormContents/type";
import { type FormState } from "@/ui/form";
import { z } from "zod";

export type BankAccountFormValues = z.infer<typeof BankAccountFormSchema>;

/** 銀行口座登録フォームの状態とバリデーション、メッセージを表す型 */
export type BankAccountFormState = FormState<BankAccountFormValues>;

/** 銀行口座登録フォームの初期値 */
export const initialBankAccountFormValues = {
  values: {
    ...initialBankInfoValues,
    verificationCode: "",
  },
} as const satisfies BankAccountFormState;

/**
 * 銀行口座登録フォームのバリデーション
 */
export const BankAccountFormSchema = z.object({
  ...bankInfoValidationRules,
});
