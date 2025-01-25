"use client";
import { memo, type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = ComponentProps<"button"> & {
  /** 折りたたまれている状態 */
  isCollapsed: boolean;
};

/**
 * もっと見ると折りたたむの切り替えボタン
 */
export const MoreLessButton = memo(
  ({ className, isCollapsed, ...props }: Props) => (
    <button
      className={twMerge(
        "cursor-pointer text-right text-blue-600 underline hover:text-blue-700",
        className,
      )}
      {...props}
    >
      {isCollapsed ? "もっと見る" : "折りたたむ"}
    </button>
  ),
);

MoreLessButton.displayName = "MoreLessButton";
