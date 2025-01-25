import { ACCOUNT_TYPE } from "@/constants/bank";
import { type BankAccount } from "@prisma/client";

type Props = {
  bankAccount: BankAccount;
};

/**
 * 銀行情報を表示するコンポーネント
 * @param bankAccount 銀行口座情報
 */
export const BankInfo = ({
  bankAccount: {
    bankName,
    branchName,
    accountType,
    accountNumber,
    accountName,
  },
}: Props) => (
  <div className="border-b border-gray-200 px-3 py-2">
    <div className="flex">
      <p className="text-xl font-bold">{bankName}</p>
      <p className="pl-3 text-xl font-bold">{branchName}</p>
    </div>
    <div className="flex">
      <p>{ACCOUNT_TYPE[accountType]}</p>
      <p className="pl-2">{accountNumber}</p>
      <p className="pl-2">{accountName}</p>
    </div>
  </div>
);
