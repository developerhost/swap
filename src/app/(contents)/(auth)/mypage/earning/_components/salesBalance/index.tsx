import { Card } from "@/ui/card";

type Props = {
  /** 売上残高文字列 */
  balance: string;
  /** 出金申請ページに遷移するボタンコンポーネント */
  children?: React.ReactNode;
};

/**
 * 出金可能な売上残高を表示する
 * @param balance 売上残高
 */
export const SalesBalance = ({ balance, children }: Props) => (
  <Card className="grid gap-1 bg-slate-100">
    <p className="text-gray-500">
      出金可能な売上残高
      <span className="text-xs">（¥1,000から出金申請が可能です。）</span>
    </p>
    <p className="text-xl font-bold">{balance}</p>
    {children}
  </Card>
);
