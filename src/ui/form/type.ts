import { type Route } from "next";

/** フォームに定義されるべき状態の共通型 */
export type FormState<T> = {
  /** 型引数と確認コード */
  values: T & { verificationCode: string };
  /** toastで表示したいフォーム処理結果のメッセージ */
  result?: {
    message: string;
    type: "success" | "error";
  };
  /** 処理完了後のリダイレクト先 */
  redirect?: Route;
};
