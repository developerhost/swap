import { type Route } from "next";
import Link from "next/link";
import { type UrlObject } from "url";

type Props = {
  /** チェックボックスのリンク先 */
  href: UrlObject | Route;
  /** チェック状態 */
  checked: boolean;
  /** チェックボックスの右側に表示するテキスト */
  text: string;
};

/**
 * チェックボックスの見た目のリンク
 * ページ側で検索パラメータなどで状態を保持し、リンク形式でチェックボックスの切り替えを行う
 */
export const CheckBoxLink = ({ href, checked, text }: Props) => (
  <Link href={href} className="label w-full cursor-pointer justify-start">
    <input
      type="checkbox"
      className="checkbox-info checkbox"
      checked={checked}
    />
    <span className="label-text pl-2">{text}</span>
  </Link>
);
