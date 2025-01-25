import { isUUID } from "@/utils/validator"; // 関数が定義されたモジュールをインポート

describe("validateUUID", () => {
  test("正しいUUIDフォーマットがtrueになること", () => {
    const validUUID = "123e4567-e89b-12d3-a456-426614174000";
    expect(isUUID(validUUID)).toBe(true);
  });

  test("不正なUUIDフォーマットがfalseになること", () => {
    const invalidUUID = "123e4567-e89b-12d3-a456-42661417400"; // 不正な長さ
    expect(isUUID(invalidUUID)).toBe(false);
  });

  test("空文字列がfalseになること", () => {
    expect(isUUID("")).toBe(false);
  });

  test("不正なフォーマット（区切り文字不足）がfalseになること", () => {
    const invalidUUID = "123e4567e89b12d3a456426614174000"; // 区切り文字がない
    expect(isUUID(invalidUUID)).toBe(false);
  });

  test("大文字を含む正しいUUIDフォーマットがtrueになること", () => {
    const validUUIDUpperCase = "123E4567-E89B-12D3-A456-426614174000";
    expect(isUUID(validUUIDUpperCase)).toBe(true);
  });
});
