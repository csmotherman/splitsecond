import type { Metadata, Viewport } from "next";
import { Teko, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { createClient } from "@/lib/supabase/server";

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
    metadataBase: new URL("https://splitsecond.gg"),

    title: {
        default: "SplitSecond | Every Millisecond Matters",
        template: "%s | SplitSecond",
    },

    description:
        "Stop the hidden timer as close as possible to five daily target times.",

    applicationName: "SplitSecond",

    openGraph: {
        title: "SplitSecond | Every Millisecond Matters",
        description:
            "Stop the hidden timer as close as possible to five daily target times.",
        url: "https://splitsecond.gg",
        siteName: "SplitSecond",
        locale: "en_US",
        type: "website",
        images: [
            {
                url: "/opengraph-image.png",
                width: 1200,
                height: 630,
                alt: "SplitSecond Daily Timer Challenge",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "SplitSecond | Every Millisecond Matters",
        description:
            "Stop the hidden timer as close as possible to five daily target times.",
        images: ["/twitter-image.png"],
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
};

export const viewport: Viewport = {
    themeColor: "#0A0B0E",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
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
                <div className="mx-auto max-w-md px-5 py-6">
                    <Header
                        isLoggedIn={!!user}
                        displayName={displayName}
                        avatarUrl={avatarUrl}
                    />

                    <main>{children}</main>
                </div>
            </body>
        </html>
    );
}