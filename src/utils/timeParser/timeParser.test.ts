import {
  parseFixedDateTime,
  parseFixedYearAndMonth,
  parseRelativeTime,
} from "@/utils/timeParser";
import { addMinutes } from "date-fns";

describe("parseRelativeTime", () => {
  test("1秒前の場合、'1秒前'が返されること", () => {
    const target = new Date();
    target.setSeconds(target.getSeconds() - 1);
    expect(parseRelativeTime(target)).toBe("1秒前");
  });

  test("1分前の場合、'1分前'が返されること", () => {
    const target = new Date();
    target.setMinutes(target.getMinutes() - 1);
    expect(parseRelativeTime(target)).toBe("1分前");
  });

  test("1時間前の場合、'1時間前'が返されること", () => {
    const target = new Date();
    target.setHours(target.getHours() - 1);
    expect(parseRelativeTime(target)).toBe("1時間前");
  });

  test("1日前の場合、'1日前'が返されること", () => {
    const target = new Date();
    target.setDate(target.getDate() - 1);
    expect(parseRelativeTime(target)).toBe("1日前");
  });

  test("1週間前の場合、'1週間前'が返されること", () => {
    const target = new Date();
    target.setDate(target.getDate() - 7);
    expect(parseRelativeTime(target)).toBe("1週間前");
  });

  test("1ヶ月前の場合、'1ヶ月前'が返されること", () => {
    const target = new Date();
    target.setMonth(target.getMonth() - 1);
    expect(parseRelativeTime(target)).toBe("1ヶ月前");
  });

  test("1年前の場合、閏年なら'11ヶ月前'が返されること", () => {
    const target = new Date();
    const lastYear = new Date(
      target.getFullYear() - 1,
      target.getMonth(),
      target.getDate(),
    );

    // 閏年の場合は2月29日が存在する
    const isTodayFeb29 = target.getMonth() === 1 && target.getDate() === 29;

    // 閏年かつ今日が2月29日の場合は'11ヶ月前'、それ以外は'1年前'とする
    const expectedResult = isTodayFeb29 ? "11ヶ月前" : "1年前";

    expect(parseRelativeTime(lastYear)).toBe(expectedResult);
  });

  describe("parseFixedTime", () => {
    test("今日の場合、'今日'が含まれること", () => {
      const target = new Date();
      expect(parseFixedDateTime(target)).toContain("今日");
    });

    test("昨日の場合、'昨日'が含まれること", () => {
      const target = new Date();
      target.setDate(target.getDate() - 1);
      expect(parseFixedDateTime(target)).toContain("昨日");
    });

    test("今日と昨日以外の場合、'yyyy/MM/dd'が含まれること", () => {
      const target = new Date();
      target.setDate(target.getDate() - 2);
      expect(parseFixedDateTime(target)).toMatch(/\d{4}\/\d{2}\/\d{2}/);
    });
  });
});

describe("parseFixedYearAndMonth", () => {
  test("正しい年月が表示されること", () => {
    const target = new Date();
    const formattedDate = addMinutes(target, 9 * 60);
    const year = formattedDate.getUTCFullYear();
    const month = formattedDate.getUTCMonth() + 1;

    expect(parseFixedYearAndMonth(target)).toBe(`${year}/${month}`);
  });

  test("月初の場合でも、正しい年月が表示されること", () => {
    const target = new Date("2024-01-01T00:00:00");
    const formattedDate = addMinutes(target, 9 * 60);
    const year = formattedDate.getUTCFullYear();
    const month = formattedDate.getUTCMonth() + 1;

    expect(parseFixedYearAndMonth(target)).toBe(`${year}/${month}`);
  });
});
