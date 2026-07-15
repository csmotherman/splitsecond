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
    const yourError = Math.abs(targetMs - yourTime);
    const opponentError = Math.abs(targetMs - opponentTime);

    const youWon = yourError < opponentError;
    const opponentWon = opponentError < yourError;
    const tie = yourError === opponentError;

    const difference = Math.abs(yourError - opponentError);

    // Helper to keep markup clean
    const formatTime = (ms: number) => (ms / 1000).toFixed(3);

    return (
        <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-4 py-8 sm:px-6 text-white">

            {/* SCOREBOARD */}
            <div className="text-center">
                <div className="text-[10px] font-black uppercase tracking-[0.35em] text-white/40 sm:text-xs">
                    Round {roundNumber}
                </div>

                <div className="mt-3 text-6xl font-black text-neon-lime sm:mt-4 sm:text-8xl">
                    {yourWins}
                    <span className="mx-3 text-white/30 sm:mx-4">-</span>
                    {opponentWins}
                </div>

                <div className="mt-1 text-xs font-black uppercase tracking-[0.25em] text-white/50 sm:mt-2 sm:text-sm">
                    Match Score
                </div>
            </div>

            {/* RESULT BANNER */}
            <div
                className={`mt-8 rounded-2xl border p-6 text-center sm:mt-10 sm:rounded-3xl sm:p-8 ${tie
                        ? "border-yellow-500/30 bg-yellow-500/10"
                        : youWon
                            ? "border-neon-lime/30 bg-neon-lime/10"
                            : "border-red-500/30 bg-red-500/10"
                    }`}
            >
                <div className="text-xs font-black uppercase tracking-[0.35em] text-white/50 sm:text-sm">
                    Round Result
                </div>

                <div
                    className={`mt-2 text-4xl font-black sm:mt-3 sm:text-6xl ${tie
                            ? "text-yellow-400"
                            : youWon
                                ? "text-neon-lime"
                                : "text-red-400"
                        }`}
                >
                    {tie ? "DRAW" : youWon ? "VICTORY" : "DEFEAT"}
                </div>
            </div>

            {/* TARGET */}
            <div className="mt-8 text-center sm:mt-10">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 sm:text-xs">
                    Target Time
                </div>

                <div className="mt-2 text-5xl font-black text-neon-lime sm:mt-3 sm:text-6xl">
                    {formatTime(targetMs)}
                </div>
            </div>

            {/* PLAYER CARDS */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4">
                {/* You */}
                <div
                    className={`flex flex-col items-center rounded-2xl border bg-brand-card p-4 sm:items-start sm:rounded-3xl sm:p-5 ${youWon ? "border-neon-lime/40" : "border-white/10"
                        }`}
                >
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50 sm:text-sm">
                        You
                    </div>
                    <div className="mt-3 text-3xl font-black sm:mt-4 sm:text-4xl">
                        {formatTime(yourTime)}
                    </div>
                    <div className="mt-1 text-[10px] text-white/50 sm:text-sm">Time</div>

                    <div className={`mt-5 text-2xl font-black sm:mt-6 sm:text-3xl ${youWon ? "text-neon-lime" : tie ? "text-yellow-400" : "text-red-400"
                        }`}>
                        ±{formatTime(yourError)}
                    </div>
                    <div className="text-[10px] text-white/50 sm:text-sm">Error</div>
                </div>

                {/* Opponent */}
                <div
                    className={`flex flex-col items-center rounded-2xl border bg-brand-card p-4 sm:items-start sm:rounded-3xl sm:p-5 ${opponentWon ? "border-red-500/40" : "border-white/10"
                        }`}
                >
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50 sm:text-sm">
                        Opponent
                    </div>
                    <div className="mt-3 text-3xl font-black sm:mt-4 sm:text-4xl">
                        {formatTime(opponentTime)}
                    </div>
                    <div className="mt-1 text-[10px] text-white/50 sm:text-sm">Time</div>

                    <div className={`mt-5 text-2xl font-black sm:mt-6 sm:text-3xl ${opponentWon ? "text-red-400" : tie ? "text-yellow-400" : "text-neon-lime"
                        }`}>
                        ±{formatTime(opponentError)}
                    </div>
                    <div className="text-[10px] text-white/50 sm:text-sm">Error</div>
                </div>
            </div>

            {/* MARGIN (Hidden on tie to save mobile space) */}
            {!tie && (
                <div className="mt-6 rounded-2xl border border-white/10 bg-brand-card p-5 text-center sm:mt-8 sm:rounded-3xl sm:p-6">
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 sm:text-xs">
                        Margin Of Victory
                    </div>
                    <div className="mt-2 text-4xl font-black text-white sm:mt-3 sm:text-5xl">
                        {formatTime(difference)}
                    </div>
                    <div className="mt-1 text-[10px] text-white/50 sm:mt-2 sm:text-sm">
                        Seconds
                    </div>
                </div>
            )}

            {/* NEXT ROUND */}
            <div className="mt-8 pb-6 text-center sm:mt-10">
                <div className="inline-flex items-center justify-center rounded-full border border-neon-lime/30 bg-neon-lime/10 px-5 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-neon-lime sm:text-sm">
                    Waiting For Next Round...
                </div>
            </div>

        </div>
    );
}