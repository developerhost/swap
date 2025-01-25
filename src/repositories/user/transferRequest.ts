import prisma from "@/lib/prisma";
import "server-only";

/**
 * 出金申請を作成
 * @param userId ユーザーID
 * @param amount 出金額
 */
export const createTransferRequest = async (userId: string, amount: number) =>
  await prisma.transferRequest.create({
    data: {
      userId,
      amount,
    },
  });

/**
 * 申請履歴を取得
 * @param userId ユーザーID
 */
export const findTransferRequests = async (userId: string) =>
  await prisma.transferRequest.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });

/**
 * 申請履歴を申請idで取得
 * @param id 申請ID
 */
export const findTransferRequestsByRequestId = async (id: string) =>
  await prisma.transferRequest.findUnique({
    where: { id },
  });

/**
 * 振込済みフラグを更新する
 * @param id 申請ID
 * @param isTransferred 振込済みフラグ
 */
export const updateTransferRequest = async (
  id: string,
  isTransferred: boolean,
) =>
  await prisma.transferRequest.update({
    where: { id },
    data: { isTransferred },
  });
