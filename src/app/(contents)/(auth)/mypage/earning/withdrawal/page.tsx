import { CurrentMonthBalance } from "@/app/(contents)/(auth)/mypage/earning/_components/currentMonthBalance";
import { SalesBalance } from "@/app/(contents)/(auth)/mypage/earning/_components/salesBalance";
import { WithdrawalHistory } from "@/app/(contents)/(auth)/mypage/earning/_components/withdrawalHistory";
import {
  processSalesBalance,
  processWithDrawalHistory,
} from "@/app/(contents)/(auth)/mypage/earning/services";
import { Button, ButtonAsLink } from "@/ui/buttons";

import { formatPrice } from "@/utils";

/**
 * 出金申請ページ
 * /mypage/earning/withdrawal
 */
const Page = async () => {
  const { balance } = await processSalesBalance();
  const history = await processWithDrawalHistory();

  /**
   * TODO: 当月売上の計算は、取引テーブルの売却価格を計算、もしくは残高履歴テーブルを作成してから考える
   * 以下は仮データ
   */
  const monthBalance = formatPrice(3500);

  return (
    <>
      <SalesBalance balance={balance}>
        {Number(balance.replace(/[^\d]/g, "")) >= 1000 ? (
          <ButtonAsLink href="/mypage/earning/withdrawal/request">
            出金申請する
          </ButtonAsLink>
        ) : (
          <Button disabled>出金申請する</Button>
        )}
      </SalesBalance>
      <CurrentMonthBalance monthBalance={monthBalance} />
      <WithdrawalHistory history={history} />
    </>
  );
};

export default Page;
