"use client";

type GameMode =
    | "daily"
    | "practice"
    | "unlimited";

type TargetHeaderProps = {
    currentRound: number;
    totalRounds: number;
    mode: "normal" | "extreme";
    gameMode?: GameMode;
};

export default function TargetHeader({
    currentRound,
    totalRounds,
    mode,
    gameMode = "daily",
}: TargetHeaderProps) {
    const title =
        gameMode === "unlimited"
            ? "Unlimited Mode"
            : gameMode === "practice"
                ? "Practice Mode"
                : "Daily Challenge";

    return (
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-zinc-500">
                    {title}
                </p>

                <h2 className="text-lg font-bold text-white">
                    Round {currentRound + 1} / {totalRounds}
                </h2>
            </div>

            <div
                className={`
                    rounded-full px-4 py-2 text-sm font-bold
                    ${mode === "normal"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }
                `}
            >
                {mode === "normal"
                    ? "NORMAL"
                    : "EXTREME"}
            </div>
        </div>
    );
}