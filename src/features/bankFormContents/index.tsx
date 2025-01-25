"use client";

import { type BankAccountFormValues } from "@/app/(contents)/(auth)/mypage/settings/bank/_components/bankAccountForm/type";
import { ACCOUNT_TYPE } from "@/constants/bank";
import { getBanks } from "@/features/bankFormContents/getBanks";
import { type BankTerarenBankResult } from "@/features/bankFormContents/getBanks/type";
import { getBranches } from "@/features/bankFormContents/getBranches";
import { type BankTerarenBranchResult } from "@/features/bankFormContents/getBranches/type";
import {
  setBankInputs,
  setBranchInputs,
} from "@/features/bankFormContents/utils";
import { Input, Select } from "@/ui/form";
import { type useForm } from "@/ui/form/hooks";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  register: ReturnType<typeof useForm<BankAccountFormValues>>["register"];
};

/**
 * 銀行情報を入力するフォームの入力部分
 * 銀行情報と出金申請のフォームで使用する。
 * @param register フォームの登録関数
 * @todo コンポーネントの分割
 */
export const BankFormContents = ({ register }: Props) => {
  const [isBankSuggestVisible, setIsBankSuggestVisible] = useState(false);
  const [isBranchSuggestVisible, setIsBranchSuggestVisible] = useState(false);
  const [bankOrBranchNames, setBankOrBranchNames] = useState<
    BankTerarenBankResult | BankTerarenBranchResult
  >([]);
  const [suggestBankOrBranchNames, setSuggestBankOrBranchNames] = useState<
    BankTerarenBankResult | BankTerarenBranchResult
  >([]);

  const bankCodeRef = useRef<HTMLInputElement>(null);
  const bankNameRef = useRef<HTMLInputElement>(null);
  const branchNameRef = useRef<HTMLInputElement>(null);
  const branchNumberRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!bankOrBranchNames.length) return setSuggestBankOrBranchNames([]);
    const value = branchNameRef.current?.value ?? bankNameRef.current?.value;
    if (!value) return setSuggestBankOrBranchNames([]);
    const filteredNames = bankOrBranchNames.filter(
      (bankOrBranch) =>
        bankOrBranch.name.includes(value) ||
        bankOrBranch.kana.includes(value) ||
        bankOrBranch.hira.includes(value),
    );
    setSuggestBankOrBranchNames(filteredNames);
  }, [bankOrBranchNames]);

  const handleBankNameChange = useCallback(async () => {
    setIsBranchSuggestVisible(false);
    setIsBankSuggestVisible(true);

    // 金融機関コードと支店名と支店番号をリセット
    if (bankCodeRef.current) bankCodeRef.current.value = "";
    if (branchNameRef.current) branchNameRef.current.value = "";
    if (branchNumberRef.current) branchNumberRef.current.value = "";

    const value = bankNameRef.current?.value;
    if (!value) return setBankOrBranchNames([]);
    const suggestBanks = await getBanks(value);
    if (suggestBanks) setBankOrBranchNames(suggestBanks);
  }, [bankNameRef, bankCodeRef]);

  const handleBranchNameOnChange = useCallback(async () => {
    setIsBankSuggestVisible(false);
    setIsBranchSuggestVisible(true);

    // 支店番号をリセット
    if (branchNumberRef.current) branchNumberRef.current.value = "";

    const value = branchNameRef.current?.value;
    if (!value || !bankCodeRef.current?.value) return setBankOrBranchNames([]);
    const suggestBranches = await getBranches(bankCodeRef.current.value, value);
    if (suggestBranches) setBankOrBranchNames(suggestBranches);
  }, [bankCodeRef, branchNameRef]);

  // onClickイベントで直接関数を割り当てるために、関数を返すようにしている
  const handleBankNameSuggestSelect = useCallback(
    (bankName: string, bankCode: string) => () => {
      if (isBankSuggestVisible) {
        setBankInputs(bankNameRef, bankCodeRef, bankName, bankCode);
        setIsBankSuggestVisible(false);
      }
    },
    [bankNameRef, bankCodeRef, isBankSuggestVisible],
  );

  // onClickイベントで直接関数を割り当てるために、関数を返すようにしている
  const handleBranchNameSuggestSelect = useCallback(
    (branchName: string, branchCode: string) => () => {
      if (isBranchSuggestVisible) {
        setBranchInputs(branchNameRef, branchNumberRef, branchName, branchCode);
        setIsBranchSuggestVisible(false);
      }
    },
    [branchNameRef, branchNumberRef, isBranchSuggestVisible],
  );

  return (
    <>
      <div className="grid grid-cols-2 items-end gap-3">
        <Input
          ref={bankNameRef}
          labelText="銀行名"
          placeholder="例: 三菱UFJ銀行"
          onChange={handleBankNameChange}
          {...register("bankName")}
        />
        <Input
          ref={bankCodeRef}
          labelText="金融機関コード"
          placeholder="例: 0001（4桁）"
          {...register("bankCode")}
        />
        {isBankSuggestVisible &&
          suggestBankOrBranchNames.map((bank) => (
            <button
              className="cursor-pointer border-b border-gray-200 py-2 pl-4"
              onClick={handleBankNameSuggestSelect(bank.name, bank.code)}
              key={bank.code}
            >
              {bank.name}
            </button>
          ))}
      </div>
      <div className="grid grid-cols-2 items-end gap-3">
        <Input
          ref={branchNameRef}
          labelText="支店名"
          placeholder="例: 青山支店"
          onChange={handleBranchNameOnChange}
          {...register("branchName")}
        />
        <Input
          labelText="支店番号"
          type="string"
          placeholder="例: 123（3桁）"
          ref={branchNumberRef}
          {...register("branchNumber")}
        />
        {isBranchSuggestVisible &&
          suggestBankOrBranchNames.map((branch) => (
            <button
              className="cursor-pointer border-b border-gray-200 py-2 pl-4"
              onClick={handleBranchNameSuggestSelect(branch.name, branch.code)}
              key={branch.code}
            >
              {branch.name}
            </button>
          ))}
      </div>
      <Select
        labelText="口座種別"
        options={ACCOUNT_TYPE}
        {...register("accountType")}
      />
      <Input
        labelText="口座番号"
        placeholder="例: 1234567（数字7桁）"
        {...register("accountNumber")}
      />
      <Input
        labelText="口座名義（セイ）"
        placeholder="例: タナカ"
        {...register("familyName")}
      />
      <Input
        labelText="口座名義（メイ）"
        placeholder="例: サトシ"
        {...register("firstName")}
      />
    </>
  );
};
