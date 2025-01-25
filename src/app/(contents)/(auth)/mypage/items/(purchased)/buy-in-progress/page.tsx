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
 *  購入取引中の商品一覧ページ
 *  mypage/items/buy-in-progress
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
      {...{ page, size, sort, order, buyerId: user.id }}
      type="buy-in-progress"
    />
  );
};

export default Page;
