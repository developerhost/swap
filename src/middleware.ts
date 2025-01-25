import {
  type ComposableMiddleware,
  composeMiddleware,
} from "next-compose-middleware";
import { type NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

const maintenanceMode: ComposableMiddleware = async (req, res) => {
  if (process.env.NODE_ENV === "development") {
    return res;
  }
  const isInMaintenanceMode = await get("isInMaintenanceMode");
  if (isInMaintenanceMode) {
    // eslint-disable-next-line functional/immutable-data
    req.nextUrl.pathname = "/maintenance";

    return NextResponse.rewrite(req.nextUrl);
  }
  return res;
};

/**
 * scripts に ミドルウェア を追加する
 * @param req NextRequest
 * @returns NextResponse.redirect | void
 */
export const middleware = async (req: NextRequest) =>
  await composeMiddleware(req, NextResponse.next(), {
    scripts: [maintenanceMode],
  });

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|opengraph-image.png).*)",
  ],
};
