/**
 * uuidをバリデーションする
 * @param id uuid
 * @returns バリデーション結果
 */
export const isUUID = (id: string) => {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(id);
};
