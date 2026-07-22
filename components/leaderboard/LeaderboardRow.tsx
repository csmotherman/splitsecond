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
    const isGold = rank === 1;
    const isSilver = rank === 2;
    const isBronze = rank === 3;

    const rowStyle = isGold
        ? "border-[#FFD700]/40 bg-[#FFD700]/[0.05] shadow-[0_0_18px_rgba(255,215,0,.08)]"
        : isSilver
            ? "border-[#E5E7EB]/25 bg-[#E5E7EB]/[0.035] shadow-[0_0_14px_rgba(255,255,255,.05)]"
            : isBronze
                ? "border-[#CD7F32]/30 bg-[#CD7F32]/[0.04] shadow-[0_0_14px_rgba(205,127,50,.08)]"
                : "border-white/5 bg-black/20";

    const rankStyle = isGold
        ? "text-[#FFD700] animate-gold"
        : isSilver
            ? "text-[#E5E7EB] animate-silver"
            : isBronze
                ? "text-[#CD7F32] animate-bronze"
                : "text-slate-500";

    const usernameStyle = isGold
        ? "text-[#FFD700] animate-gold"
        : isSilver
            ? "text-[#F8FAFC] animate-silver"
            : isBronze
                ? "text-[#CD7F32] animate-bronze"
                : "text-white";

    return (
        <div
            className={`
                flex
                items-center
                justify-between
                rounded-2xl
                border
                px-4
                py-3
                transition-all
                duration-300
                hover:-translate-y-[1px]
                hover:scale-[1.015]
                hover:border-[#39FF14]/25
                ${rowStyle}
            `}
        >
            <div className="flex items-center gap-4 min-w-0">

                <div
                    className={`
                        w-8
                        text-center
                        font-college
                        text-4xl
                        leading-none
                        ${rankStyle}
                    `}
                >
                    {rank}
                </div>

                <span
                    className={`
                        truncate
                        text-lg
                        font-black
                        tracking-wide
                        ${usernameStyle}
                    `}
                >
                    {username}
                </span>
            </div>

            <div className="flex items-baseline gap-0.5 shrink-0">
                <span
                    className="
                        font-college
                        text-3xl
                        leading-none
                        text-[#39FF14]
                        drop-shadow-[0_0_12px_rgba(57,255,20,.35)]
                    "
                >
                    {totalError.toFixed(3)}
                </span>

                <span className="text-sm font-semibold text-[#39FF14]/80">
                    s
                </span>
            </div>
        </div>
    );
}