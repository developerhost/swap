/**
 * ObjectのValueの型を取得するUtility
 */
export type ValueOf<T> = T[keyof T];

/**
 * URLを表す文字列型
 */
export type URLString = `${string}://${string}`;

/** 2つの型のプロパティをマージしたオブジェクトを得る */
export type Merge<F extends object, S extends object> = {
  [K in keyof F | keyof S]: K extends keyof S
    ? S[K]
    : K extends keyof F
      ? F[K]
      : never;
};
