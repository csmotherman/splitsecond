import type { MetadataRoute } from "next";

const SITE_URL = "https://playsplitsecond.com";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",
                    "/auth/",
                    "/login",
                    "/profile",
                    "/play",
                    "/duel/",
                ],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
