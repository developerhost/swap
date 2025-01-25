import { WithdrawalHistoryItem } from "@/app/(contents)/(auth)/mypage/earning/_components/withdrawalHistory/WithdrawalHistoryItem";
import { Card } from "@/ui/card";

type Props = {
  history: {
    /** 申請ID */
    id: string;
    /** 振込金額 */
    amount: string;
    /** 申請日時 */
    date: string;
    /** 振込み判定フラグ */
    isTransferred: boolean;
  }[];
};

/**
 * 出金申請履歴を表示する
 * @param history 出金履歴の配列
 */
export const WithdrawalHistory = ({ history }: Props) => (
  <Card className="grid gap-3 bg-slate-100">
    <p className="text-center text-lg">出金履歴</p>
    {history.length ? (
      <>
        <div className="grid grid-cols-3 grid-rows-1">
          <p className="text-gray-500">申請日</p>
          <p className="justify-self-end text-gray-500">振込金額</p>
          <p className="justify-self-end text-gray-500">ステータス</p>
        </div>
        {history.map(({ id, ...item }) => (
          <WithdrawalHistoryItem key={id} {...item} />
        ))}
        <p className="text-xs text-gray-500">
          振込手数料を引いた後の金額が表示されています。
        </p>
      </>
    ) : (
      <NoHistory />
    )}
  </Card>
);

const NoHistory = () => (
  <div className="text-center text-gray-400">出金履歴がありません</div>
);
