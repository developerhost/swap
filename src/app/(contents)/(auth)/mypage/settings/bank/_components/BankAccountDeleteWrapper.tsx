"use client";

import { useBankAccountDeleteModal } from "@/app/(contents)/(auth)/mypage/settings/bank/_components/BankAccountDelteModal";
import { FaTrash } from "react-icons/fa6";

/**
 * 銀行口座削除ボタン
 * @param bankId 削除する銀行口座のID
 */
export const BankAccountDeleteButtonWrapper = ({
  bankId,
  children,
}: {
  bankId: string;
  children: React.ReactNode;
}) => {
  const handleOpenDeleteModal = useBankAccountDeleteModal(bankId);

  return (
    <div className="flex items-center justify-between">
      {children}
      <FaTrash
        className="cursor-pointer text-red-500"
        size={20}
        onClick={handleOpenDeleteModal}
      />
    </div>
  );
};
