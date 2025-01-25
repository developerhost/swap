import {
  initialBankAccountFormValues,
  type BankAccountFormValues,
} from "@/app/(contents)/(auth)/mypage/settings/bank/_components/bankAccountForm/type";

/**
 * フォームに設定する銀行口座情報の初期値を取得する
 * @param bankAccount 銀行口座情報
 */
export const getInitialValues = (
  bankAccount: BankAccountFormValues | null,
) => ({
  values: {
    ...initialBankAccountFormValues.values,
    ...bankAccount,
    verificationCode: "",
  },
});
