"use client";

import { editItem } from "@/app/(contents)/(auth)/item/[itemId]/edit/_components/editItemForm/actions";
import { ItemsFormContents } from "@/features/itemsFormContents";
import { type ProductFormValues } from "@/features/itemsFormContents/types";
import { type FormState } from "@/ui/form";
import { SubmitButton } from "@/ui/form/SubmitButton";
import { useForm, type FormOptions } from "@/ui/form/hooks";
import { type Merge } from "@/utils/types";
import { type Tag } from "@prisma/client";

type EditItemFormProps = {
  /** 編集する商品ID */
  draftItemId: string;
  /** サジェストに使用するすべてのタグ */
  tags: Tag[];
  /** 編集する商品の初期値 */
  initialProductFormValues: FormState<Merge<ProductFormValues, { id: string }>>;
};

/**
 * 商品を登録するためのフォーム
 * @param param0.tags タグ
 * @returns form
 * @todo 商品編集フォームを無理やり下書きに割り当てているので、編集用関数と、初期値の型を作成する必要がある
 */
export const EditDraftItemForm = ({
  draftItemId,
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
      <input type="hidden" name="draftItemId" value={draftItemId} />
      <SubmitButton outline name="isPublic" value="false">
        更新する
      </SubmitButton>
      <SubmitButton name="isPublic" value="true">
        出品する
      </SubmitButton>
    </Form>
  );
};
