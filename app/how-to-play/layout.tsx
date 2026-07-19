import type { Metadata } from "next";

const SITE_URL = "https://playsplitsecond.com";
const PAGE_URL = `${SITE_URL}/how-to-play`;
const TITLE = "How to Play SplitSecond";
const DESCRIPTION =
    "Learn how to play SplitSecond, the free daily timing game. Memorize each target, stop the hidden timer, and finish five rounds with the lowest total error.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: {
        canonical: PAGE_URL,
    },
    openGraph: {
        title: `${TITLE} | SplitSecond`,
        description: DESCRIPTION,
        url: PAGE_URL,
        type: "website",
        images: [
            {
                url: "/opengraph-image",
                width: 1200,
                height: 630,
                alt: "How to play SplitSecond",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: `${TITLE} | SplitSecond`,
        description: DESCRIPTION,
        images: ["/twitter-image"],
    },
};

export default function HowToPlayLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
