/* eslint-disable max-statements */
"use server";

import { redirect } from "next/navigation";

import {
  AddressFormSchema,
  type AddressFormState,
} from "@/features/addressFormContents/type";
import {
  ProductFormSchema,
  type ProductFormState,
} from "@/features/itemsFormContents/types";

import {
  createDraftItemWithTagsAndImages,
  createItemWithTagsAndImages,
} from "@/app/(contents)/(auth)/listing/_components/listingForm/utils";
import { MESSAGE } from "@/constants/messages";
import { PAGE_CONTENT, PAGE_LINK } from "@/constants/myPage";
import { logger } from "@/lib/logger";
import { upsertAddress } from "@/repositories/user/address";
import { verifyForm } from "@/ui/form/securityVerifier/verifyForm";
import { getFormValues } from "@/ui/form/utils";
import { getSessionUser, strToBool } from "@/utils";
import { revalidatePath } from "next/cache";

/**
 * フォームに入力された商品情報を登録し、完了後に確認ページにリダイレクトする
 * 不備がある場合はエラーメッセージを含んだ状態を返す
 * @param prevState 前の状態
 * @param formData FormData
 */
export const listingItem = async (
  prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> => {
  const values = getFormValues(formData, prevState.values);
  const previousPrice = null;
  const sessionUser = await getSessionUser();
  const userId = sessionUser?.id;
  const { verificationCode, isPublic, ...rest } = values;
  const isPublicBool = strToBool(isPublic);

  if (!userId) {
    logger.debug("userId is not found");
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
    logger.debug("verification failed");
    return {
      ...prevState,
      result: {
        message: verifyResult.error,
        type: "error",
      },
    };
  }

  if (!isPublicBool) {
    const draftResult = await createDraftItemWithTagsAndImages(
      rest,
      userId,
      previousPrice,
    );

    if (draftResult.isFailure) {
      logger.error("failed to create draft item");
      return {
        ...prevState,
        result: {
          message: "下書きの登録に失敗しました",
          type: "error",
        },
      };
    }

    redirect(PAGE_LINK[PAGE_CONTENT.DRAFTS]);
  }

  const validated = ProductFormSchema.safeParse(values);
  if (!validated.success) {
    logger.info("form validation failed");
    const message = validated.error.errors[0]?.message;
    return {
      ...prevState,
      result: message ? { message, type: "error" } : undefined,
    };
  }

  const itemResult = await createItemWithTagsAndImages(
    rest,
    userId,
    previousPrice,
  );

  if (itemResult.isFailure && !prevState.values.imageURLs.length) {
    logger.info("no image is added");
    return {
      ...prevState,
      result: {
        message: "最低一枚画像を追加してください",
        type: "error",
      },
    };
  }

  if (itemResult.isFailure) {
    logger.error("failed to create item");
    return {
      ...prevState,
      result: {
        message: "商品の登録に失敗しました",
        type: "error",
      },
    };
  }

  logger.info("item created successfully");
  redirect(`/listing/complete?item_id=${itemResult.value.id}&is_public=true`);
};

/**
 * フォームに入力された住所情報を登録する
 * 不備がある場合はエラーメッセージを含んだ状態を返す
 * @param prevState 前の状態
 * @param formData FormData
 */
export const addressFormAction = async (
  prevState: AddressFormState,
  formData: FormData,
): Promise<AddressFormState> => {
  const values = getFormValues(formData, prevState.values);
  const sessionUser = await getSessionUser();
  const userId = sessionUser?.id;
  const { verificationCode, ...rest } = values;

  if (!userId) {
    return {
      ...prevState,
      result: {
        message: MESSAGE.ERROR.SESSION_TIMEOUT,
        type: "error",
      },
    };
  }

  const result = await verifyForm(verificationCode);
  if (result.isFailure) {
    return {
      ...prevState,
      result: {
        message: result.error,
        type: "error",
      },
    };
  }

  const validated = AddressFormSchema.safeParse(values);
  if (!validated.success) {
    const message = validated.error.errors[0]?.message;
    return {
      ...prevState,
      result: message ? { message, type: "error" } : undefined,
    };
  }
  const address = await upsertAddress(userId, rest);
  if (!address) {
    return {
      ...prevState,
      result: {
        message: MESSAGE.ERROR.REGISTRATION_FAILED,
        type: "error",
      },
    };
  }
  revalidatePath("/listing");
  // TODO: revalidate時になぜかモーダルが閉じないため、useCloseOnSuccessModal側で閉じる処理を記載している。
  // 成功したときのみ閉じてほしいため、要調査

  return {
    ...prevState,
    result: {
      message: MESSAGE.SUCCESS.RENEW_ADDRESS,
      type: "success",
    },
  };
};
