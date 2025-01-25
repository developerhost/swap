import { addGrayBackground } from "@/features/itemsFormContents/imageInput/hooks/addGrayBackground";
import { type FileWithURL } from "@/features/itemsFormContents/imageInput/types";
import { failure, success, type Result } from "@/lib/result";

/**
 * ダミーの画像を取得する
 */
export const fetchImageAndConvertToFile = async (): Promise<File> => {
  const response = await fetch("https://picsum.photos/200/200");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const blob = await response.blob();
  return new File([blob], `image-${Math.floor(Math.random() * 100000)}.jpg`, {
    type: blob.type,
  });
};

/**
 * 拡張子を小文字で抽出する
 * @param file ファイル
 */
const extractFileExtension = (file: File): string => {
  const fileName = file.name;
  const lastDotIndex = fileName.lastIndexOf(".");
  if (lastDotIndex !== -1) {
    return fileName.slice(lastDotIndex + 1).toLowerCase();
  }
  return "";
};

/**
 * HEICまたはHEIFファイルをJPEGに変換する
 * @param file HEICファイル
 */
const heicToJpeg = async (file: File): Promise<Result<File>> => {
  const heic2any = (await import("heic2any")).default; // 重いためHEICが必要な場合のみimportする
  const output = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: 0.7,
  });
  const outputBlob = Array.isArray(output) ? output[0] : output;
  if (!outputBlob) return failure();

  const newName = `${file.name.replace(/\.(heic|heif)$/i, "")}.jpg`;
  return success(
    new File([outputBlob], newName, {
      type: "image/jpeg",
    }),
  );
};

/**
 * ドロップされたファイルの画質を下げてサイズを小さくする
 * @param file ドロップされたファイル
 */
export const reduceImageQuality = async (
  file: File,
): Promise<Result<FileWithURL>> => {
  const ext = extractFileExtension(file);
  if (ext === "heic" || ext === "heif") {
    const convertResult = await heicToJpeg(file);
    if (convertResult.isFailure) {
      return convertResult;
    }
    const grayBackgroundFile = await addGrayBackground(convertResult.value);
    return success({
      file: grayBackgroundFile,
      url: URL.createObjectURL(grayBackgroundFile),
    });
  }

  const grayBackgroundFile = await addGrayBackground(file);
  return success({
    file: grayBackgroundFile,
    url: URL.createObjectURL(grayBackgroundFile),
  });
};

/**
 * 既存のファイルと新しいファイルを結合する
 * 既存のファイルが最大数を超える場合は、新しいファイルを追加しない
 * @param existingFiles 既存のファイル
 * @param newFiles 追加するファイル
 * @param maxFiles 最大ファイル数
 */
export const addFileWithPreview = (
  existingFiles: FileWithURL[],
  newFiles: FileWithURL[],
  maxFiles: number,
): FileWithURL[] => {
  const spaceLeft = maxFiles - existingFiles.length;
  const acceptedFiles = newFiles.slice(0, spaceLeft);
  return [...existingFiles, ...acceptedFiles];
};
