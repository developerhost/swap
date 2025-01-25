import "server-only";

import { findDraftItemById } from "@/repositories/draftItem";
import { getSessionUser } from "@/utils";
import { isUUID } from "@/utils/validator";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { notFound } from "next/navigation";

/** 下書き商品の取得結果 */
export type DraftItemReadResult = Awaited<ReturnType<typeof findDraftItemById>>;

/**
 * 下書き商品をエラーハンドリング付きで取得する
 * 存在し得ない商品IDが指定されたときや、指定された商品が存在しないとき、他の人の出品だった場合は404ページを返す
 * @param itemId 商品ID
 */
export const findDraftItemWithHandling = async (itemId: string) => {
  const sessionUser = await getSessionUser();

  if (!isUUID(itemId)) {
    notFound();
  }

  try {
    const draftItem = await findDraftItemById(itemId);
    if (draftItem?.sellerId !== sessionUser?.id) {
      notFound();
    }
    return draftItem;
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      notFound();
    }
    throw error;
  }
};
