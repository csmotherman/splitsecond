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
    const yourError =
        Math.abs(
            targetMs -
            yourTime
        );

    const opponentError =
        Math.abs(
            targetMs -
            opponentTime
        );

    const youWon =
        yourError <
        opponentError;

    const tie =
        yourError ===
        opponentError;

    const difference =
        Math.abs(
            yourError -
            opponentError
        );

    return (
        <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 py-8 text-white">
            {/* SCOREBOARD */}

            <div className="text-center">
                <div className="text-xs font-black uppercase tracking-[0.35em] text-white/40">
                    Round {roundNumber}
                </div>

                <div className="mt-4 text-8xl font-black text-neon-lime">
                    {yourWins}
                    <span className="mx-4 text-white/30">
                        -
                    </span>
                    {opponentWins}
                </div>

                <div className="mt-2 text-sm font-black uppercase tracking-[0.25em] text-white/50">
                    Match Score
                </div>
            </div>

            {/* RESULT BANNER */}

            <div
                className={`mt-10 rounded-3xl border p-8 text-center ${tie
                        ? "border-yellow-500/30 bg-yellow-500/10"
                        : youWon
                            ? "border-neon-lime/30 bg-neon-lime/10"
                            : "border-red-500/30 bg-red-500/10"
                    }`}
            >
                <div className="text-sm font-black uppercase tracking-[0.35em] text-white/50">
                    Round Result
                </div>

                <div
                    className={`mt-3 text-6xl font-black ${tie
                            ? "text-yellow-400"
                            : youWon
                                ? "text-neon-lime"
                                : "text-red-400"
                        }`}
                >
                    {tie
                        ? "DRAW"
                        : youWon
                            ? "VICTORY"
                            : "DEFEAT"}
                </div>
            </div>

            {/* TARGET */}

            <div className="mt-10 text-center">
                <div className="text-xs font-black uppercase tracking-[0.3em] text-white/40">
                    Target Time
                </div>

                <div className="mt-3 text-6xl font-black text-neon-lime">
                    {(
                        targetMs /
                        1000
                    ).toFixed(
                        3
                    )}
                </div>
            </div>

            {/* PLAYER CARDS */}

            <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="rounded-3xl border border-neon-lime/20 bg-brand-card p-5">
                    <div className="text-sm font-black uppercase tracking-[0.25em] text-white/50">
                        You
                    </div>

                    <div className="mt-4 text-4xl font-black">
                        {(
                            yourTime /
                            1000
                        ).toFixed(
                            3
                        )}
                    </div>

                    <div className="mt-1 text-sm text-white/50">
                        Time
                    </div>

                    <div className="mt-6 text-3xl font-black text-neon-lime">
                        ±
                        {(
                            yourError /
                            1000
                        ).toFixed(
                            3
                        )}
                    </div>

                    <div className="text-sm text-white/50">
                        Error
                    </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-brand-card p-5">
                    <div className="text-sm font-black uppercase tracking-[0.25em] text-white/50">
                        Opponent
                    </div>

                    <div className="mt-4 text-4xl font-black">
                        {(
                            opponentTime /
                            1000
                        ).toFixed(
                            3
                        )}
                    </div>

                    <div className="mt-1 text-sm text-white/50">
                        Time
                    </div>

                    <div className="mt-6 text-3xl font-black text-neon-lime">
                        ±
                        {(
                            opponentError /
                            1000
                        ).toFixed(
                            3
                        )}
                    </div>

                    <div className="text-sm text-white/50">
                        Error
                    </div>
                </div>
            </div>

            {/* MARGIN */}

            <div className="mt-8 rounded-3xl border border-white/10 bg-brand-card p-6 text-center">
                <div className="text-xs font-black uppercase tracking-[0.25em] text-white/40">
                    Margin Of Victory
                </div>

                <div className="mt-3 text-5xl font-black text-neon-lime">
                    {(
                        difference /
                        1000
                    ).toFixed(
                        3
                    )}
                </div>

                <div className="mt-2 text-sm text-white/50">
                    Seconds
                </div>
            </div>

            {/* NEXT ROUND */}

            <div className="mt-8 text-center">
                <div className="inline-flex items-center rounded-full border border-neon-lime/30 bg-neon-lime/10 px-6 py-3 text-sm font-black uppercase tracking-[0.2em] text-neon-lime">
                    Waiting For Next Round...
                </div>
            </div>
        </div>
    );
}