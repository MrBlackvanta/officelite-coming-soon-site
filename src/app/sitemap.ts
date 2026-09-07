import { routes, siteUrl } from "@/data";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => {
    const home = route === "/";
    return {
      url: home ? siteUrl : new URL(route, siteUrl).href,
      changeFrequency: "yearly",
      priority: home ? 1 : 0.8,
    };
  });
}
