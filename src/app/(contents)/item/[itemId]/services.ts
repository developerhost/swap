"use server";

import {
  findItemRegardlessPublicById,
  type ItemReadResult,
} from "@/repositories/item";
import { isUUID } from "@/utils/validator";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { notFound } from "next/navigation";

const recordNotFoundCode = "P2025";

/**
 * 商品を取得する
 * 存在し得ない商品IDが指定されたときや、指定された商品が存在しないときは404を返す
 * @param itemId 商品ID
 * @throws Error 想定外のエラーが発生したときサーバーエラーをThrowする
 */
export const findItemWithHandling = async (
  itemId: string,
): Promise<ItemReadResult> => {
  if (!isUUID(itemId)) {
    notFound();
  }

  try {
    return await findItemRegardlessPublicById(itemId);
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === recordNotFoundCode
    ) {
      notFound();
    }
    throw error;
  }
};
