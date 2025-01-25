"use client";

import { useIsOverflowHidden } from "@/app/(contents)/user/[userId]/_components/userInfo/hooks";
import { type UserReadResult } from "@/repositories/user";
import { MoreLessButton } from "@/ui/buttons/moreLessButton";
import Image from "next/image";
import { useReducer, useRef } from "react";

type Props = {
  /** ユーザー情報 */
  user: UserReadResult;
  /** 出品数 */
  count: number;
};

/**
 * ユーザー情報を表示する
 * @param user ユーザー情報
 * @returns div
 */
export const UserInfo = ({ user, count }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isOverflowHidden = useIsOverflowHidden(ref);
  const [isCollapsed, handleToggleDescription] = useReducer(
    (prev) => !prev,
    true,
  );

  return (
    <div className="border-b-2 border-gray-300 pb-2">
      <div className="flex w-full items-center pb-2">
        <Image
          src={user.image ?? ""}
          alt="プロフィール画像"
          width={100}
          height={100}
          className="!static rounded-full"
        />
        <div className="flex-1 pl-5">
          <p className="text-lg font-bold">{user.name}</p>
          <p>
            出品数<span className="text-xl font-bold">{count}</span>
          </p>
        </div>
      </div>
      {user.introduction && (
        <>
          <div ref={ref} className={isCollapsed ? "line-clamp-2" : ""}>
            {user.introduction}
          </div>
          {isOverflowHidden && (
            <MoreLessButton
              isCollapsed={isCollapsed}
              onClick={handleToggleDescription}
            />
          )}
        </>
      )}
    </div>
  );
};
