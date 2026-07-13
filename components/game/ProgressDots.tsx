"use client";

type ProgressDotsProps = {
    currentRound: number;
    totalRounds: number;
};

export default function ProgressDots({
    currentRound,
    totalRounds,
}: ProgressDotsProps) {
    return (
        <div className="flex items-center justify-center gap-3">
            {Array.from({ length: totalRounds }).map((_, index) => {
                const isCompleted = index < currentRound;
                const isCurrent = index === currentRound;

                return (
                    <div
                        key={index}
                        className={`
              h-3 w-3 rounded-full transition-all duration-300
              ${isCurrent
                                ? "bg-green-500 scale-125"
                                : isCompleted
                                    ? "bg-green-400"
                                    : "bg-zinc-700"
                            }
            `}
                    />
                );
            })}
        </div>
    );
}