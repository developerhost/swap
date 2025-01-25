import { ALLOWED_ACCOUNT_TYPES } from "@/constants/bank";
import { DEFAULT_INPUT_MAX_LENGTH } from "@/constants/maxLength";
import { z } from "zod";

// データベース登録時の銀行口座情報の初期値
// データベースに保存するときはフォームのfamilyNameとfirstNameを結合したデータをaccountNameに保存している
export const initialBankAccountValues = {
  bankName: "",
  bankCode: "",
  branchNumber: "",
  branchName: "",
  accountType: "",
  accountNumber: "",
  accountName: "",
};

// 銀行口座情報の初期値
export const initialBankInfoValues = {
  bankName: "",
  branchNumber: "",
  bankCode: "",
  branchName: "",
  accountType: "",
  accountNumber: "",
  familyName: "",
  firstName: "",
};

// 銀行情報のバリデーションの内容
export const bankInfoValidationRules = {
  bankName: z
    .string()
    .min(1, { message: "銀行名を入力してください" })
    .max(DEFAULT_INPUT_MAX_LENGTH, {
      message: `銀行名は${DEFAULT_INPUT_MAX_LENGTH}文字以内で入力してください`,
    }),
  branchNumber: z
    .string()
    .min(1, { message: "支店コードを入力してください" })
    .length(3, { message: "支店コードは3桁で入力してください" }),
  bankCode: z
    .string()
    .min(1, { message: "金融機関コードを入力してください" })
    .length(4, { message: "金融機関コードは4桁で入力してください" }),
  accountType: z
    .string()
    .refine((value) => ALLOWED_ACCOUNT_TYPES.includes(value), {
      message: "適切な口座種別を選択してください",
    }),
  branchName: z
    .string()
    .min(1, { message: "支店名を入力してください" })
    .max(DEFAULT_INPUT_MAX_LENGTH, {
      message: `支店名は${DEFAULT_INPUT_MAX_LENGTH}文字以内で入力してください`,
    }),
  accountNumber: z
    .string()
    .min(1, { message: "口座番号を入力してください" })
    .max(7, { message: "口座番号は7桁以内で入力してください" }),
  familyName: z
    .string()
    .min(1, { message: "口座名義（セイ）を入力してください" })
    .max(DEFAULT_INPUT_MAX_LENGTH, {
      message: `口座名義（セイ）は${DEFAULT_INPUT_MAX_LENGTH}文字以内で入力してください`,
    }),
  firstName: z
    .string()
    .min(1, { message: "口座名義（メイ）を入力してください" })
    .max(DEFAULT_INPUT_MAX_LENGTH, {
      message: `口座名義（メイ）は${DEFAULT_INPUT_MAX_LENGTH}文字以内で入力してください`,
    }),
};
