"use client";

import { Smartphone } from "lucide-react";

export default function OpenInBrowserPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#0A0B0E] px-6">
            <div className="max-w-md text-center">
                <Smartphone className="mx-auto mb-6 h-16 w-16 text-[#39FF14]" />

                <h1 className="font-college text-4xl text-white">
                    Open in Safari or Chrome
                </h1>

                <p className="mt-6 text-slate-300">
                    SplitSecond uses secure Google login,
                    which isn't supported inside Snapchat,
                    Instagram, Facebook, TikTok, and other
                    in-app browsers.
                </p>

                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 text-left">
                    <h2 className="mb-3 font-bold text-white">
                        iPhone
                    </h2>

                    <p className="text-slate-300">
                        Tap the
                        <span className="mx-1 font-bold">
                            •••
                        </span>
                        menu, then choose
                        <span className="font-bold">
                            {" "}
                            Open in Safari
                        </span>
                        .
                    </p>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-left">
                    <h2 className="mb-3 font-bold text-white">
                        Android
                    </h2>

                    <p className="text-slate-300">
                        Tap the
                        <span className="mx-1 font-bold">
                            ⋮
                        </span>
                        menu, then choose
                        <span className="font-bold">
                            {" "}
                            Open in Chrome
                        </span>
                        .
                    </p>
                </div>
            </div>
        </main>
    );
}