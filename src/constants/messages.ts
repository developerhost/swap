const VALIDATION = {
  TEXT_MIN_LENGTH: (minLength: number) =>
    `${minLength}文字以上で入力してください`,
  TEXT_MAX_LENGTH: (maxLength: number) =>
    `${maxLength}文字以内で入力してください`,
} as const;

const ERROR = {
  NETWORK_ERROR:
    "ネットワークエラーが発生しました。時間をおいて再度お試しください。",
  SESSION_TIMEOUT: "セッションが切れました。再度ログインしてください。",
  USER_NOT_MATCH: "ユーザーが一致しません。再度ログインしてください。",
  USER_NOT_FOUND: "ユーザーが見つかりませんでした。",
  SEND_MAIL_FAILED:
    "メールの送信に失敗しました。時間をおいて再度お試しください。",
  SEND_FAILED: "送信に失敗しました。時間を置いて再度お試しください。",
  AUTHENTICATION_FAILED: "認証に失敗しました。時間を置いて再度お試しください。",
  LIKE_FAILED: "いいねに失敗しました。",
  UNLIKE_FAILED: "いいねの解除に失敗しました。",
  EMAIL_NOT_REGISTERED: "メールアドレスが登録されていません",
  VERIFICATION_FAILED: "ReCAPTCHA認証に失敗しました",
  REPORT_FAILED: "通報に失敗しました",
  COMMENT_ALREADY_REPORTED: "このコメントはすでに通報されています",
  COMMENT_NOT_SELECTED: "コメントが選択されていません",
  REGISTRATION_FAILED: "登録に失敗しました。時間を置いて再度お試しください。",
  OVER_BALANCE: "現在の売上金額以上の出金はできません。",
  VERIFICATION_CODE_INVALID: "認証コードが無効です",
  VERIFICATION_CODE_EXPIRED: "認証コードの有効期限が切れています",
  NOT_ITEM_OWNER: "商品の出品者のみが商品を削除できます。",
  INQUIRY_FROM_FOREIGN_COUNTRY:
    "お問い合わせは日本国内からのみ受け付けております。",
  ...VALIDATION,
} as const;

const SUCCESS = {
  CONFIRMATION_CODE_SENT: "確認コードを送信しました。メールをご確認ください。",
  REPORT_COMMENT: "コメントを通報しました。",
  DELETE_ITEM: "商品を削除しました。",
  RENEW_ADDRESS: "住所を更新しました。",
  REQUEST_WITHDRAWAL: "出金申請を受け付けました。",
  MAIL_VERIFIED: "メールアドレス認証が完了しました。",
  INQUIRY_RECEIVED: "お問い合わせを受け付けました。",
} as const;

/**
 * 成功時と失敗時のメッセージをまとめた定数オブジェクト
 */
export const MESSAGE = {
  SUCCESS,
  ERROR,
} as const;
