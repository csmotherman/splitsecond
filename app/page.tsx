"use client";

import Link from "next/link";
import LeaderboardPreview from "@/components/leaderboard/LeaderboardPreview";
import { getDailyLeaderboard } from "@/lib/game/leaderboard";
import {
    Play,
    BookOpen,
    Zap,
    Infinity,
    Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function HomePage() {
    const router = useRouter();

    const [showHowTo, setShowHowTo] =
        useState(false);

    const [leaderboardEntries, setLeaderboardEntries] =
        useState<
            {
                rank: number;
                username: string;
                totalError: number;
            }[]
        >([]);

    useEffect(() => {
        async function loadLeaderboard() {
            const entries =
                await getDailyLeaderboard();

            setLeaderboardEntries(entries);
        }

        loadLeaderboard();
    }, []);

    async function handleDaily() {
        const {
            data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
            router.push("/login");
            return;
        }

        const hasSeenHowTo =
            localStorage.getItem(
                "splitsecond-how-to-play-seen"
            ) === "true";

        if (!hasSeenHowTo) {
            setShowHowTo(true);
            return;
        }

        router.push("/play");
    }

    function handleUnlimited() {
        router.push("/unlimited");
    }

    return (
        <div className="relative">
            {/* Background Glow */}
            <div className="pointer-events-none fixed left-1/2 top-0 -z-10 h-[350px] w-full max-w-lg -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#39FF14]/10 via-transparent to-transparent blur-3xl" />

            {/* Hero */}
            <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 backdrop-blur-xl">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#39FF14]/20 bg-[#39FF14]/10 px-3 py-1 font-mono text-[10px] font-semibold text-[#39FF14]">
                    <Zap className="h-3 w-3 fill-current" />

                    <span>
                        TEST YOUR INTERNAL CLOCK
                    </span>
                </div>

                <h2 className="mt-4 font-college text-4xl tracking-wider text-white">
                    DAILY TIMER CHALLENGE
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Can you accurately count time in your
                    head down to the exact millisecond?
                </p>

                {/* Game Modes */}
                <div className="mt-7 space-y-4">
                    {/* Daily Challenge */}
                    <button
                        type="button"
                        onClick={handleDaily}
                        className="group w-full rounded-3xl border border-[#39FF14]/20 bg-[#39FF14]/10 p-5 text-left transition hover:border-[#39FF14]/50 hover:bg-[#39FF14]/15 active:scale-[0.99]"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <Trophy className="h-5 w-5 shrink-0 text-[#39FF14]" />

                                    <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                                        Daily Challenge
                                    </h3>
                                </div>

                                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                                    One official run each
                                    day. Compete for the
                                    leaderboard.
                                </p>
                            </div>

                            <Play className="mt-0.5 h-5 w-5 shrink-0 text-[#39FF14] transition-transform group-hover:translate-x-1" />
                        </div>
                    </button>

                    {/* Unlimited Mode */}
                    <button
                        type="button"
                        onClick={handleUnlimited}
                        className="group w-full rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-white/20 hover:bg-white/[0.05] active:scale-[0.99]"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <Infinity className="h-5 w-5 shrink-0 text-sky-400" />

                                    <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                                        Unlimited Mode
                                    </h3>
                                </div>

                                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                                    Practice anytime with
                                    unlimited attempts.
                                    Scores do not affect the
                                    leaderboard.
                                </p>
                            </div>

                            <Play className="mt-0.5 h-5 w-5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-1" />
                        </div>
                    </button>
                </div>
            </section>

            {/* Leaderboard */}
            <LeaderboardPreview
                entries={leaderboardEntries}
            />

            {/* How to Play */}
            <nav className="mt-4">
                <Link
                    href="/how-to-play"
                    className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-white/[0.05] active:scale-95"
                >
                    <BookOpen className="h-5 w-5 text-slate-400 transition-transform group-hover:scale-110 group-hover:text-white" />

                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
                        How to Play
                    </span>
                </Link>
            </nav>

            {/* Footer */}
            <footer className="mt-10 border-t border-white/10 pb-8 pt-6">
                <nav
                    aria-label="Footer navigation"
                    className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-center text-xs text-slate-500"
                >
                    <Link
                        href="/how-to-play"
                        className="transition hover:text-white"
                    >
                        How to Play
                    </Link>

                    <span
                        aria-hidden="true"
                        className="text-slate-700"
                    >
                        •
                    </span>

                    <Link
                        href="/leaderboard"
                        className="transition hover:text-white"
                    >
                        Leaderboard
                    </Link>

                    <span
                        aria-hidden="true"
                        className="text-slate-700"
                    >
                        •
                    </span>

                    <Link
                        href="/privacy"
                        className="transition hover:text-white"
                    >
                        Privacy Policy
                    </Link>

                    <span
                        aria-hidden="true"
                        className="text-slate-700"
                    >
                        •
                    </span>

                    <Link
                        href="/terms"
                        className="transition hover:text-white"
                    >
                        Terms of Service
                    </Link>
                </nav>

                <p className="mt-4 text-center text-[11px] text-slate-600">
                    © {new Date().getFullYear()}{" "}
                    SplitSecond. All rights reserved.
                </p>
            </footer>

            {/* First-Time How-to-Play Modal */}
            {showHowTo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm">
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="how-to-play-title"
                        className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#12151E] p-6 shadow-2xl"
                    >
                        <h2
                            id="how-to-play-title"
                            className="text-center font-college text-3xl tracking-wide text-white"
                        >
                            HOW TO PLAY
                        </h2>

                        <div className="mt-5 text-center">
                            <div className="text-xs uppercase tracking-widest text-slate-500">
                                Target
                            </div>

                            <div className="font-college text-6xl text-[#39FF14] drop-shadow-[0_0_16px_rgba(57,255,20,0.35)]">
                                3.27
                            </div>
                        </div>

                        <p className="mt-5 text-center text-sm leading-relaxed text-slate-300">
                            Tap START, then STOP when you
                            think the target time has
                            passed.
                        </p>

                        <p className="mt-2 text-center text-sm leading-relaxed text-slate-400">
                            Complete five rounds. The
                            lowest total error wins.
                        </p>

                        <div className="mt-6 flex gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    router.push(
                                        "/how-to-play"
                                    )
                                }
                                className="flex-1 rounded-xl border border-white/10 py-3 text-sm font-bold text-white transition hover:bg-white/[0.05] active:scale-95"
                            >
                                View More
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    localStorage.setItem(
                                        "splitsecond-how-to-play-seen",
                                        "true"
                                    );

                                    router.push("/play");
                                }}
                                className="flex-1 rounded-xl bg-[#39FF14] py-3 text-sm font-bold text-black transition hover:brightness-110 active:scale-95"
                            >
                                Let&apos;s Go
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}