import { type Item } from "@prisma/client";
import { redirect } from "next/navigation";

import { MypageItemListContainer } from "@/app/(contents)/(auth)/mypage/items/_components/MypageItemList";
import { getSessionUser } from "@/utils/session";

type Props = {
  searchParams: {
    query: string;
    page: number;
    size: number;
    sort: keyof Item;
    order: "asc" | "desc";
  };
};

/**
 *  出品停止中商品一覧を表示するページ
 * /mypage/items/suspended
 */
const Page = async ({
  searchParams: { page = 1, size = 8, sort = "createdAt", order = "desc" },
}: Props) => {
  const user = await getSessionUser();
  if (!user) {
    redirect("/api/auth/login");
  }
  const sellerId = user.id;
  return (
    <MypageItemListContainer
      {...{ page, size, sort, order, sellerId, type: "suspended" }}
    />
  );
};

export default Page;
