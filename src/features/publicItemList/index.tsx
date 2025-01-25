import { PublicItemListRenderer } from "@/features/publicItemList/PublicItemRenderer";
import {
  countItems,
  countItemsByProductName,
  countSellingItems,
  findItems,
  findItemsByProductName,
  findItemsByProductNameWithSortedByLikes,
  findItemsSortedByLikes,
  findSellingItems,
  type ItemOrderBy,
  type ItemsReadResult,
} from "@/repositories/item";
import { PaginationBar } from "@/ui";

type Props = {
  page: number;
  size: number;
  sort: string;
  order: string;
  query?: string;
  onlySelling?: boolean;
};

/**
 * 渡されたパラメータに応じて取得するデータを選択する
 * @param props page, size, sort, order, query, buyerId, sellerId, isPublic, userId
 * @returns [商品の配列, 商品数]
 */
const findItemsAndCount = ({
  page,
  size,
  sort,
  order,
  query,
  onlySelling,
}: Props): Promise<[ItemsReadResult, number]> => {
  const orderBy: ItemOrderBy = {
    [sort]: sort === "likes" ? { _count: order } : order,
  };
  // 検索結果でいいね数を含めた商品一覧
  if (query && sort === "likes") {
    return Promise.all([
      findItemsByProductNameWithSortedByLikes(
        query,
        page,
        size,
        Boolean(onlySelling),
      ),
      countItemsByProductName(query, Boolean(onlySelling)),
    ]);
  }
  // 検索結果
  else if (query) {
    return Promise.all([
      findItemsByProductName(query, page, size, orderBy, Boolean(onlySelling)),
      countItemsByProductName(query, Boolean(onlySelling)),
    ]);
    // いいね数を含めた商品一覧
  } else if (sort === "likes") {
    return Promise.all([
      findItemsSortedByLikes(page, size, orderBy, Boolean(onlySelling)),
      countItems(Boolean(onlySelling)),
    ]);
    // 販売一覧
  } else if (onlySelling) {
    return Promise.all([
      findSellingItems(page, size, orderBy),
      countSellingItems(),
    ]);
  }
  // 全商品一覧
  return Promise.all([findItems(page, size, orderBy), countItems()]);
};

/**
 * データ取得が責務のコンテナ
 * @param props page, size, sort, order, query
 */
export const PublicItemListContainer = async (props: Props) => {
  const [items, count] = await findItemsAndCount(props);
  const total = Math.ceil(count / props.size);
  return (
    <>
      <PublicItemListRenderer items={items} />
      {total > 1 && (
        <PaginationBar currentPage={props.page} totalPages={total} />
      )}
    </>
  );
};
