"use client";

import { type FileWithURL } from "@/features/itemsFormContents/imageInput/types";
import { useImageModal } from "@/ui/modal";
import Image from "next/image";
import { useCallback } from "react";
import { FaTimes } from "react-icons/fa";

type Props = {
  /** プレビューする画像ファイルとそのURL */
  fileWithURL: FileWithURL;
  /** 画像のインデックス */
  index: number;
  /** 画像を削除する関数 */
  onRemove: (index: number) => void;
};

/**
 * 画像をプレビュー表示する
 */
export const ImagePreview = ({ fileWithURL, index, onRemove }: Props) => {
  const { handleOpen } = useImageModal(fileWithURL.url);
  const handleRemove = useCallback(() => onRemove(index), [index, onRemove]);
  return (
    <div className="relative w-fit">
      <button
        type="button"
        className="absolute -right-2 -top-2 z-10 flex size-6 items-center justify-center rounded-full bg-zinc-700 opacity-75"
        onClick={handleRemove}
      >
        <FaTimes color="white" />
      </button>
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={fileWithURL.url}
          alt={fileWithURL.file?.name || "画像"}
          width={200}
          height={200}
          onClick={handleOpen}
        />
      </div>
    </div>
  );
};
