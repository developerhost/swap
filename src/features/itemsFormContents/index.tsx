import { useCallback, useState, type ChangeEvent } from "react";

import {
  CONDITION,
  IS_SHIPPING_INCLUDED,
  PRICE_LIMIT,
  SHIPPING_DAYS,
  SHIPPING_ID,
  SHIPPING_METHOD,
} from "@/constants/item";
import { PriceInput } from "@/features/itemsFormContents/PriceInput";
import { ImageInput } from "@/features/itemsFormContents/imageInput";
import { ItemTagsInput } from "@/features/itemsFormContents/itemTags";
import { type ProductFormValues } from "@/features/itemsFormContents/types";
import { Input, Select } from "@/ui/form";
import { LimitInput, LimitTextarea } from "@/ui/form/inputs/LimitElements";
import { TitleUnderbar } from "@/ui/structure";
import { type Tag } from "@prisma/client";

type Props = ProductFormValues & {
  /** 選択された商品タグ */
  suggestedTags: Tag[];
};

/**
 * 商品の詳細情報と配送情報を入力するフォームのコンポーネント
 *
 * @param props コンポーネントのプロパティ
 * @returns 商品の詳細情報と配送情報を入力するフォームのエレメント
 */
export const ItemsFormContents = ({
  name,
  conditionCode,
  description,
  tags,
  suggestedTags,
  isShippingIncluded,
  shippingMethodCode,
  shippingDaysCode,
  shippingMethodCustom,
  price,
  imageURLs,
}: Props) => {
  const [isOther, setIsOther] = useState(false);
  const handleChange = useCallback(
    ({ currentTarget: { value } }: ChangeEvent<HTMLSelectElement>) => {
      const isOther = value === SHIPPING_ID.OTHER;
      if (!isOther) return;
      setIsOther(isOther);
    },
    [],
  );
  const convertedImageURLs = imageURLs.map((imageURL) => {
    if (typeof imageURL === "string") {
      // URLの場合
      return { url: imageURL };
    }
    return { file: imageURL, url: URL.createObjectURL(imageURL) };
  });
  return (
    <>
      <ImageInput
        labelText="出品画像(最大10枚)"
        required
        name="imageURLs"
        initialImages={convertedImageURLs}
      />
      <LimitInput
        labelText="商品名"
        maxLength={32}
        name="name"
        placeholder="商品名を入力してください"
        required
        defaultValue={name}
      />
      <TitleUnderbar title="商品の説明" />
      <Select
        labelText="商品の状態"
        options={CONDITION}
        name="conditionCode"
        required
        defaultValue={conditionCode}
      />
      <LimitTextarea
        labelText="商品の説明"
        name="description"
        placeholder={`内容、サイズ、ページ数、発行年月日、注意事項など\n\n例）2018年に制作した同人誌です。B5サイズで全30ページ。内容はファンタジー要素が満載で、読み応え抜群です。一部ページに軽微な折れがありますが、全体的に状態は良好です。お求めやすい価格で提供していますので、ぜひご検討ください。`}
        required
        maxLength={1000}
        rows={10}
        defaultValue={description}
      />
      <ItemTagsInput
        suggestedTags={suggestedTags}
        name="tags"
        selectedTags={tags}
      />
      <TitleUnderbar title="配送について" />
      <Select
        name="isShippingIncluded"
        labelText="配送料の負担"
        options={IS_SHIPPING_INCLUDED}
        required
        defaultValue={isShippingIncluded}
      />
      <Select
        name="shippingMethodCode"
        labelText="配送の方法"
        options={SHIPPING_METHOD}
        defaultValue={shippingMethodCode}
        required
        onChange={handleChange}
      />
      {isOther && (
        <Input
          name="shippingMethodCustom"
          labelText="配送の方法（その他）"
          type="text"
          placeholder="速達サービス"
          required
          defaultValue={shippingMethodCustom}
        />
      )}
      <Select
        name="shippingDaysCode"
        labelText="発送までの日数"
        options={SHIPPING_DAYS}
        required
        defaultValue={shippingDaysCode}
      />
      <PriceInput
        labelText={`販売価格(￥${new Intl.NumberFormat().format(
          PRICE_LIMIT.MIN,
        )}〜${new Intl.NumberFormat().format(PRICE_LIMIT.MAX)})`}
        name="price"
        required
        prefix="¥"
        defaultValue={price}
      />
    </>
  );
};
