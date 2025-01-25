import {
  TRANSACTION_STATUS,
  type TransactionStatusValue,
} from "@/constants/item";
import { type IconType } from "react-icons";
import { FaBriefcase, FaClock, FaTimeline, FaTruck } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

type StatusBase = {
  /** アイコン */
  Icon: IconType;
  /** アラートのクラス */
  alertClass: "alert-success" | "alert-warning" | "alert-error";
  /** 太字のテキスト */
  boldText: string;
  /** テキスト */
  text?: string;
};

const statusBase = {
  seller: {
    [TRANSACTION_STATUS.COMPLETE_PAYMENT]: {
      Icon: FaTruck,
      alertClass: "alert-warning",
      boldText: "支払いが確認されました！",
      text: "発送を行ってください。",
    },
    [TRANSACTION_STATUS.SENT]: {
      Icon: FaTruck,
      alertClass: "alert-success",
      boldText: "商品が発送されました！",
      text: "購入者への到着をお待ち下さい。",
    },
    [TRANSACTION_STATUS.RECEIVED]: {
      Icon: FaBriefcase,
      alertClass: "alert-success",
      boldText: "商品が購入者に到着しました！",
      text: "購入者が取引完了ボタンを押して取引完了となります。",
    },
    [TRANSACTION_STATUS.COMPLETED]: {
      Icon: FaBriefcase,
      alertClass: "alert-success",
      boldText: "取引が完了しました！",
      text: "お取引ありがとうございました。",
    },
    [TRANSACTION_STATUS.CANCELLED]: {
      Icon: FaTimeline,
      alertClass: "alert-error",
      boldText: "取引がキャンセルされました",
      text: "お取引ありがとうございました。",
    },
  },
  buyer: {
    [TRANSACTION_STATUS.COMPLETE_PAYMENT]: {
      Icon: FaClock,
      alertClass: "alert-success",
      boldText: "発送をお待ち下さい！",
      text: "出品者からの発送通知をお待ち下さい。",
    },
    [TRANSACTION_STATUS.SENT]: {
      Icon: FaTruck,
      alertClass: "alert-warning",
      boldText: "商品が発送されました！",
      text: "到着したら受取完了をしてください。",
    },
    [TRANSACTION_STATUS.RECEIVED]: {
      Icon: FaBriefcase,
      alertClass: "alert-warning",
      boldText: "商品が到着しました！",
      text: "取引完了をしてください。",
    },
    [TRANSACTION_STATUS.COMPLETED]: {
      Icon: FaBriefcase,
      alertClass: "alert-success",
      boldText: "取引が完了しました！",
      text: "お取引ありがとうございました。",
    },
    [TRANSACTION_STATUS.CANCELLED]: {
      Icon: FaTimeline,
      alertClass: "alert-error",
      boldText: "取引がキャンセルされました",
      text: "お取引ありがとうございました。",
    },
  },
} as const satisfies Record<
  "seller" | "buyer",
  Record<TransactionStatusValue, StatusBase>
>;

const StatusBase = ({ Icon, alertClass, boldText, text }: StatusBase) => (
  <div className={twMerge("alert flex w-full", alertClass)}>
    <Icon size="2rem" />
    <div className="flex flex-col">
      <p className="font-bold">{boldText}</p>
      <p>{text}</p>
    </div>
  </div>
);

type TransactionStatusProps = {
  /** 取引のステータス */
  statusCode: TransactionStatusValue;
  /** 出品者かどうか */
  userType: "seller" | "buyer";
};

/**
 * 取引の状況とユーザーの役割に応じたアラートを表示する
 * @returns div
 */
export const TransactionStatus = ({
  statusCode,
  userType,
}: TransactionStatusProps) => {
  const { Icon, alertClass, boldText, text } = statusBase[userType][statusCode];
  return <StatusBase {...{ Icon, alertClass, boldText, text }} />;
};
