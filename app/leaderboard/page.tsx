import Link from "next/link";
import { ArrowLeft, Trophy } from "lucide-react";

type LeaderboardEntry = {
    rank: number;
    username: string;
    totalError: number;
};

export default function LeaderboardPage() {
    // Replace with Supabase query later
    const entries: LeaderboardEntry[] = [
        {
            rank: 1,
            username: "Carter",
            totalError: 0.084,
        },
        {
            rank: 2,
            username: "Abbey",
            totalError: 0.102,
        },
        {
            rank: 3,
            username: "Tyler",
            totalError: 0.118,
        },
        {
            rank: 4,
            username: "Jordan",
            totalError: 0.141,
        },
        {
            rank: 5,
            username: "Sarah",
            totalError: 0.157,
        },
        {
            rank: 6,
            username: "Mike",
            totalError: 0.201,
        },
        {
            rank: 7,
            username: "Alex",
            totalError: 0.228,
        },
        {
            rank: 8,
            username: "Chris",
            totalError: 0.274,
        },
    ];

    const getRankDisplay = (rank: number) => {
        if (rank === 1) return "🥇";
        if (rank === 2) return "🥈";
        if (rank === 3) return "🥉";
        return `#${rank}`;
    };

    return (
        <main className="min-h-screen">
            <Link
                href="/"
                className="mb-4 inline-flex items-center gap-2 text-slate-400 hover:text-white"
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
                    <div className="space-y-2">
                        {entries.map((entry) => (
                            <div
                                key={entry.rank}
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
                                        {entry.username}
                                    </span>
                                </div>

                                <span className="font-mono font-bold text-[#39FF14]">
                                    {entry.totalError.toFixed(
                                        3
                                    )}
                                    s
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}