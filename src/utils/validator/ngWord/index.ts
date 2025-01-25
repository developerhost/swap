import { NGWord } from "@/utils/validator/ngWord/constants";

/**
 * 定数に定義したNGワードが含まれているかどうか
 * @param  value 値
 */
export const isNgWord = (value: string) =>
  !NGWord.some((ngWord) => value.toLowerCase().includes(ngWord.toLowerCase()));
