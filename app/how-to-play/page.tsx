"use client";

import Link from "next/link";
import {
    ArrowLeft,
    Target,
    Timer,
    Trophy,
} from "lucide-react";

export default function HowToPlayPage() {
    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <div className="mx-auto flex min-h-screen max-w-md flex-col px-5 py-6">
                <Link
                    href="/"
                    className="mb-4 inline-flex items-center gap-2 text-zinc-400 hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Link>

                <div className="text-center">
                    <h1 className="text-3xl font-black">
                        How To Play
                    </h1>

                    <p className="mt-2 text-sm text-zinc-400">
                        Stop as close to the target as possible.
                    </p>
                </div>

                <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-zinc-900/50 p-4">
                        <Target className="h-8 w-8 text-green-400" />

                        <div>
                            <p className="font-bold">
                                Memorize Target
                            </p>

                            <p className="text-sm text-zinc-400">
                                Example: 3.27 seconds
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-zinc-900/50 p-4">
                        <Timer className="h-8 w-8 text-green-400" />

                        <div>
                            <p className="font-bold">
                                Start & Stop
                            </p>

                            <p className="text-sm text-zinc-400">
                                Hidden timer. Stop at the target.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-zinc-900/50 p-4">
                        <Trophy className="h-8 w-8 text-green-400" />

                        <div>
                            <p className="font-bold">
                                Lowest Error Wins
                            </p>

                            <p className="text-sm text-zinc-400">
                                5 rounds. Lower total error = better score.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 rounded-3xl border border-green-500/20 bg-green-500/10 p-5 text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-green-400">
                        Example Round
                    </p>

                    <div className="mt-3 text-4xl font-black text-green-400">
                        3.31
                    </div>

                    <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                        YOUR TIME
                    </div>

                    <div className="mt-2 text-xl font-black text-green-400">
                        +0.04
                    </div>

                    <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                        FROM TARGET 3.27
                    </div>
                </div>

                <div className="mt-auto pt-4 text-center text-xs text-zinc-500">
                    Daily Challenge saves scores.
                    <br />
                    Practice Mode does not.
                </div>
            </div>
        </main>
    );
}