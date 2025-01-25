"use client";

import { type BankTerarenBankResult } from "@/features/bankFormContents/getBanks/type";
import { fetchResult } from "@/utils/fetcher";

/**
 * 金融機関名を取得するAPIからデータを取得する
 * @param name 金融機関名
 */
export const getBanks = async (name: string) => {
  const responseResult = await fetchResult<BankTerarenBankResult>(
    `https://bank.teraren.com/banks/search.json?name=${name}`,
  );

  if (responseResult.isSuccess) return responseResult.value;
};
