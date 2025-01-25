import { type Item } from "@prisma/client";
import { type Metadata } from "next";

import { ItemSortContainer } from "@/features/itemSort";
import { PublicItemListContainer } from "@/features/publicItemList";
import { TitleUnderbar } from "@/ui/structure/TitleUnderbar";

type SearchPageProps = {
  searchParams: {
    query: string;
    page: number;
    size: number;
    sort: keyof Item | "likes";
    order: "asc" | "desc";
    onlySelling?: boolean;
  };
};

/**
 * 検索結果ページのメタデータ生成
 */
export const generateMetadata = ({
  searchParams: { query },
}: SearchPageProps): Metadata => ({
  title: `${decodeURIComponent(query)}の検索結果`,
});

/**
 * 検索ページ
 * @param param0.searchParams.query 検索クエリ
 */
const Page = ({
  searchParams: {
    query,
    page = 1,
    size = 27,
    sort = "createdAt",
    order = "desc",
    onlySelling,
  },
}: SearchPageProps) => (
  <>
    <TitleUnderbar title={`${query}の検索結果`} />
    <ItemSortContainer
      {...{ path: "/search", sort, order, query, onlySelling }}
    />
    <PublicItemListContainer
      {...{ page, size, sort, order, onlySelling }}
      query={decodeURIComponent(query)}
    />
  </>
);

export default Page;
