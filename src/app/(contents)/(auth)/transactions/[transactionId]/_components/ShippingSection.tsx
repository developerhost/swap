import {
  ShippingNotification,
  TrackingNumber,
} from "@/app/(contents)/(auth)/transactions/[transactionId]/_components";
import { SHIPPING_METHOD } from "@/constants/item";
import { type TransactionReadResult } from "@/repositories/transaction";
import { hasObjectKey } from "@/utils/typeGuard";

type ShippingSectionProps = {
  /** 取引情報 */
  transaction: TransactionReadResult;
  /** 取引者か否か */
  userType: "seller" | "buyer";
};

/**
 * 配送方法コードであることを保証する
 * @param code 配送方法コード
 */
// eslint-disable-next-line func-style
function assertShippingMethodCode(
  code: string,
): asserts code is keyof typeof SHIPPING_METHOD {
  if (!hasObjectKey(SHIPPING_METHOD, code)) throw new Error("shippingMethodCode is not found")
}

/**
 * 配送情報関連の表示を行う
 */
export const ShippingSection = ({
  transaction,
  userType,
}: ShippingSectionProps) => {
  const {
    id: transactionId,
    trackingNumber,
    item: { shippingMethodCode },
  } = transaction;
  assertShippingMethodCode(shippingMethodCode);
  return (
    <>
      {/* 送り状番号の送信用 */}
      {userType === "seller" && (
        <ShippingNotification transactionId={transactionId} />
      )}
      {/* 送り状番号の表示用 */}
      <TrackingNumber {...{ trackingNumber, shippingMethodCode }} />
    </>
  );
};
