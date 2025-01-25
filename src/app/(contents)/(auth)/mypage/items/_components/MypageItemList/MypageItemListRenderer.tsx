import {
  MypageItemCard,
  type ItemCardRequired,
} from "@/app/(contents)/(auth)/mypage/items/_components/MypageItemList/MypageItemCard";
import { type ListingContentValue } from "@/constants/myPage";
import { twMerge } from "tailwind-merge";

type MypageItemListProps = {
  items: ItemCardRequired[];
  sellerId: string | undefined;
  type?: ListingContentValue;
};
/**
 * 商品一覧を表示する
 * @param items 取得した商品一覧
 * @returns div
 */
export const MypageItemListRenderer = ({
  items,
  sellerId,
  type,
}: MypageItemListProps) => {
  const className = sellerId ?? "border-t border-gray-200";
  return items.length ? (
    <ul className={twMerge("w-full", className)}>
      {items.map((item) => (
        <li key={item.id}>
          <MypageItemCard {...{ item, type }} />
        </li>
      ))}
    </ul>
  ) : (
    <NoItem />
  );
};

const NoItem = () => (
  <div className="text-center text-gray-400">商品がありません</div>
);
