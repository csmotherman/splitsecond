import type { MetadataRoute } from "next";

const SITE_URL = "https://playsplitsecond.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date("2026-07-19");

    return [
        {
            url: SITE_URL,
            lastModified,
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${SITE_URL}/leaderboard`,
            lastModified,
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/how-to-play`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/unlimited`,
            lastModified,
            changeFrequency: "weekly",
            priority: 0.7,
        },
    ];
}