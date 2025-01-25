import { Card } from "@/ui/card";
import { parseFixedYearAndMonth } from "@/utils/timeParser";

type Props = {
  /** 売上残高文字列 */
  monthBalance: string;
};

/**
 * 当月の売上を表示する
 * @param monthBalance 当月の売上額
 */
export const CurrentMonthBalance = ({ monthBalance }: Props) => {
  const currentMonth = parseFixedYearAndMonth(new Date());

  return (
    <Card className="grid gap-1 bg-slate-100">
      <p className="text-gray-500">売上合計 {currentMonth}</p>
      <p className="text-xl font-bold">{monthBalance}</p>
    </Card>
  );
};
