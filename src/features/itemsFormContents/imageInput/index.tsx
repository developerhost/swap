"use client";

import { isDevelopment } from "@/constants/environment";
import { ImagePreview } from "@/features/itemsFormContents/imageInput/components/ImagePreview";
import { useFileState } from "@/features/itemsFormContents/imageInput/hooks";
import { type FileWithURL } from "@/features/itemsFormContents/imageInput/types";
import { Label } from "@/ui/form/inputs/Label";
import { lazy, useId, useRef, type ComponentPropsWithoutRef } from "react";
import { BiSolidCamera } from "react-icons/bi";

const TestDataButton = lazy(
  () =>
    import(
      "@/features/itemsFormContents/imageInput/components/TestDataButton.develop"
    ),
);

type Props = Omit<
  ComponentPropsWithoutRef<"input">,
  "multiple" | "type" | "className" | "id"
> & {
  labelText?: string;
  initialImages?: FileWithURL[];
};

/**
 * 画像を選択するinputタグ
 * @returns div > (ul > li > ImagePreview) & label
 */
export const ImageInput = ({
  labelText,
  required,
  initialImages,
  ...props
}: Props) => {
  const id = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { files, getRootProps, getInputProps, handleRemove } = useFileState(
    initialImages ?? [],
    inputRef,
    id,
  );

  const labelClass = `flex items-center justify-center rounded-md border bg-white
${
  files?.length < 10
    ? "cursor-pointer gap-1 border-red-500 text-red-500 hover:bg-red-50"
    : "cursor-no-drop border-neutral-300 text-neutral-300"
}`;
  return (
    <div className="grid gap-2">
      {labelText && <Label required={required}>{labelText}</Label>}
      <ul className="grid grid-cols-3 gap-2">
        {files.map((image, i) => {
          const key =
            "file" in image && image.file !== undefined
              ? image.file.name
              : `url-${i}`;

          return (
            <li key={key} className="relative">
              <ImagePreview
                index={i}
                fileWithURL={image}
                onRemove={handleRemove}
              />
            </li>
          );
        })}
      </ul>
      <label className={labelClass} htmlFor={id}>
        <input
          type="file"
          multiple
          className="hidden"
          {...{ ...getInputProps(), ref: inputRef, id, ...props }}
        />
        <div
          {...getRootProps()}
          className="flex flex-row items-center justify-center gap-1 px-3 py-3.5"
        >
          <BiSolidCamera size={20} />
          <p className="font-bold">画像を選択する</p>
        </div>
      </label>
      {isDevelopment && (
        <TestDataButton
          className="fixed left-3 max-md:bottom-16 md:bottom-3"
          id={`${id}-test`}
        />
      )}
    </div>
  );
};
