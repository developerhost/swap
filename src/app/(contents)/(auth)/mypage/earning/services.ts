import "server-only";

import { initialBankAccountValues } from "@/features/bankFormContents/type";
import { findUserById, updateUser } from "@/repositories/user";
import { findBankAccount } from "@/repositories/user/bankAcoount";
import { findTransferRequests } from "@/repositories/user/transferRequest";
import { formatPrice, getSessionUser } from "@/utils";

import { parseFixedDate } from "@/utils/timeParser";
import { type User } from "@prisma/client";
import { redirect } from "next/navigation";

/**
 * 売上残高を更新する
 * @param userId ユーザーID
 * @param balance 新しい残高
 */
export const updateUserBalance = async (
  userId: string,
  balance: number,
): Promise<Partial<User>> => await updateUser({ id: userId, balance });

/**
 * 売上残高系ページの表示に必要な処理を行う。
 */
export const processSalesBalance = async () => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    redirect("/api/auth/login");
  }
  const user = await findUserById(sessionUser.id);
  if (!user) {
    redirect("/api/auth/login");
  }
  const bankAccount = await findBankAccount(user.id);
  const {
    bankName,
    branchName,
    bankCode,
    branchNumber,
    accountType,
    accountName,
    accountNumber,
  } = bankAccount ? bankAccount : initialBankAccountValues;
  // 銀行情報を入力するフォームでは、姓と名を分けて入力するため分割している
  const [familyName, firstName] = accountName.split(" ");
  const balance = formatPrice(user.balance);
  const request = {
    bankName,
    branchNumber,
    bankCode,
    branchName,
    accountType: String(accountType),
    accountNumber,
    // split メソッドを使うとstringとundefinedのユニオン型になるため、undefinedの場合は空文字を返す
    familyName: familyName ? familyName : "",
    // split メソッドを使うとstringとundefinedのユニオン型になるため、undefinedの場合は空文字を返す
    firstName: firstName ? firstName : "",
    withdrawalAmount: balance,
  };

  return { request, balance: request.withdrawalAmount };
};

/**
 * 出金申請履歴の表示に必要な処理を行う
 */
export const processWithDrawalHistory = async () => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    redirect("/api/auth/login");
  }
  const user = await findUserById(sessionUser.id);
  if (!user) {
    redirect("/api/auth/login");
  }
  const history = await findTransferRequests(user.id);

  const processedHistory = history.map((record) => {
    const processedAmount = formatPrice(record.amount);
    const processedDate = parseFixedDate(record.date);
    return {
      id: record.id,
      amount: processedAmount,
      date: processedDate,
      isTransferred: record.isTransferred,
    };
  });

  return processedHistory;
};

/**
 * TODO: 当月売上を取得する処理を作成する
 */
