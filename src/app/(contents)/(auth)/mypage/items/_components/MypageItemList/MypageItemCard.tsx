import { type ListingContentValue } from "@/constants/myPage";
import { SoldoutBadge } from "@/features/soldoutBadge";
import { parseFixedDateTime } from "@/utils/timeParser";
import { type Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { GoClock } from "react-icons/go";

/** 商品一覧ページのカードが表示に必要としているプロパティ */
export type ItemCardRequired = {
  id: string;
  images: { imageURL: string }[];
  name: string | null;
  createdAt: Date;
  transaction?: { purchaseDate: Date | null } | null;
};

const normal = (id: string) => `/item/${id}` as const;

/** 商品の状態によってURLを変える */
const URLtype = {
  drafts: (id: string) => `/draft/${id}/edit`,
  suspended: (id: string) => `/item/${id}/edit`,
  "browsing-history": normal,
  likes: normal,
  "sell-in-progress": normal,
  "buy-in-progress": normal,
  purchases: normal,
  sold: normal,
  listings: normal,
} as const satisfies Record<
  ListingContentValue,
  (
    id: string,
  ) => Route<
    `/item/${string}` | `/draft/${string}/edit` | `/item/${string}/edit`
  >
>;

type Props = {
  /** findItems の配列1個分 */
  item: ItemCardRequired;
  /** 商品の状態 */
  type?: ListingContentValue;
};

/**
 * 商品の情報を表示するコンポーネント
 * @param  item 表示に必要なリレーション先をインクルード済みのItem
 * @returns a > div
 */
export const MypageItemCard = ({ item, type = "listings" }: Props) => {
  const { id, images, name, createdAt, transaction } = item;
  const date = transaction?.purchaseDate ?? createdAt;
  const isSoldOut = Boolean(transaction);

  const thumbnailURL = images?.[0]?.imageURL;
  const href = URLtype[type](id);
  return (
    <Link
      href={href}
      className="grid cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-gray-200 py-2"
    >
      {thumbnailURL && (
        <div className="relative size-[calc((100vw-1.5rem)/4)] sm:size-36">
          <Image
            src={thumbnailURL}
            alt={name ?? "サムネイル画像"}
            sizes="256px"
            className="rounded"
            fill
          />
          {isSoldOut && (
            <SoldoutBadge
              className="flex size-10 rounded-tl"
              spanClassName="p-1.5 text-[0.6rem]"
            />
          )}
        </div>
      )}
      <div className="grid grid-cols-[auto_1fr] gap-2">
        <span className="col-span-2 truncate">{name}</span>
        {date && (
          <>
            <GoClock size={18} />
            <span className="text-xs text-gray-400">
              {parseFixedDateTime(date)}
            </span>
          </>
        )}
      </div>
      <FiChevronRight size={36} />
    </Link>
  );
};
