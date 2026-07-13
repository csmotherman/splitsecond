"use client";

type RoundResult = {
    target: number;
    actual: number;
    error: number;
};

type FinalResultsProps = {
    results: RoundResult[];
    totalError: number;
    mode: "normal" | "extreme";
    onSubmit?: () => void;
};

export default function FinalResults({
    results,
    totalError,
    mode,
    onSubmit,
}: FinalResultsProps) {
    return (
        <div className="w-full max-w-xl mx-auto">
            <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-xl">
                <div className="text-center">
                    <p className="text-sm uppercase tracking-wider text-zinc-400">
                        Daily Challenge Complete
                    </p>

                    <h2 className="mt-2 text-4xl font-bold text-white">
                        {totalError.toFixed(2)}
                    </h2>

                    <p className="mt-2 text-zinc-400">
                        Total Error ({mode === "normal" ? "Normal" : "Extreme"})
                    </p>
                </div>

                <div className="mt-8 space-y-3">
                    {results.map((result, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between rounded-2xl bg-zinc-800/50 px-4 py-3"
                        >
                            <div>
                                <div className="font-semibold text-white">
                                    Round {index + 1}
                                </div>

                                <div className="text-sm text-zinc-400">
                                    Target: {result.target.toFixed(2)}s
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-sm text-zinc-400">
                                    Actual: {result.actual.toFixed(2)}s
                                </div>

                                <div className="font-bold text-green-400">
                                    {result.error.toFixed(2)}s
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {onSubmit && (
                    <button
                        onClick={onSubmit}
                        className="
              mt-8
              w-full
              rounded-2xl
              bg-green-500
              py-4
              text-lg
              font-bold
              text-white
              transition
              hover:bg-green-400
              active:scale-[0.98]
            "
                    >
                        Submit Score
                    </button>
                )}
            </div>
        </div>
    );
}