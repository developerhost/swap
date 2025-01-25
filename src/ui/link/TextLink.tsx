import { type ComponentProps } from "react";

import Link from "next/link";
import { twMerge } from "tailwind-merge";

type TextLinkProps = ComponentProps<typeof Link>;

/**
 * next/linkのラッパー
 * 外部リンクを開く場合はtarget="_blank"を付与する
 * @returns TextLink
 */
export const TextLink = ({
  href,
  children,
  className,
  ...props
}: TextLinkProps) => {
  const target = String(href).startsWith("http") ? "_blank" : undefined;
  return (
    <Link
      href={href}
      className={twMerge(
        "text-blue-500 underline hover:text-blue-600",
        className,
      )}
      target={target}
      {...props}
    >
      {children}
    </Link>
  );
};
