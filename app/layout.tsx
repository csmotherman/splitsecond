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
    title: "SplitSecond | Every Millisecond Matters",
    description: "Stop the hidden timer as close as possible to five daily target times.",
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
    console.log("LAYOUT USER:", user);
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
            <body className="bg-[#0A0B0E] text-slate-100 antialiased min-h-screen pb-12">
                <div className="mx-aato max-w-md px-5 py-6">
                    {/* Global Shared Header */}
                    <Header
                        isLoggedIn={!!user}
                        displayName={displayName}
                        avatarUrl={avatarUrl}
                    />

                    {/* Page Content */}
                    <main>{children}</main>
                </div>
            </body>
        </html>
    );
}