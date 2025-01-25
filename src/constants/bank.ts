// 銀行情報に関する定数
// フォームで取り扱う値は、数字であっても文字列型で扱うため、keyも文字列型で定義している

export const ACCOUNT_TYPE: Record<string, string> = {
  "1": "普通",
  "2": "当座",
  "3": "貯蓄",
  "9": "その他",
} as const;

export const ALLOWED_ACCOUNT_TYPES: string[] = ["1", "2", "3", "9"];
