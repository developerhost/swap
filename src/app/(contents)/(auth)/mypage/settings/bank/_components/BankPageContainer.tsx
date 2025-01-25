import { BankAccountAdd } from "@/app/(contents)/(auth)/mypage/settings/bank/_components/BankAccountAdd";
import { BankAccountDeleteButtonWrapper } from "@/app/(contents)/(auth)/mypage/settings/bank/_components/BankAccountDeleteWrapper";
import { BankInfo } from "@/app/(contents)/(auth)/mypage/settings/bank/_components/BankInfo";
import { findBankAccount } from "@/repositories/user/bankAcoount";

/**
 * 銀行情報のデータ取得が責務のコンテナ
 */
export const BankPageContainer = async ({ userId }: { userId: string }) => {
  const bankAccount = await findBankAccount(userId);
  return (
    <div className="block border-t border-gray-200">
      {bankAccount ? (
        <BankAccountDeleteButtonWrapper bankId={bankAccount.id}>
          <BankInfo bankAccount={bankAccount} />
        </BankAccountDeleteButtonWrapper>
      ) : (
        <BankAccountAdd className="w-full" />
      )}
    </div>
  );
};
