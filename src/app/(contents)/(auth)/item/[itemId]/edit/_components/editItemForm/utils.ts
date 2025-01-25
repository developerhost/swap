const blobToFile = (blob: Blob, fileName: string) =>
  new File([blob], fileName, { type: blob.type });

/**
 * 受け取ったBlobの配列をFileに変換する
 * @param blobs Blob[]
 */
export const blobsToFiles = (blobs: Blob[]) =>
  blobs.map((blob, i) => blobToFile(blob, i.toString()));
