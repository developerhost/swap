"use client";

import { useBankAccountModal } from "@/app/(contents)/(auth)/mypage/settings/bank/_components/bankAccountForm/BankAccountFormModal";
import { Button } from "@/ui";

/**
 * 銀行口座登録するコンポーネント
 */
export const BankAccountAdd = ({ className }: { className?: string }) => {
  const handleOpen = useBankAccountModal();

  return (
    <Button className={className} onClick={handleOpen}>
      新しい口座を登録する
    </Button>
  );
};
