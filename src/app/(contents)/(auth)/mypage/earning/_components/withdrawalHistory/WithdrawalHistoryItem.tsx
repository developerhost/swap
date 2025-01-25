type Props = {
  date: string;
  amount: string;
  isTransferred: boolean;
};

/**
 * 出金申請履歴を表示する
 */
export const WithdrawalHistoryItem = ({
  date,
  amount,
  isTransferred,
}: Props) => (
  <div className="grid grid-cols-3 grid-rows-1 border-b pb-2 text-lg">
    <p>{date}</p>
    <p className="justify-self-end">{amount}</p>
    <p className="justify-self-end">
      {isTransferred ? "振込済み" : "振込待ち"}
    </p>
  </div>
);
