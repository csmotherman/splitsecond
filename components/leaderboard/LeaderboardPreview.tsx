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
                    <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-[#39FF14]" />

                        <h3 className="font-mono text-xs font-black uppercase tracking-widest text-slate-300">
                            Today's Leaderboard
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
                            hover:text-white
                        "
                    >
                        View All
                        <ChevronRight className="h-3 w-3" />
                    </Link>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                    Lowest total error wins.
                </p>
            </div>

            <div className="p-4">
                {entries.length === 0 ? (
                    <div className="py-8 text-center">
                        <p className="text-sm text-slate-500">
                            No scores submitted yet.
                        </p>

                        <p className="mt-1 text-xs text-slate-600">
                            Be the first player today.
                        </p>
                    </div>
                ) : (
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
                )}
            </div>
        </section>
    );
}