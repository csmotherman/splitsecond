import Link from "next/link";
import { ArrowLeft, Trophy } from "lucide-react";

import { getDailyLeaderboard } from "@/lib/game/leaderboard";

export default async function LeaderboardPage() {
    const entries =
        await getDailyLeaderboard();

    const getRankDisplay = (
        rank: number
    ) => {
        if (rank === 1) return "🥇";
        if (rank === 2) return "🥈";
        if (rank === 3) return "🥉";

        return `#${rank}`;
    };

    return (
        <main className="space-y-4">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-slate-400 transition hover:text-white"
            >
                <ArrowLeft className="h-4 w-4" />
                Back
            </Link>

            <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
                <div className="border-b border-white/10 p-5">
                    <div className="flex items-center gap-3">
                        <Trophy className="h-5 w-5 text-[#39FF14]" />

                        <div>
                            <h1 className="font-college text-3xl tracking-wider text-white">
                                TODAY'S LEADERBOARD
                            </h1>

                            <p className="text-sm text-slate-500">
                                Lowest total error wins
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    {entries.length === 0 ? (
                        <div className="py-12 text-center">
                            <p className="font-semibold text-white">
                                No scores submitted yet.
                            </p>

                            <p className="mt-2 text-sm text-slate-500">
                                Be the first player on today's leaderboard.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {entries.map(
                                (entry) => (
                                    <div
                                        key={`${entry.rank}-${entry.username}`}
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            rounded-2xl
                                            border
                                            border-white/5
                                            bg-black/20
                                            px-4
                                            py-3
                                        "
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 text-center font-bold">
                                                {getRankDisplay(
                                                    entry.rank
                                                )}
                                            </div>

                                            <span className="font-semibold text-white">
                                                @
                                                {
                                                    entry.username
                                                }
                                            </span>
                                        </div>

                                        <span className="font-mono font-bold text-[#39FF14]">
                                            {entry.totalError.toFixed(
                                                3
                                            )}
                                            s
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}