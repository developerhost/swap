"use client";

import { requestFormAction } from "@/app/(contents)/(auth)/mypage/earning/withdrawal/request/_components/requestForm/actions";
import { type RequestFormValues } from "@/app/(contents)/(auth)/mypage/earning/withdrawal/request/_components/requestForm/type";
import { getInitialValues } from "@/app/(contents)/(auth)/mypage/earning/withdrawal/request/_components/requestForm/utils";
import { BankFormContents } from "@/features/bankFormContents";
import { Input } from "@/ui/form";
import { SubmitButton } from "@/ui/form/SubmitButton";
import { useForm, type FormOptions } from "@/ui/form/hooks";
import React from "react";

type Props = {
  /** フォームの初期値 */
  request: RequestFormValues | null;
  /** 売上残高を表示するコンポーネント */
  children: React.ReactNode;
};

/**
 * 出金申請に必要な情報を入力するフォーム
 * @returns form > Input, Select, SubmitButton
 */
export const RequestForm = ({ request, children }: Props) => {
  const initialValues = getInitialValues(request);
  const formOptions: FormOptions = {
    authenticationRequired: true,
    showToast: true,
  };
  const { Form, register } = useForm(
    requestFormAction,
    initialValues,
    formOptions,
  );

  return (
    <Form className="grid gap-3">
      <BankFormContents register={register} />
      {children}
      <Input
        labelText="出金額"
        placeholder="最低出金額は¥1,000からです"
        {...register("withdrawalAmount")}
      />
      <SubmitButton>申請する</SubmitButton>
    </Form>
  );
};
