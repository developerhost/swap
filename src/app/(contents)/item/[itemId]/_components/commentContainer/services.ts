"use server";

import { findItemComments } from "@/repositories/item/itemComment";

/**
 * コメントを取得
 * @param itemId 商品ID
 * @returns
 */
export const fetchItemComments = async (itemId: string) =>
  await findItemComments(itemId);
