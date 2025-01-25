/**
 * カンマ区切りのタグ文字列をSetに変換する
 * @param tags タグの文字列
 */
export const convertTags = (tags: string): Set<string> =>
  new Set(tags.split(",").map((tag) => tag.trim()));
