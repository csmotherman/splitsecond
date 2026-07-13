"use client";

type ResultRevealProps = {
    target: number;
    actual: number;
    error: number;
};

export default function ResultReveal({
    target,
    actual,
    error,
}: ResultRevealProps) {
    const getRating = () => {
        if (error <= 0.05) return "Perfect";
        if (error <= 0.15) return "Excellent";
        if (error <= 0.30) return "Great";
        if (error <= 0.50) return "Good";
        return "Miss";
    };

    const rating = getRating();

    return (
        <div className="rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-xl">
            <div className="text-center">
                <p className="text-sm uppercase tracking-wider text-zinc-400">
                    Round Complete
                </p>

                <h2 className="mt-2 text-3xl font-bold text-white">
                    {rating}
                </h2>
            </div>

            <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between rounded-2xl bg-zinc-800/50 px-4 py-4">
                    <span className="text-zinc-400">Target</span>

                    <span className="text-xl font-bold text-white">
                        {target.toFixed(2)}s
                    </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-zinc-800/50 px-4 py-4">
                    <span className="text-zinc-400">Your Time</span>

                    <span className="text-xl font-bold text-white">
                        {actual.toFixed(2)}s
                    </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-green-500/10 px-4 py-4 border border-green-500/20">
                    <span className="text-green-400">Error</span>

                    <span className="text-2xl font-bold text-green-400">
                        {error.toFixed(2)}s
                    </span>
                </div>
            </div>
        </div>
    );
}