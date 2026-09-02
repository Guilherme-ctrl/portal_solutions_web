import type { MetadataRoute } from "next"
import { CASE_URL, SITE_URL } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date()

  return [
    { url: SITE_URL, lastModified: agora, changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE_URL}/avaliar-projeto`,
      lastModified: agora,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}${CASE_URL}`,
      lastModified: agora,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]
}
