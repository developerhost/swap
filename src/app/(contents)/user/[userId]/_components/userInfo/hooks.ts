import { useEffect, useState } from "react";

/**
 * 要素からはみ出ているかを判定するカスタムフック
 * @param ref 要素の参照
 */
export const useIsOverflowHidden = (ref: React.RefObject<HTMLElement>) => {
  const [isOverflowHidden, setIsOverflowHidden] = useState(false);

  useEffect(() => {
    const updateIsOverflowHidden = () => {
      if (ref.current) {
        const { scrollHeight, clientHeight } = ref.current;
        setIsOverflowHidden(scrollHeight > clientHeight);
      }
    };

    updateIsOverflowHidden();

    window.addEventListener("resize", updateIsOverflowHidden);

    return () => {
      window.removeEventListener("resize", updateIsOverflowHidden);
    };
  }, [ref]);

  return isOverflowHidden;
};
