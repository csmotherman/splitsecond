"use client";

import Link from "next/link";
import {
    ArrowLeft,
    Target,
    Timer,
    Trophy,
    Zap,
    Medal,
} from "lucide-react";

export default function HowToPlayPage() {
    return (
        <main className="min-h-screen bg-[#0A0B0E] text-white">
            <div className="mx-auto max-w-md px-5 py-6">
                <Link
                    href="/"
                    className="mb-6 inline-flex items-center gap-2 text-zinc-400 transition hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Link>

                <div className="text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#39FF14]/20 bg-[#39FF14]/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#39FF14]">
                        <Zap className="h-3 w-3" />
                        Every Millisecond Matters
                    </div>

                    <h1 className="mt-4 font-college text-5xl tracking-wider">
                        HOW TO PLAY
                    </h1>

                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                        Test your internal clock by stopping a hidden timer as
                        close as possible to the target.
                    </p>
                </div>

                {/* Step 1 */}
                <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex items-center gap-3">
                        <Target className="h-6 w-6 text-[#39FF14]" />
                        <h2 className="font-bold">1. Memorize The Target</h2>
                    </div>

                    <div className="mt-4 text-center">
                        <div className="font-college text-6xl text-[#39FF14]">
                            3.27
                        </div>

                        <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                            TARGET TIME
                        </div>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex items-center gap-3">
                        <Timer className="h-6 w-6 text-[#39FF14]" />
                        <h2 className="font-bold">2. Start & Stop</h2>
                    </div>

                    <p className="mt-3 text-sm text-zinc-400">
                        Press START. A hidden timer begins counting.
                        Press STOP when you think the target time has passed.
                    </p>
                </div>

                {/* Step 3 */}
                <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex items-center gap-3">
                        <Trophy className="h-6 w-6 text-[#39FF14]" />
                        <h2 className="font-bold">3. Minimize Error</h2>
                    </div>

                    <div className="mt-4 rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-center">
                        <div className="text-xs uppercase tracking-widest text-zinc-500">
                            Target
                        </div>

                        <div className="font-college text-4xl text-white">
                            3.27
                        </div>

                        <div className="mt-3 text-xs uppercase tracking-widest text-zinc-500">
                            Your Time
                        </div>

                        <div className="font-college text-4xl text-[#39FF14]">
                            3.31
                        </div>

                        <div className="mt-3 text-lg font-black text-[#39FF14]">
                            +0.04s Error
                        </div>
                    </div>
                </div>

                {/* Scoring */}
                <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex items-center gap-3">
                        <Medal className="h-6 w-6 text-[#39FF14]" />
                        <h2 className="font-bold">Scoring</h2>
                    </div>

                    <p className="mt-3 text-sm text-zinc-400">
                        Every round adds to your total error.
                    </p>

                    <p className="mt-2 text-sm text-zinc-400">
                        Complete all 5 rounds and submit your score.
                    </p>

                    <p className="mt-2 text-sm font-semibold text-white">
                        Lower total error = Better rank.
                    </p>
                </div>

                {/* Daily vs Practice */}
                <div className="mt-4 rounded-3xl border border-[#39FF14]/20 bg-[#39FF14]/10 p-5">
                    <h2 className="font-bold text-[#39FF14]">
                        Daily Challenge vs Practice
                    </h2>

                    <div className="mt-3 space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-zinc-300">
                                Daily Challenge
                            </span>
                            <span className="font-bold text-white">
                                Saved & Ranked
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-zinc-300">
                                Practice Mode
                            </span>
                            <span className="font-bold text-white">
                                No Score Saved
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tip */}
                <div className="mt-4 text-center text-sm text-zinc-500">
                    The best players can finish with less than
                    <span className="mx-1 font-bold text-[#39FF14]">
                        0.10s
                    </span>
                    total error.
                </div>
            </div>
        </main>
    );
}