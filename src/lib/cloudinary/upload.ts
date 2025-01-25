import { type CloudinaryUploadResponse } from "@/lib/cloudinary/type";
import { failure, success, type Result } from "@/lib/result";
import { fetchResult } from "@/utils/fetcher";
import { env } from "@/utils/serverEnv";
import { isURLString } from "@/utils/typeGuard";

const url = env.CLOUDINARY_UPLOAD_URL;
const preset = env.CLOUDINARY_UPLOAD_PRESET;

/**
 * 単体の画像をCloudinaryにアップロードする
 * @param file アップロードするファイル
 */
export const uploadSingleFile = async (
  file: File,
): Promise<Result<string, string>> => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("folder", "swappy");
  formData.append("upload_preset", preset);
  formData.append("fetch_format", "auto");

  const result = await fetchResult<CloudinaryUploadResponse>(url, {
    method: "POST",
    body: formData,
  });

  if (result.isFailure) {
    return failure(result.error.title);
  }
  const secureURL = result.value.secure_url;
  if (isURLString(secureURL)) {
    return success(secureURL);
  }
  return failure("invalid url");
};

/**
 * 画像をCloudinaryにアップロードする
 * @param files ユーザーがドロップしたファイル
 * @returns アップロードされた画像のURL配列
 */
export const uploadToCloudinary = async (files: File[]) => {
  const uploadPromises = files.map((file) => uploadSingleFile(file));

  const uploadResults = await Promise.all(uploadPromises);
  const successResults = uploadResults.reduce<string[]>((acc, result) => {
    if (result.isSuccess) {
      return [...acc, result.value];
    }
    return acc;
  }, []);

  return successResults;
};
