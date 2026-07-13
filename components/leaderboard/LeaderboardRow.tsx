"use client";

type LeaderboardRowProps = {
    rank: number;
    username: string;
    totalError: number;
};

export default function LeaderboardRow({
    rank,
    username,
    totalError,
}: LeaderboardRowProps) {
    const getRankDisplay = () => {
        if (rank === 1) {
            return (
                <span className="text-lg">
                    🥇
                </span>
            );
        }

        if (rank === 2) {
            return (
                <span className="text-lg">
                    🥈
                </span>
            );
        }

        if (rank === 3) {
            return (
                <span className="text-lg">
                    🥉
                </span>
            );
        }

        return (
            <span className="font-black text-slate-500">
                #{rank}
            </span>
        );
    };

    return (
        <div
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
                backdrop-blur-sm
            "
        >
            <div className="flex items-center gap-3">
                <div className="w-8 text-center">
                    {getRankDisplay()}
                </div>

                <span className="font-semibold text-white">
                    {username}
                </span>
            </div>

            <span className="font-mono text-sm font-bold text-[#39FF14]">
                {totalError.toFixed(3)}s
            </span>
        </div>
    );
}