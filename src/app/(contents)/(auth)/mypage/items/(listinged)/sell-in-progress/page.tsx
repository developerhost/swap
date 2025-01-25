import { MypageItemListContainer } from "@/app/(contents)/(auth)/mypage/items/_components/MypageItemList";
import { getSessionUser } from "@/utils/session";
import { type Item } from "@prisma/client";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    query: string;
    page: number;
    size: number;
    sort?: keyof Item;
    order: "asc" | "desc";
  };
};

/**
 *  出品取引中の商品一覧ページ
 *  mypage/items/sell-in-progress
 */
const Page = async ({
  searchParams: { page = 1, size = 8, sort, order = "desc" },
}: Props) => {
  const user = await getSessionUser();
  if (!user) {
    redirect("/api/auth/login");
  }
  return (
    <MypageItemListContainer
      {...{ page, size, sort, order, sellerId: user.id }}
      type="sell-in-progress"
      isPublic
    />
  );
};

export default Page;
