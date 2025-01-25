"use client";

import { useDescriptionHeight } from "@/app/(contents)/item/[itemId]/_components/itemDescription/hooks";
import { MoreLessButton } from "@/ui/buttons/moreLessButton";
import { Card } from "@/ui/card";
import { useCallback, useReducer, useRef } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  /** 商品の説明文 */
  description: string | null;
};

/**
 * 商品説明を表示する
 * 要素が160pxを超える場合は折りたたむ
 */
export const ItemDescription = ({ description }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const height = useDescriptionHeight(ref);
  const shouldCollapseDescription = height > 160;
  const [isCollapsed, toggleCollapsed] = useReducer((prev) => !prev, true);
  const collapseClass = isCollapsed ? "line-clamp-6" : "";

  const handleToggleDescription = useCallback(() => {
    toggleCollapsed();
    if (!isCollapsed) {
      const element = ref.current;
      element?.scrollIntoView();
    }
  }, [isCollapsed]);

  return (
    <Card
      ref={ref}
      className={twMerge("grid w-full gap-4", isCollapsed && "max-h-56")}
    >
      <p
        className={twMerge("text-gray-600 whitespace-pre-wrap", collapseClass)}
      >
        {description ?? "説明がありません。"}
      </p>
      {shouldCollapseDescription && (
        <MoreLessButton
          isCollapsed={isCollapsed}
          onClick={handleToggleDescription}
        />
      )}
    </Card>
  );
};
