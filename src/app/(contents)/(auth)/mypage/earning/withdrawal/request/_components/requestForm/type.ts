import { type BankAccountFormValues } from "@/app/(contents)/(auth)/mypage/settings/bank/_components/bankAccountForm/type";
import {
  bankInfoValidationRules,
  initialBankInfoValues,
} from "@/features/bankFormContents/type";
import { type FormState } from "@/ui/form";
import { z, type ZodType } from "zod";

export type RequestFormValues = BankAccountFormValues & {
  /** 出金額 */
  withdrawalAmount: string;
};

/** 出金申請フォームの状態とバリデーション、メッセージを表す型 */
export type RequestFormState = FormState<RequestFormValues>;

/** 出金申請フォームの初期値 */
export const initialRequestFormValues = {
  values: {
    ...initialBankInfoValues,
    withdrawalAmount: "",
    verificationCode: "",
  },
} as const satisfies RequestFormState;

/** 出金申請フォームのバリデーション */
export const RequestFormSchema: ZodType<RequestFormValues> = z.object({
  ...bankInfoValidationRules,
  withdrawalAmount: z
    .string()
    .regex(/^[1-9][0-9]*$/, { message: "出金額を入力してください" })
    .transform((inputAmount, ctx) => {
      const parsedAmount = Number(inputAmount);
      if (parsedAmount < 1000) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "最低出金額は¥1,000からです",
        });
        return z.NEVER;
      }
      return inputAmount;
    }),
  verificationCode: z
    .string({ required_error: "認証を行ってください" })
    .min(1, { message: "認証を行ってください" }),
});
