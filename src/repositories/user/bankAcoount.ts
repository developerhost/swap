import prisma from "@/lib/prisma";
import { type Prisma } from "@prisma/client";
import "server-only";

/**
 * 銀行口座を登録する関数
 * @param userId ユーザーID
 * @param bankAccount 銀行口座情報
 * @returns 登録した銀行口座
 */
export const createBankAccount = (
  userId: string,
  bankAccount: Omit<Prisma.BankAccountCreateWithoutUserInput, "id">,
) =>
  prisma.bankAccount.create({
    data: {
      ...bankAccount,
      user: { connect: { id: userId } },
    },
  });

/**
 * 銀行情報を取得する関数
 * 不要な値が含まれないようにselectで指定している
 * @param userId  ユーザーID
 * @returns 銀行口座情報
 */
export const findBankAccount = (userId: string) =>
  prisma.bankAccount.findUnique({ where: { userId } });

/**
 * 銀行口座を更新する関数
 * @param id 銀行口座ID
 * @param bankAccount 銀行口座情報
 * @returns 更新した銀行口座
 */
export const updateBankAccount = (
  id: string,
  bankAccount: Omit<Prisma.BankAccountCreateWithoutUserInput, "id">,
) =>
  prisma.bankAccount.update({
    where: { id },
    data: bankAccount,
  });

/**
 * 銀行口座を削除する関数
 * @param id 銀行口座ID
 */
export const deleteBankAccount = (id: string) =>
  prisma.bankAccount.delete({ where: { id } });
