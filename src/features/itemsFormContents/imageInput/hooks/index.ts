import { isDevelopment } from "@/constants/environment";
import {
  addFileWithPreview,
  fetchImageAndConvertToFile,
  reduceImageQuality,
} from "@/features/itemsFormContents/imageInput/hooks/utils";
import { type FileWithURL } from "@/features/itemsFormContents/imageInput/types";
import {
  useCallback,
  useEffect,
  useState,
  type MutableRefObject,
  type SetStateAction,
} from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

/**
 * 開発時にフォームにダミーの画像を取得して追加するイベントリスナーを登録する
 * @param id input要素のid
 * @param files ファイルの状態
 * @param setFiles ファイルの状態を更新する関数
 */
const useSetDummyImageListener = (
  id: string,
  files: FileWithURL[],
  setFiles: (value: SetStateAction<FileWithURL[]>) => void,
) => {
  useEffect(() => {
    const handleClick = async ({ target }: MouseEvent) => {
      if (files.length < 10) {
        if (target instanceof HTMLButtonElement && target.id === `${id}-test`) {
          const file = await fetchImageAndConvertToFile();
          setFiles((previousFiles) => [
            ...previousFiles,
            {
              file,
              url: URL.createObjectURL(file),
            },
          ]);
        }
      }
    };
    if (isDevelopment) {
      document.addEventListener("click", handleClick);
    }
    return () => {
      if (isDevelopment) {
        document.removeEventListener("click", handleClick);
      }
    };
  }, [files, id, setFiles]);
};

/**
 * ファイルの状態を管理するロジック
 * 初期状態とinput要素の参照を受け取り、ファイルの状態と操作用関数を返す
 * @param initialState 初期状態
 * @param inputRef input要素の参照
 * @param id input要素のid
 */
export const useFileState = (
  initialState: FileWithURL[],
  inputRef: MutableRefObject<HTMLInputElement | null>,
  id: string,
) => {
  const [files, setFiles] = useState<FileWithURL[]>(initialState);

  const onDrop = useCallback(async (droppedFiles: File[]) => {
    const convertResults = await Promise.all(
      droppedFiles.map(reduceImageQuality),
    );

    const errors = convertResults.filter((result) => result.isFailure);
    if (errors.length > 0) {
      toast.error("画像の変換に失敗しました。別の画像をお試しください。");
      return;
    }

    const successResults = convertResults.map((result) => {
      if (result.isSuccess) {
        return result.value;
      }
      throw new Error("unreachable");
    });
    setFiles((prevFiles) => addFileWithPreview(prevFiles, successResults, 10));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "image/heic": [],
      "image/heif": [],
    },
    multiple: true,
    noClick: true,
  });

  // アンマウント時に画像のプレビューを削除してメモリリークを防ぐ
  useEffect(() => () => files.forEach((file) => URL.revokeObjectURL(file.url)));

  // 開発用イベントリスナーを登録
  useSetDummyImageListener(id, files, setFiles);

  // inputタグに選択されたすべての画像を追加する
  useEffect(() => {
    const dataTransfer = new DataTransfer();
    files.forEach((image) => {
      if ("file" in image && image.file !== undefined) {
        dataTransfer.items.add(image.file);
      }
    });
    if (inputRef.current) {
      inputRef.current.files = dataTransfer.files;
    }
  }, [files, inputRef]);

  const handleRemove = useCallback((index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  }, []);

  return {
    /** ファイルの状態 */
    files,
    /** ドロップゾーンのプロパティ */
    getRootProps,
    /** input要素のプロパティ */
    getInputProps,
    /** 画像を削除する関数 */
    handleRemove,
  };
};
