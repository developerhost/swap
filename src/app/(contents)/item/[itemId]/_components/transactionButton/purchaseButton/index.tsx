"use client";

import { useCallback } from "react";
import { usePurchaseModal } from "@/app/(contents)/item/[itemId]/_components/transactionButton/purchaseButton/hooks";
import { Button } from "@/ui";
import { type Item } from "@prisma/client";
import { processTestPurchase } from "@/app/(contents)/item/[itemId]/_components/transactionButton/purchaseButton/actions";

type Props = {
  /** 出品情報 */
  item: Item;
  /** ログイン中のユーザーID */
  userId: string | undefined;
  /** className */
  className?: string;
};

/**
 * 購入ボタン
 * 購入確認画面用のモーダルを開く
 */
export const PurchaseButton = ({ item, userId, className = "" }: Props) => {
  const handleOpen = usePurchaseModal(item, userId);
  const isProduction = process.env.NODE_ENV === "production";

  const handleTestPurchase = useCallback(async () => {
    if (!userId) {
      return alert("ログインしてください");
    }
    await processTestPurchase(userId, item.id);
  }, [userId, item.id]);

  return isProduction ? (
    <Button onClick={handleOpen} className={className}>
      購入する
    </Button>
  ) : (
    <Button onClick={handleTestPurchase} className={className}>
      テスト購入する
    </Button>
  );
};
