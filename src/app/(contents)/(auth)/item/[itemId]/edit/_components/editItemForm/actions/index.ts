"use server";

import { redirect } from "next/navigation";

import { editItemWithTagsAndImages } from "@/app/(contents)/(auth)/item/[itemId]/edit/_components/editItemForm/actions/utils";
import { MESSAGE } from "@/constants/messages";
import { PAGE_CONTENT, PAGE_LINK } from "@/constants/myPage";
import {
  ProductFormSchema,
  type EditProductFormState,
} from "@/features/itemsFormContents/types";
import { verifyForm } from "@/ui/form/securityVerifier/verifyForm";
import { getFormValues } from "@/ui/form/utils";
import { getSessionUser, strToBool } from "@/utils";

/**
 * フォームに入力された商品情報で編集する
 * 不備がある場合はエラーメッセージを含んだ状態を返す
 * @param prevState 前の状態
 * @param formData FormData
 */
export const editItem = async (
  prevState: EditProductFormState,
  formData: FormData,
): Promise<EditProductFormState> => {
  const values = getFormValues(formData, prevState.values);
  const previousPrice = null;
  const sessionUser = await getSessionUser();
  const userId = sessionUser?.id;
  const { verificationCode, isPublic, ...rest } = values;
  const isPublicBool = strToBool(isPublic);

  if (!userId) {
    return {
      ...prevState,
      result: {
        message: MESSAGE.ERROR.SESSION_TIMEOUT,
        type: "error",
      },
    };
  }

  const verifyResult = await verifyForm(verificationCode);
  if (verifyResult.isFailure) {
    return {
      ...prevState,
      result: {
        message: verifyResult.error,
        type: "error",
      },
    };
  }

  if (!isPublicBool) {
    const draftResult = await editItemWithTagsAndImages(
      rest,
      userId,
      isPublicBool,
      previousPrice,
    );

    if (draftResult.isFailure) {
      return {
        ...prevState,
        result: {
          message: MESSAGE.ERROR.REGISTRATION_FAILED,
          type: "error",
        },
      };
    }

    redirect(PAGE_LINK[PAGE_CONTENT.SUSPENDED]);
  } else {
    const validated = ProductFormSchema.safeParse(values);
    if (!validated.success) {
      return {
        ...prevState,
        result: {
          message: validated.error.errors[0]?.message ?? "",
          type: "error",
        },
      };
    }

    const itemResult = await editItemWithTagsAndImages(
      rest,
      userId,
      isPublicBool,
      previousPrice,
    );

    if (itemResult.isFailure) {
      return {
        ...prevState,
        result: {
          message: MESSAGE.ERROR.REGISTRATION_FAILED,
          type: "error",
        },
      };
    }

    redirect(`/item/${itemResult.value.id}`);
  }
};
