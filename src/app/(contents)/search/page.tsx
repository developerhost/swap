import { type Item } from "@prisma/client";
import { type Metadata } from "next";

import { ItemSortContainer } from "@/features/itemSort";
import { PublicItemListContainer } from "@/features/publicItemList";
import { TitleUnderbar } from "@/ui/structure/TitleUnderbar";

type SearchPageProps = {
  searchParams: Promise<{
    query: string;
    page: number;
    size: number;
    sort: keyof Item | "likes";
    order: "asc" | "desc";
    onlySelling?: boolean;
  }>;
};

/**
 * 検索結果ページのメタデータ生成
 */
export const generateMetadata = async ({
  searchParams,
}: SearchPageProps): Promise<Metadata> => {
  const { query } = await searchParams;
  return {
    title: `${decodeURIComponent(query)}の検索結果`,
  };
};

/**
 * 検索ページ
 * @param param0.searchParams.query 検索クエリ
 */
const Page = async ({ searchParams }: SearchPageProps) => {
  const {
    query,
    page = 1,
    size = 27,
    sort = "createdAt",
    order = "desc",
    onlySelling,
  } = await searchParams;
  return (
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
};

export default Page;
