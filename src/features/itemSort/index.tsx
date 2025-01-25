import { OnlySellingCheckBox } from "@/features/itemSort/_components/OnlySellingCheckBox";
import { SortDropdownMenu } from "@/features/itemSort/_components/SortDropdownMenu";
import { type Route } from "next";

type Props = {
  path: Route;
  sort: string;
  order: string;
  onlySelling?: boolean;
  query?: string;
};

/**
 * 商品一覧のsearchParamsを操作して並び替えと販売中のみ表示の切り替え機能を提供する
 */
export const ItemSortContainer = ({
  path,
  sort,
  order,
  onlySelling,
  query,
}: Props) => (
  <div className="flex w-full items-center justify-between px-0 sm:px-5">
    <OnlySellingCheckBox {...{ path, sort, order, onlySelling, query }} />
    <SortDropdownMenu {...{ path, sort, order, onlySelling }} />
  </div>
);
