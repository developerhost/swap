export type BankTerarenBankResult = {
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
  url: string;
  branches_url: string;
  created_at: string;
  updated_at: string;
}[];
