import { DropdownContainer, DropdownItem } from "@/ui/dropdownMenu";
import { type Route } from "next";
import Link from "next/link";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";

const getCurrentSort = (sort: string, order: string) => {
  if (sort === "likes") {
    return menuBase.likes.text;
  }
  if (sort === "price" && order === "desc") {
    return menuBase.priceDesc.text;
  }
  if (sort === "price" && order === "asc") {
    return menuBase.priceAsc.text;
  }
  return menuBase.new.text;
};

const menuBase = {
  new: { text: "新しい順", params: { sort: "createdAt", order: "desc" } },
  likes: { text: "いいね順", params: { sort: "likes", order: "desc" } },
  priceDesc: { text: "価格の高い順", params: { sort: "price", order: "desc" } },
  priceAsc: { text: "価格の安い順", params: { sort: "price", order: "asc" } },
} as const satisfies Record<
  string,
  { text: string; params: { sort: string; order: string } }
>;

type Props = {
  path: Route;
  sort: string;
  order: string;
  onlySelling?: boolean;
  query?: string;
};

/**
 * 商品一覧の並び替えドロップダウンメニュー
 * 並び替えに必要な現在のパスとクエリを受け取り、Linkを生成する
 */
export const SortDropdownMenu = ({
  path,
  sort,
  order,
  onlySelling,
  query,
}: Props) => {
  const currentSort = getCurrentSort(sort, order);

  const menuItems = Object.entries(menuBase).map(([key, { text, params }]) => {
    const queryString = new URLSearchParams({
      ...params,
      ...(query && { query }),
      ...(onlySelling && { onlySelling: "true" }),
    }).toString();
    const href = `${path}?${queryString}` as const;
    return (
      <Link key={key} href={href}>
        {text}
      </Link>
    );
  });

  const SortIcon = order === "asc" ? FaArrowUpLong : FaArrowDownLong;

  return (
    <DropdownContainer>
      <DropdownItem {...{ menuItems }}>
        <div className="flex items-center gap-1 whitespace-nowrap">
          <SortIcon size={16} />
          {currentSort}
        </div>
      </DropdownItem>
    </DropdownContainer>
  );
};
