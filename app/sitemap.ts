import type { MetadataRoute } from "next";

const SITE_URL = "https://playsplitsecond.com";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: SITE_URL,
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${SITE_URL}/how-to-play`,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/unlimited`,
            changeFrequency: "weekly",
            priority: 0.7,
        },
    ];
}
