"use client";

import { useCallback } from "react";

import { useSetModal } from "@/ui/modal/modalProvider";

import { type Address } from "@prisma/client";

import { addressFormAction } from "@/app/(contents)/(auth)/listing/_components/listingForm/actions";
import { getInitialValues } from "@/app/(contents)/(auth)/mypage/settings/address/_components/addressForm/utils";
import { AddressFormContents } from "@/features/addressFormContents";
import { TextLink } from "@/ui";
import { useForm, type FormOptions } from "@/ui/form/hooks";
import { useCloseOnSuccessModal } from "@/ui/modal/useFormActionModal";
import { Section } from "@/ui/structure";
import { H } from "@/ui/structure/H";

/**
 * 住所未登録の場合に表示する登録用モーダル
 * @param address 住所
 * @param userName ユーザー名
 * @returns 購入ボタンのモーダルを開く関数とモーダルのコンポーネント
 */
export const useAddressModal = (
  address: Omit<Address, "id" | "userId"> | null,
  userName: string,
) => {
  const initialValues = getInitialValues(address, userName);
  const formOptions: FormOptions = {
    authenticationRequired: true,
    showToast: true,
  };
  const { register, action } = useForm(
    addressFormAction,
    initialValues,
    formOptions,
  );
  const { handleOpen, CloseOnSuccessModal } = useCloseOnSuccessModal(
    action,
    "更新",
  );

  const AddressModal = useCallback(
    () => (
      <CloseOnSuccessModal>
        <Section>
          <H className="text-xl font-bold">初めての出品ですか？</H>
          <p>取引を始めるには、住所の入力を行いましょう！</p>
          <TextLink href="/privacy-policy" className="text-xs">
            プライバシーポリシー
          </TextLink>
          <AddressFormContents register={register} />
        </Section>
      </CloseOnSuccessModal>
    ),
    [register, CloseOnSuccessModal],
  );

  useSetModal(<AddressModal />);
  return handleOpen;
};
