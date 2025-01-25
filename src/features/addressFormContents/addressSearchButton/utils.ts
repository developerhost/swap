import { type ZipCloudResult } from "@/features/addressFormContents/addressSearchButton/types";
import { type RefObject } from "react";

/**
 * 各input,selectの参照を受け取り、郵便番号APIのレスポンスから住所を設定する
 * @param prefectureRef 都道府県のRef
 * @param cityRef 市区町村のRef
 * @param addressLine1Ref 町域・番地のRef
 * @param response 郵便番号APIのレスポンス
 */
export const setAddressValue = (
  prefectureRef: RefObject<HTMLSelectElement>,
  cityRef: RefObject<HTMLInputElement>,
  addressLine1Ref: RefObject<HTMLInputElement>,
  response: ZipCloudResult,
) => {
  const {
    address1: prefecture,
    address2: city,
    address3: addressLine1,
  } = response;

  const prefectureSelectElement = prefectureRef.current;
  const cityInputElement = cityRef.current;
  const addressLine1InputElement = addressLine1Ref.current;

  if (prefectureSelectElement && cityInputElement && addressLine1InputElement) {
    // この方法以外で書き換えできないの使用
    prefectureSelectElement.value = prefecture;
    cityInputElement.value = city;
    addressLine1InputElement.value = addressLine1;
  }
};
