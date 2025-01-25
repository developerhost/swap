"use client";

import { bankAccountDeleteAction } from "@/app/(contents)/(auth)/mypage/settings/bank/_components/actions";
import { useFormActionModal } from "@/ui/modal";
import { useSetModal } from "@/ui/modal/modalProvider";
import { H } from "@/ui/structure/H";
import { useCallback } from "react";
import toast from "react-hot-toast";

/**
 * 銀行口座削除モーダル
 * @param bankId 削除する銀行口座のID
 */
export const useBankAccountDeleteModal = (bankId: string) => {
  const deleteBankAccount = useCallback(async () => {
    const result = await bankAccountDeleteAction(bankId);
    if (result.isFailure) toast.error(result.error);
    toast.success("銀行口座を削除しました");
  }, [bankId]);

  const { handleOpen: open, FormActionModal } = useFormActionModal(
    deleteBankAccount,
    "削除",
  );

  const DeleteModal = useCallback(
    () => (
      <FormActionModal>
        <H className="text-center text-lg font-bold">銀行口座情報の削除</H>
        <p>銀行口座情報を削除してもよろしいですか？</p>
      </FormActionModal>
    ),
    [FormActionModal],
  );

  useSetModal(<DeleteModal />);

  return open;
};
