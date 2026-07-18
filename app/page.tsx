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

    const [showHowTo, setShowHowTo] = useState(false);

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

    async function handleUnlimited() {
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
                    <span>TEST YOUR INTERNAL CLOCK</span>
                </div>

                <h2 className="mt-4 font-college text-4xl tracking-wider text-white">
                    DAILY TIMER CHALLENGE
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Can you accurately count time in your head
                    down to the exact millisecond?
                </p>

                {/* Game Modes */}
                <div className="mt-7 space-y-4">
                    {/* Daily */}
                    <button
                        onClick={handleDaily}
                        className="group w-full rounded-3xl border border-[#39FF14]/20 bg-[#39FF14]/10 p-5 text-left transition hover:border-[#39FF14]/50 hover:bg-[#39FF14]/15"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <Trophy className="h-5 w-5 text-[#39FF14]" />
                                    <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                                        Daily Challenge
                                    </h3>
                                </div>

                                <p className="mt-2 text-sm text-slate-400">
                                    One official run each day.
                                    Compete for the leaderboard.
                                </p>
                            </div>

                            <Play className="h-5 w-5 text-[#39FF14] transition group-hover:translate-x-1" />
                        </div>
                    </button>

                    {/* Unlimited */}
                    <button
                        onClick={handleUnlimited}
                        className="group w-full rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-white/20 hover:bg-white/[0.05]"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <Infinity className="h-5 w-5 text-sky-400" />
                                    <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                                        Unlimited Mode
                                    </h3>
                                </div>

                                <p className="mt-2 text-sm text-slate-400">
                                    Practice anytime with unlimited
                                    attempts. Scores don't affect the
                                    leaderboard.
                                </p>
                            </div>

                            <Play className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1" />
                        </div>
                    </button>
                </div>
            </section>

            {/* Leaderboard */}
            <LeaderboardPreview
                entries={leaderboardEntries}
            />

            {/* How To */}
            <nav className="mt-4">
                <Link
                    href="/how-to-play"
                    className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-white/[0.05] active:scale-95"
                >
                    <BookOpen className="h-5 w-5 text-slate-400 transition-transform group-hover:scale-110 group-hover:text-white" />

                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
                        How To Play
                    </span>
                </Link>
            </nav>

            {/* First-Time Modal */}
            {showHowTo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5">
                    <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#12151E] p-6">
                        <h2 className="text-center font-college text-3xl text-white">
                            HOW TO PLAY
                        </h2>

                        <div className="mt-5 text-center">
                            <div className="text-xs uppercase tracking-widest text-slate-500">
                                TARGET
                            </div>

                            <div className="font-college text-6xl text-[#39FF14]">
                                3.27
                            </div>
                        </div>

                        <p className="mt-5 text-center text-sm text-slate-300">
                            Tap START, then STOP when you think the
                            target time has passed.
                        </p>

                        <p className="mt-2 text-center text-sm text-slate-400">
                            Complete 5 rounds. Lowest total error
                            wins.
                        </p>

                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() =>
                                    router.push(
                                        "/how-to-play"
                                    )
                                }
                                className="flex-1 rounded-xl border border-white/10 py-3 text-white"
                            >
                                View More
                            </button>

                            <button
                                onClick={() => {
                                    localStorage.setItem(
                                        "splitsecond-how-to-play-seen",
                                        "true"
                                    );

                                    router.push("/play");
                                }}
                                className="flex-1 rounded-xl bg-[#39FF14] py-3 font-bold text-black"
                            >
                                Let's Go
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}