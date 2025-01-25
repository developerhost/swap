import { useCallback, useRef, type FormEvent, type ReactNode } from "react";

import { SubmitButton } from "@/ui/form/SubmitButton";
import { useDialog } from "@/ui/modal/dialog";

type useFormSubmitModalResult = {
  /** モーダルを開く関数 */
  handleOpen: () => void;
  /** モーダルを表示するコンポーネント */
  FormSubmitModal: ({ children }: { children: ReactNode }) => JSX.Element;
};

/**
 * 何らかの動作をするかどうかの確認用モーダルを表示するためのフック
 * @param url 送信先のURL
 * @param actionText 実行ボタンのテキスト
 * @param onSubmit フォームの送信時に実行する関数
 * @returns handleOpen,  FormActionModal
 */
export const useFormSubmitModal = (
  url: string,
  actionText: string = "実行する",
  onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>,
): useFormSubmitModalResult => {
  const { handleOpen, handleClose, Dialog } = useDialog();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      await onSubmit(event);
      handleClose();
    },
    [onSubmit, handleClose],
  );

  const FormSubmitModal = useCallback(
    ({ children }: { children: ReactNode }) => (
      <Dialog>
        <div className="modal-box mx-auto">
          <button
            className="btn btn-circle btn-ghost btn-md absolute right-2 top-2"
            onClick={handleClose}
          >
            ✕
          </button>
          <form
            className="flex flex-col gap-4"
            action={url}
            onSubmit={handleSubmit}
            ref={formRef}
            method="POST"
          >
            {children}
            <SubmitButton className="btn-error">{actionText}</SubmitButton>
          </form>
        </div>
      </Dialog>
    ),
    [Dialog, actionText, handleClose, url, handleSubmit],
  );

  return { handleOpen, FormSubmitModal };
};
