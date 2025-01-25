import { CheckBoxLink } from "@/ui/link/CheckBoxLink";
import { type Route } from "next";

type Props = {
  path: Route;
  sort: string;
  order: string;
  onlySelling?: boolean;
  query?: string;
};

/**
 * 販売中の商品のみ表示するかどうかをチェックボックスで切り替える
 */
export const OnlySellingCheckBox = ({
  path,
  sort,
  order,
  onlySelling,
  query,
}: Props) => {
  const checked = Boolean(onlySelling);
  const queryString = new URLSearchParams({
    sort,
    order,
    ...(query && { query }),
    ...(!checked && { onlySelling: "true" }),
  }).toString();
  const href = `${path}?${queryString}` as const;
  return <CheckBoxLink href={href} checked={checked} text="販売中のみ表示" />;
};
