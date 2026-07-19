import type { Metadata, Viewport } from "next";
import { Teko, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { createClient } from "@/lib/supabase/server";
import { Analytics } from "@vercel/analytics/next";

const SITE_URL = "https://playsplitsecond.com";
const SITE_NAME = "SplitSecond";
const SITE_TITLE = "SplitSecond | Free Daily Timer Game";
const SITE_DESCRIPTION =
    "SplitSecond is the free daily timer game where every millisecond matters. Stop a hidden timer as close as possible to five daily target times, climb the leaderboard, and see how accurate your internal clock really is.";

const teko = Teko({
    subsets: ["latin"],
    weight: ["600", "700"],
    variable: "--font-college",
});

const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),

    title: {
        default: SITE_TITLE,
        template: "%s | SplitSecond",
    },

    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    category: "game",

    keywords: [
        "SplitSecond",
        "daily timer game",
        "timer game",
        "timing game",
        "hidden timer",
        "hidden timer game",
        "internal clock game",
        "time estimation game",
        "millisecond challenge",
        "daily challenge",
        "browser game",
        "free online game",
        "precision timing game",
    ],

    authors: [
        {
            name: SITE_NAME,
            url: SITE_URL,
        },
    ],

    creator: SITE_NAME,
    publisher: SITE_NAME,

    alternates: {
        canonical: SITE_URL,
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },

    openGraph: {
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        siteName: SITE_NAME,
        locale: "en_US",
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "SplitSecond - Free Daily Timer Game",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        images: ["/og-image.png"],
    },

    icons: {
        icon: [
            {
                url: "/favicon.ico",
            },
            {
                url: "/icon.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],

        apple: [
            {
                url: "/apple-icon.png",
                sizes: "180x180",
                type: "image/png",
            },
        ],
    },

    manifest: "/manifest.webmanifest",

    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
};

export const viewport: Viewport = {
    themeColor: "#0A0B0E",
    colorScheme: "dark",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

const structuredData = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: SITE_NAME,
    alternateName: "Play SplitSecond",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    image: `${SITE_URL}/og-image.png`,
    logo: `${SITE_URL}/icon.png`,
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    browserRequirements:
        "Requires JavaScript and a modern web browser",
    genre: [
        "Timing Game",
        "Daily Challenge",
        "Casual Game",
    ],
    playMode: "SinglePlayer",
    isAccessibleForFree: true,
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/OnlineOnly",
    },
    about: [
        {
            "@type": "Thing",
            name: "Daily Timer Game",
        },
        {
            "@type": "Thing",
            name: "Timing Challenge",
        },
    ],
};

const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const displayName =
        user?.user_metadata?.full_name ??
        user?.user_metadata?.name ??
        user?.email ??
        null;

    const avatarUrl =
        user?.user_metadata?.avatar_url ??
        user?.user_metadata?.picture ??
        null;

    return (
        <html
            lang="en"
            data-scroll-behavior="smooth"
            className={`dark ${teko.variable} ${geistMono.variable} ${inter.variable}`}
        >
            <body className="min-h-screen bg-[#0A0B0E] pb-12 text-slate-100 antialiased">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(
                            structuredData
                        ).replace(/</g, "\\u003c"),
                    }}
                />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(
                            organizationData
                        ).replace(/</g, "\\u003c"),
                    }}
                />

                <div className="mx-auto max-w-md px-5 py-6">
                    <Header
                        isLoggedIn={!!user}
                        displayName={displayName}
                        avatarUrl={avatarUrl}
                    />

                    <main>{children}</main>
                </div>

                <Analytics />
            </body>
        </html>
    );
}