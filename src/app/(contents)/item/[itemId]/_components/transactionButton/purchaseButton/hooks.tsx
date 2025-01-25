"use client";

import { isDevelopment } from "@/constants/environment";
import { useSetModal } from "@/ui/modal/modalProvider";
import { useFormSubmitModal } from "@/ui/modal/useFormSubmitModal";
import { H } from "@/ui/structure/H";
import { type Item } from "@prisma/client";
import { signIn } from "next-auth/react";
import { useCallback, type FormEvent } from "react";

/**
 * 購入ボタン用のモーダル
 * @param item 購入する出品オブジェクト
 * @param buyerId 購入するユーザーID
 * @returns 購入ボタンのモーダルを開く関数とモーダルのコンポーネント
 */
export const usePurchaseModal = (
  /** 購入する出品オブジェクト */
  { name, isShippingIncluded, price, id }: Item,
  /** 購入するユーザーID */
  buyerId: string | undefined,
) => {
  const handleSubmit = useCallback(
    async ({
      preventDefault,
      currentTarget: { submit },
    }: FormEvent<HTMLFormElement>) => {
      preventDefault();
      if (!buyerId) {
        await signIn();
        return;
      }
      submit();
    },
    [buyerId],
  );

  const { handleOpen, FormSubmitModal } = useFormSubmitModal(
    "https://pv-pay.com/service/credit/input.html",
    "購入",
    handleSubmit,
  );

  const PurchaseModal = useCallback(
    () => (
      <FormSubmitModal>
        <H className="text-center text-lg font-bold">購入の確認</H>
        <p className="py-2">この商品を購入してもよろしいですか？</p>
        <dl className="mb-4 grid grid-cols-2 gap-2 " role="alert">
          <dt>商品名</dt>
          <dd>{name}</dd>
          <dt>送料の情報</dt>
          <dd>{isShippingIncluded ? "送料込" : "着払"}</dd>
          <dt>購入価格</dt>
          <dd>{price}円</dd>
        </dl>
        <input type="hidden" name="Amount" value={price} />
        <input type="hidden" name="ItemId" value={id} />
        <input type="hidden" name="BuyerId" value={buyerId} />
        <input type="hidden" name="SiteId" value="76452001" />
        <input type="hidden" name="SitePass" value="kJ2ESCtT2I0f" />
        {isDevelopment && (
          <>
            <input type="hidden" name="mail" value="test@gmail.com" />
            <input type="hidden" name="cardYear" value="2025" />
            <input type="hidden" name="cardMonth" value="06" />
          </>
        )}
      </FormSubmitModal>
    ),
    [FormSubmitModal, name, isShippingIncluded, price, id, buyerId],
  );

  useSetModal(<PurchaseModal />);
  return handleOpen;
};
