import { type BankTerarenBranchResult } from "@/features/bankFormContents/getBranches/type";
import { fetchResult } from "@/utils/fetcher";

/**
 * 支店名を検索する
 * @param bankCode 銀行コード
 * @param name 支店名
 */
export const getBranches = async (bankCode: string, name: string) => {
  // クエリパラメータにhiraを指定しないと取得できないデータがあったため、
  // hiraとnameで検索して結果を結合する
  const [responseResultHira, responseResultName] = await Promise.all([
    fetchResult<BankTerarenBranchResult>(
      `https://bank.teraren.com/banks/${bankCode}/branches/search.json?hira=${name}`,
    ),
    fetchResult<BankTerarenBranchResult>(
      `https://bank.teraren.com/banks/${bankCode}/branches/search.json?name=${name}`,
    ),
  ]);

  if (responseResultHira.isSuccess && responseResultName.isSuccess)
    return [...responseResultHira.value, ...responseResultName.value];
};
