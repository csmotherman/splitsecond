type Props = {
    roundNumber: number;

    targetMs: number;

    yourTime: number;
    opponentTime: number;

    yourWins: number;
    opponentWins: number;
};

export default function DuelReveal({
    roundNumber,
    targetMs,
    yourTime,
    opponentTime,
    yourWins,
    opponentWins,
}: Props) {
    const yourError = Math.abs(
        targetMs - yourTime
    );

    const opponentError = Math.abs(
        targetMs - opponentTime
    );

    const youWon =
        yourError < opponentError;

    const tie =
        yourError === opponentError;

    const difference = Math.abs(
        yourError - opponentError
    );

    return (
        <div className="flex min-h-screen flex-col justify-between bg-brand-bg px-5 py-6 text-white">
            {/* HEADER */}

            <div className="text-center">
                <div className="text-[11px] font-black uppercase tracking-[0.35em] text-white/40">
                    Round {roundNumber}
                </div>

                <div className="mt-3 flex items-center justify-center gap-4">
                    <span className="text-4xl font-black text-neon-lime">
                        {yourWins}
                    </span>

                    <span className="text-lg font-black text-white/25">
                        VS
                    </span>

                    <span className="text-4xl font-black text-white">
                        {opponentWins}
                    </span>
                </div>
            </div>

            {/* HERO */}

            <div className="text-center">
                <div
                    className={`mx-auto inline-flex rounded-full px-5 py-2 text-xs font-black uppercase tracking-[0.25em]
                    ${tie
                            ? "bg-yellow-500/15 text-yellow-400"
                            : youWon
                                ? "bg-neon-lime/15 text-neon-lime"
                                : "bg-red-500/15 text-red-400"
                        }`}
                >
                    {tie
                        ? "DRAW"
                        : youWon
                            ? "VICTORY"
                            : "DEFEAT"}
                </div>

                <div
                    className={`mt-5 text-6xl font-black tracking-tight
                    ${tie
                            ? "text-yellow-400"
                            : youWon
                                ? "text-neon-lime"
                                : "text-red-400"
                        }`}
                >
                    {tie
                        ? "TIED"
                        : youWon
                            ? "YOU WIN"
                            : "YOU LOSE"}
                </div>

                <div className="mt-8 text-[10px] font-black uppercase tracking-[0.35em] text-white/40">
                    Target Time
                </div>

                <div className="mt-2 font-mono text-7xl font-black text-neon-lime">
                    {(
                        targetMs / 1000
                    ).toFixed(3)}
                </div>

                <div className="mt-8">
                    <div className="text-[10px] font-black uppercase tracking-[0.35em] text-white/40">
                        Margin
                    </div>

                    <div className="mt-2 text-3xl font-black text-white">
                        {(
                            difference / 1000
                        ).toFixed(3)}
                        s
                    </div>
                </div>
            </div>

            {/* PLAYER COMPARISON */}

            <div className="grid grid-cols-2 gap-3">
                <div
                    className={`rounded-3xl border p-4
                    ${yourError <=
                            opponentError
                            ? "border-neon-lime/30 bg-neon-lime/10"
                            : "border-white/10 bg-brand-card"
                        }`}
                >
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-white/50">
                        You
                    </div>

                    <div className="mt-4 text-3xl font-black">
                        {(
                            yourTime / 1000
                        ).toFixed(3)}
                    </div>

                    <div className="text-xs text-white/40">
                        Time
                    </div>

                    <div className="mt-4 text-xl font-black text-neon-lime">
                        ±
                        {(
                            yourError /
                            1000
                        ).toFixed(3)}
                    </div>

                    <div className="text-xs text-white/40">
                        Error
                    </div>
                </div>

                <div
                    className={`rounded-3xl border p-4
                    ${opponentError <
                            yourError
                            ? "border-neon-lime/30 bg-neon-lime/10"
                            : "border-white/10 bg-brand-card"
                        }`}
                >
                    <div className="text-xs font-black uppercase tracking-[0.2em] text-white/50">
                        Opponent
                    </div>

                    <div className="mt-4 text-3xl font-black">
                        {(
                            opponentTime / 1000
                        ).toFixed(3)}
                    </div>

                    <div className="text-xs text-white/40">
                        Time
                    </div>

                    <div className="mt-4 text-xl font-black text-neon-lime">
                        ±
                        {(
                            opponentError /
                            1000
                        ).toFixed(3)}
                    </div>

                    <div className="text-xs text-white/40">
                        Error
                    </div>
                </div>
            </div>

            {/* FOOTER */}

            <div className="mt-6 text-center">
                <div className="inline-flex rounded-full border border-neon-lime/20 bg-neon-lime/10 px-5 py-2 text-xs font-black uppercase tracking-[0.25em] text-neon-lime">
                    Waiting For Next Round...
                </div>
            </div>
        </div>
    );
}