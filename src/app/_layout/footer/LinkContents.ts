import { SITE_NAME } from "@/constants/site";
import { type Route } from "next";

export type LinkObject = {
  text: string;
  href: Route;
};

export type LinkSection = {
  title: string;
  items: LinkObject[];
};

export const links: LinkSection[] = [
  {
    title: `${SITE_NAME}について`,
    items: [
      { text: "会社概要(運営会社)", href: "https://magenta111384.studio.site" },
      { text: "採用情報", href: "https://magenta111384.studio.site/contact" },
    ],
  },
  {
    title: "ヘルプ",
    items: [{ text: "お問い合わせ", href: "/inquiry" }],
  },
  {
    title: "プライバシーと利用規約",
    items: [
      { text: "プライバシーポリシー", href: "/privacy-policy" },
      { text: "外部送信ポリシー", href: "/cookie-policy" },
      { text: `${SITE_NAME}利用規約`, href: "/tos" },
      { text: "電磁交付規約", href: "/digital" },
      { text: "コンプライアンスポリシー", href: "/compliance" },
      {
        text: "個人データの安全管理に係る基本方針",
        href: "/data-security",
      },
      {
        text: "特定商取引法に基づく表記",
        href: "/specified-commercial-transaction",
      },
      { text: "資金決済法に基づく表示", href: "/funds-settlement" },
      { text: "法務確認について", href: "/legal-check" },
    ],
  },
];
