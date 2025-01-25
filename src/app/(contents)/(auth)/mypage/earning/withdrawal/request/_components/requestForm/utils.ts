import {
  initialRequestFormValues,
  type RequestFormValues,
} from "@/app/(contents)/(auth)/mypage/earning/withdrawal/request/_components/requestForm/type";

/**
 * フォームに設定する銀行情報の初期値を取得する
 * @param bankInfo 銀行情報
 */
export const getInitialValues = (
  bankInfo: Omit<RequestFormValues, "id" | "userId"> | null,
) => ({
  values: {
    ...initialRequestFormValues.values,
    ...bankInfo,
    verificationCode: "",
  },
});
