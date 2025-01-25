import "server-only";

import { env } from "@/utils/serverEnv";
import pino from "pino";

/**
 * ログ出力用のインスタンス
 * 環境変数のLOG_LEVELに設定したレベル以上のログを出力する
 * @example
 * ```ts
 * logger.info('info message');
 * logger.error('error message');
 * ```
 * @see
 * ```
 *   labels: {
 *   '10': 'trace',
 *   '20': 'debug',
 *   '30': 'info',
 *   '40': 'warn',
 *   '50': 'error',
 *   '60': 'fatal'
 * },
 * ```
 */
export const logger = pino({
  level: env.LOG_LEVEL ?? "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});
