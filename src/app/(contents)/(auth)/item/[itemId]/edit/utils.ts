import { type ProductFormValues } from "@/features/itemsFormContents/types";
import { type ItemReadResult } from "@/repositories/item";
import { type FormState } from "@/ui/form";
import { type Merge } from "@/utils/types";

/**
 * 商品データから必要な値を取り出してフォームの初期値を生成する
 * @param item 商品
 */
export const convertItemToFormValues = (
  item: ItemReadResult,
): FormState<
  Merge<
    ProductFormValues,
    {
      id: string;
    }
  >
> => {
  const {
    price,
    isShippingIncluded,
    shippingMethodCustom,
    images,
    tags: tags_,
    isPublic,
    conditionCode,
    shippingDaysCode,
    shippingMethodCode,
    description,
    name,
    id,
  } = item;

  const imageURLs = images.map((image: { imageURL: string }) => image.imageURL);

  const tags = tags_.map((t) => t.tag.text).join(",");

  return {
    values: {
      price: `${price}`,
      isShippingIncluded: `${isShippingIncluded}`,
      isPublic: `${isPublic}`,
      shippingMethodCustom: `${shippingMethodCustom}`,
      // @ts-expect-error 型のエラーが出るので修正予定
      imageURLs,
      tags,
      verificationCode: "",
      id,
      description,
      name,
      conditionCode,
      shippingDaysCode,
      shippingMethodCode,
    },
  };
};
