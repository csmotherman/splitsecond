import type { Metadata, Viewport } from "next";
import { Teko, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Timer, User } from "lucide-react";

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`dark ${teko.variable} ${geistMono.variable} ${inter.variable}`}>
            <body className={`${inter.className} bg-[#0A0B0E] text-slate-100 antialiased min-h-screen pb-24 md:pb-12`}>

                {/* Top Header Badge */}
                <header className="px-4 pt-6 pb-2 max-w-md mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-2 bg-[#12151E] border border-white/10 px-3.5 py-1.5 rounded-full shadow-lg">
                        <Timer className="w-4 h-4 text-[#39FF14]" />
                        <span className="font-college text-xl text-white tracking-wider">
                            SPLIT<span className="text-[#39FF14]">SECOND</span>
                        </span>
                    </div>

                    <button className="p-2 rounded-full bg-[#12151E] border border-white/10 hover:border-[#39FF14]/50 transition-colors">
                        <User className="w-4 h-4 text-slate-300" />
                    </button>
                </header>

                {/* Main Application Area */}
                <main className="max-w-md mx-auto px-4 pt-3">
                    {children}
                </main>
            </body>
        </html>
    );
}