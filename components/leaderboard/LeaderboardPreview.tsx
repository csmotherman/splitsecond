"use client";

import Link from "next/link";
import { Trophy, ChevronRight, Crown } from "lucide-react";

import LeaderboardRow from "./LeaderboardRow";

export type LeaderboardEntry = {
    username: string;
    totalError: number;
};

type LeaderboardPreviewProps = {
    entries: LeaderboardEntry[];
};

export default function LeaderboardPreview({
    entries,
}: LeaderboardPreviewProps) {
    const leader = entries[0];

    return (
        <section
            className="
                mt-4
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
            "
        >
            {/* Header */}
            <div className="border-b border-white/10 p-5">

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-[#39FF14]" />

                        <h3 className="font-mono text-xs font-black uppercase tracking-[0.25em] text-slate-300">
                            Daily Challenge
                        </h3>
                    </div>

                    <Link
                        href="/leaderboard"
                        className="
                            flex
                            items-center
                            gap-1
                            text-xs
                            font-bold
                            uppercase
                            tracking-wider
                            text-[#39FF14]
                            transition
                            hover:text-white
                        "
                    >
                        View All
                        <ChevronRight className="h-3 w-3" />
                    </Link>
                </div>

                {leader ? (
                    <>
                        <p className="mt-5 text-center text-sm font-semibold text-slate-400">
                            Can you beat today's best?
                        </p>

                        <div className="mt-3 rounded-2xl border border-[#39FF14]/25 bg-[#39FF14]/10 p-4 text-center">

                            <div className="flex items-center justify-center gap-2">
                                <Crown
                                    className="text-yellow-400"
                                    size={18}
                                />

                                <span className="font-bold text-white">
                                    {leader.username}
                                </span>
                            </div>

                            <div className="mt-2 font-college text-6xl leading-none text-[#39FF14]">
                                +{leader.totalError.toFixed(3)}
                            </div>

                            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-slate-400">
                                TOTAL ERROR
                            </p>
                        </div>
                    </>
                ) : (
                    <div className="mt-5 rounded-2xl border border-dashed border-white/10 p-5 text-center">
                        <div className="text-4xl">🏆</div>

                        <p className="mt-3 font-bold text-white">
                            Be the first player today.
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            Your score could set the record everyone else has to beat.
                        </p>
                    </div>
                )}
            </div>

            {/* Leaderboard */}
            <div className="p-4">

                {entries.length > 0 && (
                    <>
                        <div className="mb-3 flex items-center justify-between">

                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                                Top Players
                            </h4>

                            <span className="text-xs text-slate-500">
                                {entries.length}{" "}
                                {entries.length === 1 ? "player" : "players"}
                            </span>

                        </div>

                        <div className="space-y-2">
                            {entries
                                .slice(0, 5)
                                .map((entry, index) => (
                                    <LeaderboardRow
                                        key={`${entry.username}-${index}`}
                                        rank={index + 1}
                                        username={entry.username}
                                        totalError={entry.totalError}
                                    />
                                ))}
                        </div>
                    </>
                )}

            </div>
        </section>
    );
}