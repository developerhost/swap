/**
 * 編集ページでの画像の型
 * 既にアップロード済みの場合はURLのみ、ローカルでアップロードされた場合はFileとURLの両方を持つ
 */
export type FileWithURL = {
  file?: File;
  url: string;
};
