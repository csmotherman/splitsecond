import type { Metadata } from "next";

const SITE_URL = "https://playsplitsecond.com";
const PAGE_URL = `${SITE_URL}/unlimited`;
const TITLE = "Unlimited Timing Game";
const DESCRIPTION =
    "Play unlimited SplitSecond timing challenges for free. Practice stopping a hidden timer on five random targets with no score saved and no attempt limit.";

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
                alt: "Play unlimited SplitSecond timing challenges",
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

export default function UnlimitedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}
