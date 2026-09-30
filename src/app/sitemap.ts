import { routes as routesConfig } from "@/resources";
import { absoluteUrl } from "@/utils/seo";
import { getProjects } from "@/utils/utils";
import type { MetadataRoute } from "next";

/** Static routes get hand-tuned crawl signals; everything else is derived. */
const staticRouteMeta: Record<
  string,
  { priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }
> = {
  "/": { priority: 1, changeFrequency: "monthly" },
  "/services": { priority: 0.9, changeFrequency: "monthly" },
  "/work": { priority: 0.9, changeFrequency: "monthly" },
  "/about": { priority: 0.8, changeFrequency: "yearly" },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();

  const staticRoutes = Object.entries(routesConfig)
    .filter(([, enabled]) => enabled)
    .map(([route]) => {
      const meta = staticRouteMeta[route] ?? { priority: 0.5, changeFrequency: "monthly" };
      return {
        url: absoluteUrl(route),
        lastModified: today,
        changeFrequency: meta.changeFrequency,
        priority: meta.priority,
      };
    });

  const projects = getProjects().map((project) => ({
    url: absoluteUrl(`/work/${project.slug}`),
    lastModified: new Date(project.metadata.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projects];
}
