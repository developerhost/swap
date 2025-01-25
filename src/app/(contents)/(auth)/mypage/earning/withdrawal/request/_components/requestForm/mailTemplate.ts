import { PAGE_CONTENT, PAGE_LINK } from "@/constants/myPage";
import { SITE_URL } from "@/constants/site";

/**
 * 出金申請者に送信するメールテンプレート
 * @param userName ユーザ名
 * @param requestId 申請ID
 * @param withdrawalAmount 出金額
 */
export const createWithdrawalMailContent = (
  userName: string,
  requestId: string,
  withdrawalAmount: string,
) =>
  `
  ${userName}様
  出金申請を受け付けましたので、ご連絡いたします。

  申請番号：${requestId}
  出金額：${withdrawalAmount}

  こちらの履歴はマイページでご確認いただけます。
  ${SITE_URL}${PAGE_LINK[PAGE_CONTENT.WITHDRAWAL]}

  本メールは、出金申請の受付確認の為に送信されたメールです。
  その為、本メールにご返信いただいても対応致しかねますのでご了承ください。`;
