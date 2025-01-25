import "server-only";

import { type ProductFormValues } from "@/features/itemsFormContents/types";
import { uploadToCloudinary } from "@/lib/cloudinary/upload";
import { failure, success, type Result } from "@/lib/result";
import { editItem, type ItemCreateInput } from "@/repositories/item";
import { strToBool } from "@/utils";
import { type Item } from "@prisma/client";

/**
 * File型の場合はCloudinaryにアップロードし、URLの配列を返す
 * 既にURLの配列の場合はそのまま返す
 * @param imageFiles 画像ファイルの配列
 * @returns 画像のURLの配列
 * @todo 画像のアップロードに失敗した場合のエラーハンドリング
 */
const processImageFiles = (imageFiles: Array<File | string>) => {
  if (imageFiles.every((file) => file instanceof File)) {
    return uploadToCloudinary(imageFiles as File[]);
  }
  return Promise.resolve(imageFiles as string[]);
};

/**
 * フォームの入力値を関数で扱える値に加工し、出品商品を編集する
 * @param formData フォームの入力値
 * @param userId 出品者ID
 * @param isPublicBool 公開するかどうか
 * @param previousPrice 価格変更前の価格
 * @returns 登録された商品のResult型
 */
export const editItemWithTagsAndImages = async (
  formData: Omit<
    ProductFormValues & { id: string },
    "verificationCode" | "isPublic"
  >,
  userId: string,
  isPublicBool: boolean,
  previousPrice: number | null = null,
): Promise<Result<Item>> => {
  const {
    tags,
    imageURLs: imageFiles,
    isShippingIncluded,
    shippingMethodCustom,
    price,
    ...rest
  } = formData;

  const item: ItemCreateInput & { id: string } = {
    previousPrice,
    isShippingIncluded: strToBool(isShippingIncluded),
    shippingMethodCustom: shippingMethodCustom ?? null,
    price: Number(price),
    isPublic: isPublicBool,

    ...rest,
  };

  try {
    if (imageFiles.length === 0) {
      return failure(); // 画像がない場合はここで処理を終了
    }
    const images = await processImageFiles(
      Array.isArray(imageFiles) ? imageFiles : [],
    );
    const tagTexts = tags.split(",").filter((tag) => tag.trim() !== "");
    const result = await editItem(userId, item, images, tagTexts);
    return success(result);
  } catch (error) {
    return failure();
  }
};
