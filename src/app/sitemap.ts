import { SITE_URL } from "@/constants/site";
import { type MetadataRoute, type Route } from "next";

const routes = [
  "/",
  "/search",
  "/signin",
  "/compliance",
  "/cookie-policy",
  "/data-security",
  "/digital",
  "/guide/action",
  "/guide/product",
  "/legal-check",
  "/peps",
  "/privacy-policy",
  "/funds-settlement",
  "/specified-commercial-transaction",
  "/tos",
  "/no-available-service",
  "/inquiry",
] satisfies Route[];

/**
 * サイトマップのURLを生成する
 */
export default (): MetadataRoute.Sitemap =>
  routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    priority: 0.8,
    lastModified: "2024-02-20T00:00:00.000Z",
  }));
