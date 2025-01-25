import { hasObjectKey, isArrayOfFiles } from "@/utils/typeGuard";

describe("isArrayOfFiles", () => {
  test("配列の要素が全てFileの場合、trueを返す", () => {
    const arr = [new File([""], "filename"), new File([""], "filename")];
    expect(isArrayOfFiles(arr)).toBe(true);
  });

  test("配列の要素の一部がFileでない場合、falseを返す", () => {
    const arr = [
      new File([""], "filename"),
      new File([""], "filename"),
      new Blob([""], { type: "text/plain" }),
    ];
    expect(isArrayOfFiles(arr)).toBe(false);
  });

  test("配列でない場合、falseを返す", () => {
    const file = new File([""], "filename");
    expect(isArrayOfFiles(file)).toBe(false);
  });
});

describe("generateKeyGuard", () => {
  test("存在するキーを判定した際にtrueを返す", () => {
    const obj = {
      key1: "value1",
      key2: "value2",
      key3: "value3",
    };
    expect(hasObjectKey(obj, "key1")).toBe(true);
    expect(hasObjectKey(obj, "key2")).toBe(true);
    expect(hasObjectKey(obj, "key3")).toBe(true);
  });

  test("生成した関数で、存在しないキーを判定した際にfalseを返す", () => {
    const obj = {
      key1: "value1",
      key2: "value2",
      key3: "value3",
    };
    expect(hasObjectKey(obj, "key4")).toBe(false);
    expect(hasObjectKey(obj, "toString")).toBe(false);
  });
});
