import { type RefObject } from "react";

/**
 * 選択された銀行名と銀行コードをInputにセットする
 * @param bankNameRef bankNameRef
 * @param bankCodeRef bankCodeRef
 * @param bankName 銀行名
 * @param bankCode 銀行コード
 */
export const setBankInputs = (
  bankNameRef: RefObject<HTMLInputElement>,
  bankCodeRef: RefObject<HTMLInputElement>,
  bankName: string,
  bankCode: string,
) => {
  if (bankNameRef.current && bankCodeRef.current) {
    bankNameRef.current.value = bankName;
    bankCodeRef.current.value = bankCode;
  }
};

/**
 * 選択された支店名と支店番号をInputにセットする
 * @param branchNameRef branchNameRef
 * @param branchNumberRef branchNumberRef
 * @param branchName 支店名
 * @param branchNumber 支店番号
 */
export const setBranchInputs = (
  branchNameRef: RefObject<HTMLInputElement>,
  branchNumberRef: RefObject<HTMLInputElement>,
  branchName: string,
  branchNumber: string,
) => {
  if (branchNameRef.current && branchNumberRef.current) {
    branchNameRef.current.value = branchName;
    branchNumberRef.current.value = branchNumber;
  }
};
