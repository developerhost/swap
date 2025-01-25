"use client";

import { useCallback, useEffect, useRef, type ComponentProps } from "react";

import toast from "react-hot-toast";

import { type FormState } from "@/ui/form";
import { useVerify } from "@/ui/form/securityVerifier/hooks";

import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";

const useMessageToaster = <T,>(
  formState: FormState<T>,
  hasToaster: boolean,
) => {
  useEffect(() => {
    if (!hasToaster) return;
    if (!formState.result?.message) return;
    switch (formState.result.type) {
      case "error":
        toast.error(formState.result.message);
        break;
      case "success":
        toast.success(formState.result.message);
        break;
    }
  }, [formState.result, hasToaster]);
};

export type FormOptions = {
  /** フォーム送信後に初期化するかどうか */
  shouldReset?: boolean;
  /** 認証を行うかどうか */
  authenticationRequired?: boolean;
  /** トースト表示を行うかどうか */
  showToast?: boolean;
};

/**
 * フォームに定義されるべき実装を提供する    \
 * useFormStateをラップし、適用済みのフォームのコンポーネントと、その子要素に必要な値の登録用関数を返す
 * @param formAction Submit時に実行するform action関数
 * @param initialState フォームの初期状態
 * @param options フォームのオプション
 * @see https://react.dev/reference/react-dom/hooks/useFormState
 * @example src/app/(support)/inquiry/MailForm.tsx 参照
 */
export const useForm = <T extends Record<string, unknown>>(
  /** Submit時に実行するform action関数 */
  formAction: (s: FormState<T>, d: FormData) => Promise<FormState<T>>,
  /** フォームの初期状態 */
  initialState: FormState<T>,
  /** 付加機能を有効化する際に指定 */
  options: FormOptions = {},
) => {
  const [state, dispatch] = useFormState(formAction, initialState);
  const getVerificationCode = useVerify();
  const ref = useRef<HTMLFormElement>(null);
  const {
    shouldReset = false,
    authenticationRequired = false,
    showToast = false,
  } = options;

  useMessageToaster(state, showToast);

  const router = useRouter();
  if (state.redirect) {
    router.push(state.redirect);
  }

  const action = useCallback(
    async (f: FormData) => {
      if (authenticationRequired) {
        const verificationCode = await getVerificationCode();
        f.append("verificationCode", verificationCode);
      }
      dispatch(f);
      if (shouldReset) {
        ref.current?.reset();
      }
    },
    [authenticationRequired, dispatch, getVerificationCode, shouldReset],
  );

  const Form = useCallback(
    (props: Omit<ComponentProps<"form">, "action" | "ref">) => (
      <form {...{ action, ref }} {...props} />
    ),
    [action, ref],
  );

  const register = useCallback(
    <K extends keyof T>(key: K) => ({
      name: key,
      defaultValue: state.values[key],
    }),
    [state.values],
  );

  return {
    /** action適用済みのフォームのコンポーネント */
    Form,
    /**
     * フォーム配下の要素に必要なプロパティを登録するための関数
     * @param key フォームの値のキー
     * @returns inputなどの入力要素に登録するべきプロパティ
     */
    register,
    /** フォームのstateにアクセスする場合に使用 */
    state,
    /** Formを使用せずにactionを受け取りたい場合に使用 */
    action,
  };
};
