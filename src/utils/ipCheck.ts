import { env } from "process";

/**
 * IPアドレスの国をチェックする (JPではtrue、それ以外ではfalse)
 * @param ip IPアドレス
 * @returns
 */
export const ipCheck = async (ip: string): Promise<boolean> => {
  if (!env.IPINFO_API_KEY) return true;
  const res = await fetch(
    `https://ipinfo.io/${ip}?token=${env.IPINFO_API_KEY}`,
  );
  const data: unknown = await res.json();
  if (
    typeof data === "object" &&
    data &&
    "country" in data &&
    data.country !== "JP"
  ) {
    return false;
  }
  return true;
};
