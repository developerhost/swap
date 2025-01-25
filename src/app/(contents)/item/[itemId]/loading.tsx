import { LikeButtonRenderer } from "@/app/(contents)/item/[itemId]/_components/likeButton/LikeButtonRenderer";
import { TitleUnderbar } from "@/ui/structure";
import { FaEllipsisVertical, FaEye } from "react-icons/fa6";

/**
 * 商品ページのスケルトン
 */
const ItemSkeleton = () => (
  <div className="flex w-full animate-pulse flex-col gap-4">
    <div className="h-[70vh] bg-slate-700" />
    <div className="h-7 bg-slate-700" />
    <div className="grid grid-cols-12 grid-rows-2 items-center justify-between gap-y-4">
      <div className="col-span-11 h-12 bg-slate-700" />
      <div className="col-span-1 p-2">
        <FaEllipsisVertical size="1.5rem" />
      </div>
      <LikeButtonRenderer className="col-span-3" isLiked={false} loading />
      <div className="col-span-3 flex items-center justify-center">
        <FaEye size="2rem" />
      </div>
      <div className="col-span-6 h-12 rounded-md bg-slate-700" />
    </div>
    <TitleUnderbar title="説明" />
    <div className="h-14 bg-slate-700" />
    <TitleUnderbar title="商品情報" />
    <div className="h-80 bg-slate-700" />
    <TitleUnderbar title="コメント" />
    <div className="h-20 bg-slate-700" />
    <div className="flex justify-end">
      <div className="h-12 w-40 rounded-md bg-slate-700" />
    </div>
  </div>
);

export default ItemSkeleton;
