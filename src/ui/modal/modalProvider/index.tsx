"use client";

import { atom, useAtomValue, useSetAtom } from "jotai";
import { memo, useCallback, useLayoutEffect } from "react";

type ModalAtom = ReturnType<typeof atom<JSX.Element>>;

const modalAtomsAtom = atom<ModalAtom[]>([]);

const AtomModal = memo(({ atom }: { atom: ModalAtom }) => useAtomValue(atom));

AtomModal.displayName = "AtomModal";

/**
 * グローバルステートに登録されたモーダルを描画するコンポーネントを返すRender Hooks
 */
export const useModalContainer = () => {
  const modalsAtom = useAtomValue(modalAtomsAtom);
  const Modals = useCallback(
    () => (
      <>
        {modalsAtom.map((modalAtom, i) => (
          <AtomModal key={i} atom={modalAtom} />
        ))}
      </>
    ),
    [modalsAtom],
  );

  return Modals;
};

/**
 * モーダル呼び出し用コンポーネントをグローバルステートに登録する    \
 * モーダルのクリックは初期描画終了後にしか行われないため、useLayoutEffectを利用して登録する
 * @param Modal モーダルのコンポーネント
 */
export const useSetModal = (Modal: JSX.Element): void => {
  const setModal = useSetAtom(modalAtomsAtom);
  useLayoutEffect(() => {
    setModal((prev) => [...prev, atom(Modal)]);
    return () => {
      setModal((prev) => prev.slice(0, -1));
    };
  }, [Modal, setModal]);
};
