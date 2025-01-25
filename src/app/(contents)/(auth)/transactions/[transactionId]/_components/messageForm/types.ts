import { type FormState } from "@/ui/form";
import { isNgWord } from "@/utils/validator/ngWord";
import { z, type ZodType } from "zod";

export type TransactionMessageFormValues = {
  /** メッセージ */
  message: string;
  /** 取引ID */
  transactionId: string;
};

export type TransactionMessageFormState =
  FormState<TransactionMessageFormValues>;

export const initialTransactionMessageState = {
  values: {
    message: "",
    transactionId: "",
    verificationCode: "",
  },
} as const satisfies TransactionMessageFormState;

export const TransactionMessageSchema: ZodType<TransactionMessageFormValues> =
  z.object({
    message: z
      .string()
      .min(1, { message: "メッセージを入力してください" })
      .max(300, { message: "メッセージは300文字以内で入力してください" })
      .refine(isNgWord, {
        message: "商品名にNGワードが含まれています",
      }),
    transactionId: z.string(),
    verificationCode: z.string(),
  });
