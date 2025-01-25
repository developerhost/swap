import { SITE_URL } from "@/constants/site";
import { type MetadataRoute } from "next";

/**
 * robots.txt の設定
 */
export default (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      disallow: ["/mypage/", "/draft/", "/transactions/"],
      allow: ["/"],
    },
  ],
  sitemap: `${SITE_URL}/sitemap.xml`,
});
