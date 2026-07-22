"use client";

import Link from "next/link";
import { Trophy, ChevronRight } from "lucide-react";

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
            <div className="border-b border-white/10 p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <Trophy className="h-5 w-5 text-[#39FF14]" />

                            <h3 className="font-mono text-xs font-black uppercase tracking-[0.25em] text-slate-300">
                                Daily Leaderboard
                            </h3>
                        </div>

                        <p className="mt-2 text-sm text-slate-400">
                            Today's fastest players.{" "}
                            <span className="font-semibold text-white">
                                Can you reach #1?
                            </span>
                        </p>
                    </div>

                    <Link
                        href="/leaderboard"
                        className="
                            flex
                            items-center
                            gap-1
                            rounded-full
                            border
                            border-white/10
                            px-3
                            py-2
                            text-xs
                            font-bold
                            uppercase
                            tracking-wider
                            text-[#39FF14]
                            transition
                            hover:border-[#39FF14]/40
                            hover:bg-[#39FF14]/10
                        "
                    >
                        View
                        <ChevronRight className="h-3 w-3" />
                    </Link>
                </div>
            </div>

            <div className="p-4">
                {entries.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-white/10 py-10 text-center">
                        <Trophy className="mx-auto h-10 w-10 text-slate-500" />

                        <h4 className="mt-4 text-lg font-bold text-white">
                            Be today's first player.
                        </h4>

                        <p className="mt-2 text-sm text-slate-500">
                            Set the score everyone else has to beat.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="mb-4 flex items-center justify-between">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                                Top Players
                            </h4>

                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-400">
                                {entries.length}{" "}
                                {entries.length === 1 ? "player" : "players"}
                            </span>
                        </div>

                        <div className="space-y-2">
                            {entries.slice(0, 5).map((entry, index) => (
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