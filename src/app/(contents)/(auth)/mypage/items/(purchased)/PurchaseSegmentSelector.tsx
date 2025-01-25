"use client";
import { LISTING_CONTENT, LISTING_LINK } from "@/constants/myPage";
import { CheckBoxLink } from "@/ui/link/CheckBoxLink";
import { useSelectedLayoutSegment } from "next/navigation";

/**
 * 購入した商品一覧と取引中の商品一覧を切り替えるセグメントセレクターをチェックボックスで表示する
 */
export const PurchaseSegmentSelector = () => {
  const segment = useSelectedLayoutSegment();
  const isInProgress = segment === LISTING_CONTENT.BUY_IN_PROGRESS;
  const content = isInProgress
    ? LISTING_CONTENT.PURCHASES
    : LISTING_CONTENT.BUY_IN_PROGRESS;
  const href = LISTING_LINK[content];
  return (
    <CheckBoxLink href={href} checked={isInProgress} text="取引中のみ表示" />
  );
};
