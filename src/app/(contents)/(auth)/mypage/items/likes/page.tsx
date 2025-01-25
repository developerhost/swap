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
 *  出品商品一覧を表示するページ
 * /mypage/items/likes
 */
const Page = async ({
  searchParams: { page = 1, size = 8, sort = "createdAt", order = "desc" },
}: Props) => {
  const user = await getSessionUser();
  if (!user) {
    redirect("/api/auth/login");
  }
  const userId = user.id;
  return (
    <MypageItemListContainer
      {...{ page, size, sort, order, userId, type: "likes" }}
    />
  );
};

export default Page;
