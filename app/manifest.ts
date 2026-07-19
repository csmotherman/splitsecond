import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "SplitSecond — Daily Timing Game",
        short_name: "SplitSecond",
        description:
            "Test your internal clock in a free daily timing challenge. Stop a hidden timer as close as possible to five target times.",
        start_url: "/",
        display: "standalone",
        background_color: "#0A0B0E",
        theme_color: "#0A0B0E",
        orientation: "portrait",
        categories: ["games", "entertainment"],
        icons: [
            {
                src: "/icon.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/icon.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
        ],
    };
}
