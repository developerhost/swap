import { Dialog as Component } from "@/ui/modal/dialog/components";
import { useCallback, useState, type ComponentProps } from "react";

type DialogProps = Omit<ComponentProps<typeof Component>, "isOpen" | "onClose">;

/**
 * ダイアログの開閉状態を管理するカスタムフック
 * @returns open, close, Dialog
 */
export const useDialog = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const Dialog: React.FC<DialogProps> = useCallback(
    (props: DialogProps) => (
      <Component isOpen={isOpen} onClose={handleClose} {...props} />
    ),
    [handleClose, isOpen],
  );

  return {
    /** dialogを開く関数 */
    handleOpen,
    /** dialogを閉じる関数 */
    handleClose,
    /** dialogを表示するコンポーネント */
    Dialog,
  };
};
