import { type Item } from "@prisma/client";

import { ItemSortContainer } from "@/features/itemSort";
import { PublicItemListContainer } from "@/features/publicItemList";

type Props = {
  searchParams: {
    page: number;
    size: number;
    sort: keyof Item | "likes";
    order: "asc" | "desc";
    onlySelling?: boolean;
  };
};

/**
 * TOPページ
 */
const Page = ({
  searchParams: {
    page = 1,
    size = 27,
    sort = "createdAt",
    order = "desc",
    onlySelling,
  },
}: Props) => (
  <>
    <ItemSortContainer {...{ path: "/", sort, order, onlySelling }} />
    <PublicItemListContainer {...{ page, size, sort, order, onlySelling }} />
  </>
);

export default Page;
