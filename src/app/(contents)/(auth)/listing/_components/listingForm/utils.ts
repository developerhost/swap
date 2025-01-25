import { type ProductFormValues } from "@/features/itemsFormContents/types";
import { uploadToCloudinary } from "@/lib/cloudinary/upload";
import { failure, success, type Result } from "@/lib/result";
import {
  createDraftItem,
  type DraftItemCreateInput,
} from "@/repositories/draftItem";
import { createItem, type ItemCreateInput } from "@/repositories/item";
import { strToBool } from "@/utils";
import { type DraftItem, type Item } from "@prisma/client";

/**
 * imageFilesの型に基づいて適切な処理を行う
 * @param imageFiles 画像ファイルまたはURLの配列
 * @returns 画像のURLの配列
 */
const processImages = async (
  imageFiles: File[] | string[],
): Promise<string[]> => {
  if (imageFiles.length > 0) {
    return await uploadToCloudinary(imageFiles as File[]);
  }
  return Promise.resolve(imageFiles as string[]);
};

/**
 * フォームの入力値を関数で扱える値に加工し、出品商品を登録する
 * @param formData フォームの入力値
 * @param userId 出品者ID
 * @param previousPrice 価格変更前の価格
 * @returns 登録された商品のResult型
 */
export const createItemWithTagsAndImages = async (
  formData: Omit<ProductFormValues, "verificationCode" | "isPublic">,
  userId: string,
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
  const item: ItemCreateInput = {
    previousPrice,
    isShippingIncluded: strToBool(isShippingIncluded),
    shippingMethodCustom: shippingMethodCustom ?? null,
    price: Number(price),
    ...rest,
  };
  try {
    if (imageFiles.length === 0) {
      return failure(); // 画像がない場合はここで処理を終了
    }
    const images = await processImages(imageFiles);
    const tagTexts = tags.split(",").filter((tag) => tag.trim() !== "");
    const result = await createItem(userId, item, images, tagTexts);
    return success(result);
  } catch (error) {
    return failure();
  }
};

/**
 * フォームの入力値を関数で扱える値に加工し、下書き商品を登録する
 * @param formData フォームの入力値
 * @param userId 出品者ID
 * @param previousPrice 価格変更前の価格
 * @returns 登録された下書き商品のResult型
 */
export const createDraftItemWithTagsAndImages = async (
  formData: Omit<ProductFormValues, "verificationCode" | "isPublic">,
  userId: string,
  previousPrice: number | null = null,
): Promise<Result<DraftItem>> => {
  const {
    tags,
    imageURLs: imageFiles,
    isShippingIncluded,
    shippingMethodCustom,
    price,
    ...rest
  } = formData;
  const draftItem: DraftItemCreateInput = {
    previousPrice,
    isShippingIncluded: strToBool(isShippingIncluded),
    shippingMethodCustom: shippingMethodCustom ?? null,
    price: Number(price),
    ...rest,
  };
  try {
    const images = await processImages(imageFiles);
    const tagTexts = tags.split(",").filter((tag) => tag.trim() !== "");
    const result = await createDraftItem(userId, draftItem, images, tagTexts);
    return success(result);
  } catch (error) {
    return failure();
  }
};
