import {
  addMinutes,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInWeeks,
  differenceInYears,
  format,
  isToday,
  isYesterday,
} from "date-fns";

/**
 * TODO: date-fnsの関数を使用している箇所を修正。テストも含む
 */

/**
 * 現在時刻からの相対時間を計算する
 * 60秒未満なら「○秒前」、60分未満なら「○分前」、24時間未満なら「○時間前」、7日未満なら「○日前」、4週間未満なら「○週間前」、12ヶ月未満なら「○ヶ月前」、12ヶ月以上なら「○年前」を返す
 * @param target 時間
 * @returns 相対時間の文字列
 * @see https://panda-program.com/posts/ts-diff-time
 */
export const parseRelativeTime = (target: Date): string => {
  const base = new Date();
  // 早期リターンで上の条件を優先する
  const diffInSecs = differenceInSeconds(base, target);
  if (diffInSecs < 60) {
    return `${diffInSecs}秒前`;
  }

  const diffInMins = differenceInMinutes(base, target);
  if (diffInMins < 60) {
    return `${diffInMins}分前`;
  }

  const diffInHours = differenceInHours(base, target);
  if (diffInHours < 24) {
    return `${diffInHours}時間前`;
  }

  const diffInDays = differenceInDays(base, target);
  if (diffInDays < 7) {
    return `${diffInDays}日前`;
  }

  const diffInWeeks = differenceInWeeks(base, target);
  if (diffInWeeks < 4) {
    return `${diffInWeeks}週間前`;
  }

  const diffInMonths = differenceInMonths(base, target);
  // 4週間前でも 0ヶ月前と表示されるため、条件を足して絞り込む
  if (diffInWeeks >= 4 && diffInMonths < 2) {
    return `1ヶ月前`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths}ヶ月前`;
  }

  const diffInYears = differenceInYears(base, target);

  return `${diffInYears}年前`;
};

const timeOffsets = {
  "Asia/Tokyo": 9 * 60,
  // 他のタイムゾーンにも対応可能
  // "America/New_York": -5 * 60,
  // "Europe/London": 0,
  // ...
} as const satisfies Record<string, number>;

type TimeZone = keyof typeof timeOffsets;

const utcToZonedTime = (target: Date, timeZone: TimeZone) => {
  const offset = timeOffsets[timeZone];
  return addMinutes(target, offset);
};

/**
 * 「今日 10:00」や「2023/01/01 10:00」のような形式に変換する
 * @param target 日付
 * @returns
 */
export const parseFixedDateTime = (target: Date): string => {
  const timeZone = "Asia/Tokyo";
  const formattedDate = utcToZonedTime(target, timeZone);
  const hours = formattedDate.getUTCHours().toString().padStart(2, "0");
  const minutes = formattedDate.getUTCMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  if (isToday(target)) {
    return `今日 ${formattedTime}`;
  }

  if (isYesterday(target)) {
    return `昨日 ${formattedTime}`;
  }

  return `${format(target, "yyyy/MM/dd")} ${formattedTime}`;
};

/**
 * 「2024/1/1」形式の日付を表示する
 * @param target 日付
 */
export const parseFixedDate = (target: Date): string => {
  const timeZone = "Asia/Tokyo";
  const formattedDate = utcToZonedTime(target, timeZone);
  const year = formattedDate.getUTCFullYear();
  const month = formattedDate.getUTCMonth() + 1;
  const day = formattedDate.getUTCDate();

  return `${year}/${month}/${day}`;
};

/**
 * 「2024/1」形式の日付を表示する
 * @param target 日付
 */
export const parseFixedYearAndMonth = (target: Date): string => {
  const timeZone = "Asia/Tokyo";
  const formattedDate = utcToZonedTime(target, timeZone);
  const year = formattedDate.getUTCFullYear();
  const month = formattedDate.getUTCMonth() + 1;

  return `${year}/${month}`;
};
