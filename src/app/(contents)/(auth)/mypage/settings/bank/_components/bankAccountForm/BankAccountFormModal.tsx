"use client";

import { bankAccountFormAction } from "@/app/(contents)/(auth)/mypage/settings/bank/_components/actions";
import { getInitialValues } from "@/app/(contents)/(auth)/mypage/settings/bank/_components/bankAccountForm/utils";
import { BankFormContents } from "@/features/bankFormContents";
import { useForm } from "@/ui/form/hooks";
import { useFormActionModal } from "@/ui/modal";
import { useSetModal } from "@/ui/modal/modalProvider";
import { useCallback } from "react";

/**
 * 銀行口座登録用モーダル
 */
export const useBankAccountModal = () => {
  const initialValues = getInitialValues(null);
  const formOptions = {
    authenticationRequired: true,
    showToast: true,
  };
  const { register, action } = useForm(
    bankAccountFormAction,
    initialValues,
    formOptions,
  );
  const { handleOpen, FormActionModal } = useFormActionModal(action, "登録");

  const BankAccountModal = useCallback(
    () => (
      <FormActionModal>
        <BankFormContents register={register} />
      </FormActionModal>
    ),
    [register, FormActionModal],
  );

  useSetModal(<BankAccountModal />);

  return handleOpen;
};
