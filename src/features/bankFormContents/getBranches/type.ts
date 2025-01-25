export type BankTerarenBranchResult = {
  code: string;
  name: string;
  kana: string;
  hira: string;
  normalize: {
    name: string;
    kana: string;
    roma: string;
    hira: string;
  };
  created_at: string;
  updated_at: string;
}[];
