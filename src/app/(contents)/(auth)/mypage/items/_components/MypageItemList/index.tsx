import { type ItemCardRequired } from "@/app/(contents)/(auth)/mypage/items/_components/MypageItemList/MypageItemCard";
import { MypageItemListRenderer } from "@/app/(contents)/(auth)/mypage/items/_components/MypageItemList/MypageItemListRenderer";
import { type ListingContentValue } from "@/constants/myPage";
import {
  countDraftItemsBySellerId,
  findDraftItemsBySellerId,
} from "@/repositories/draftItem";
import {
  countItems,
  countItemsByBuyerId,
  countItemsByBuyerIdInTransaction,
  countItemsBySellerId,
  countItemsBySellerIdInTransaction,
  countItemsByUserBrowsed,
  countItemsByUserLiked,
  countSoldItemsBySellerId,
  findItems,
  findItemsByBuyerId,
  findItemsByBuyerIdInTransaction,
  findItemsBySellerId,
  findItemsBySellerIdInTransaction,
  findItemsByUserBrowsed,
  findItemsByUserLiked,
  findSoldItemsBySellerId,
  type ItemOrderBy,
} from "@/repositories/item";
import { PaginationBar } from "@/ui";

type CommonProps = {
  /** ページ番号 */
  page: number;
  /** 1ページあたりの表示数 */
  size: number;
  /** ソート対象カラム */
  sort: string | undefined;
  /** ソート順 */
  order: "asc" | "desc";
  /** 購入者ID */
  buyerId?: string;
  /** 出品者ID */
  sellerId?: string;
  /** 公開状態 */
  isPublic?: boolean;
  /** ユーザーID */
  userId?: string;
  /** 表示タイプ */
  type?: ListingContentValue;
};

type MypageItemListContainerProps = CommonProps &
  (
    | { type: "likes" | "browsing-history" | "drafts"; userId: string }
    | {
        type: "buy-in-progress";
        buyerId: string;
        sellerId?: never;
        isPublic?: never;
      }
    | { type: "sell-in-progress" | "sold" | "suspended"; sellerId: string }
    | { sellerId: string; type?: never }
    | { buyerId: string; sellerId?: never; type?: never }
  );

/**
 * 条件を元に商品一覧と商品の合計数を取得する
 */
const findItemsAndCount = ({
  page,
  size,
  sort,
  order,
  buyerId,
  sellerId,
  isPublic,
  userId,
  type,
}: MypageItemListContainerProps): Promise<
  [Array<ItemCardRequired>, number]
> => {
  const orderBy: ItemOrderBy =
    sort === undefined
      ? type && ["in-progress", "sold", "purchases"].includes(type)
        ? {
            transaction: {
              purchaseDate: order,
            },
          }
        : {
            createdAt: order,
          }
      : {
          [sort]: order,
        };
  // 下書き一覧
  if (userId && type === "drafts") {
    return Promise.all([
      findDraftItemsBySellerId(userId, page, size, orderBy),
      countDraftItemsBySellerId(userId),
    ]);
  }
  // 出品取引中商品一覧
  if (sellerId && isPublic && type === "sell-in-progress") {
    return Promise.all([
      findItemsBySellerIdInTransaction(sellerId, page, size, orderBy, isPublic),
      countItemsBySellerIdInTransaction(sellerId, isPublic),
    ]);
  }
  // 売却済み商品一覧
  if (sellerId && isPublic && type === "sold") {
    return Promise.all([
      findSoldItemsBySellerId(sellerId, page, size, orderBy, isPublic),
      countSoldItemsBySellerId(sellerId, isPublic),
    ]);
  }
  // 購入取引中の商品一覧
  if (buyerId && type === "buy-in-progress") {
    return Promise.all([
      findItemsByBuyerIdInTransaction(buyerId, page, size, orderBy),
      countItemsByBuyerIdInTransaction(buyerId),
    ]);
  }
  // いいね一覧
  if (userId && type === "likes") {
    return Promise.all([
      findItemsByUserLiked(userId, page, size, orderBy),
      countItemsByUserLiked(userId),
    ]);
  }

  // 閲覧履歴
  if (userId && type === "browsing-history") {
    return Promise.all([
      findItemsByUserBrowsed(userId, page, size, orderBy),
      countItemsByUserBrowsed(userId),
    ]);
  }

  // 出品商品一覧
  if (sellerId && isPublic) {
    return Promise.all([
      findItemsBySellerId(sellerId, page, size, orderBy),
      countItemsBySellerId(sellerId, isPublic),
    ]);
  }
  // 出品停止中商品一覧
  if (sellerId && type === "suspended") {
    const isPublic = false;
    return Promise.all([
      findItemsBySellerId(sellerId, page, size, orderBy, isPublic),
      countItemsBySellerId(sellerId, isPublic),
    ]);
  }
  // 購入商品一覧
  if (buyerId) {
    return Promise.all([
      findItemsByBuyerId(buyerId, page, size, orderBy),
      countItemsByBuyerId(buyerId),
    ]);
  }
  // 全商品一覧
  return Promise.all([findItems(page, size, orderBy), countItems()]);
};

/**
 * 商品一覧のデータ取得が責務のコンテナ
 * 受け取った条件に応じて商品一覧を取得する
 * @param props page, size, sort, order
 */
export const MypageItemListContainer = async (
  props: MypageItemListContainerProps,
) => {
  const [items, count] = await findItemsAndCount(props);
  const { sellerId, type, page: currentPage, size } = props;
  const totalPages = Math.ceil(count / size);
  return (
    <>
      <MypageItemListRenderer {...{ items, sellerId, type }} />
      {totalPages > 1 && <PaginationBar {...{ currentPage, totalPages }} />}
    </>
  );
};
