"use client";

import Link from "next/link";
import LeaderboardPreview from "@/components/leaderboard/LeaderboardPreview";
import { getDailyLeaderboard } from "@/lib/game/leaderboard";
import { Play, BookOpen, Zap } from "lucide-react";
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

    async function handlePlay() {
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

                <p className="mt-1 text-sm leading-relaxed text-slate-400">
                    Can you accurately count time in your head
                    down to the exact millisecond?
                </p>

                <button
                    onClick={handlePlay}
                    className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#39FF14] py-4 font-mono text-xs font-black uppercase tracking-wider text-black shadow-[0_0_20px_rgba(57,255,20,0.25)] transition-all duration-300 hover:bg-[#32e612] hover:shadow-[0_0_25px_rgba(57,255,20,0.45)] active:scale-[0.98]"
                >
                    <Play className="h-4 w-4 fill-current transition-transform group-hover:translate-x-0.5" />
                    <span>Play Today's Challenge</span>
                </button>
            </section>

            {/* Leaderboard */}
            <LeaderboardPreview
                entries={leaderboardEntries}
            />

            {/* How To Play */}
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

            {/* How To Play Modal */}
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
                            Tap START, then STOP when you think
                            the target time has passed.
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