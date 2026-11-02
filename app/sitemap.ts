import type { MetadataRoute } from "next";
import { getAllVehicles } from "@/app/lib/api";
import { categories } from "@/app/lib/categories";
import { site } from "@/app/lib/site";

export const revalidate = 3600; // rebuild hourly so new vehicles appear

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const vehicles = await getAllVehicles();

  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/vehicles`, changeFrequency: "daily", priority: 0.9 },
    ...categories.map((c) => ({
      url: `${site.url}/vehicles?category=${c.key}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    { url: `${site.url}/sold`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.6 },
    ...vehicles.map((v) => ({
      url: `${site.url}/vehicles/${v.slug}`,
      changeFrequency: "weekly" as const,
      priority: v.status === "sold" ? 0.3 : 0.8,
    })),
  ];
}