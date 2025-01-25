"use client";

import { editItem } from "@/app/(contents)/(auth)/item/[itemId]/edit/_components/editItemForm/actions";
import { ItemsFormContents } from "@/features/itemsFormContents";
import { type EditProductFormState } from "@/features/itemsFormContents/types";
import { SubmitButton } from "@/ui/form/SubmitButton";
import { useForm, type FormOptions } from "@/ui/form/hooks";
import { type Tag } from "@prisma/client";

type EditItemFormProps = {
  /** 編集する商品ID */
  itemId: string;
  /** サジェストに使用するすべてのタグ */
  tags: Tag[];
  /** 編集する商品の初期値 */
  initialProductFormValues: EditProductFormState;
};

/**
 * 商品を登録するためのフォーム
 * @param param0.tags タグ
 * @returns form
 */
export const EditItemForm = ({
  itemId,
  tags,
  initialProductFormValues,
}: EditItemFormProps) => {
  const formOptions: FormOptions = {
    authenticationRequired: true,
    shouldReset: true,
    showToast: true,
  };

  const {
    Form,
    state: { values },
  } = useForm(editItem, initialProductFormValues, formOptions);

  return (
    <Form className="grid grid-cols-2 gap-3 [&>*]:col-span-2 [&>button]:col-span-1">
      <ItemsFormContents {...{ ...values, suggestedTags: tags }} />
      <input type="hidden" name="id" value={itemId} />
      <SubmitButton outline name="isPublic" value="false">
        公開を停止する
      </SubmitButton>
      <SubmitButton name="isPublic" value="true">
        更新する
      </SubmitButton>
    </Form>
  );
};
