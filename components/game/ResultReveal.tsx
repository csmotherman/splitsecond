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
        if (error <= 0.01) {
            return {
                label: "BULLSEYE",
                color: "text-yellow-400",
                glow: "drop-shadow-[0_0_25px_rgba(250,204,21,.85)]",
            };
        }

        if (error <= 0.05) {
            return {
                label: "EXCELLENT",
                color: "text-green-400",
                glow: "drop-shadow-[0_0_25px_rgba(74,222,128,.85)]",
            };
        }

        if (error <= 0.15) {
            return {
                label: "GOOD",
                color: "text-cyan-400",
                glow: "drop-shadow-[0_0_25px_rgba(34,211,238,.85)]",
            };
        }

        if (error <= 0.3) {
            return {
                label: "OFF",
                color: "text-orange-400",
                glow: "drop-shadow-[0_0_25px_rgba(251,146,60,.85)]",
            };
        }

        return {
            label: "MISS",
            color: "text-red-400",
            glow: "drop-shadow-[0_0_25px_rgba(248,113,113,.85)]",
        };
    };

    const rating = getRating();

    return (
        <div className="text-center">
            <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-500">
                YOUR TIME
            </p>

            <div
                className={`
                    mt-2
                    text-7xl
                    sm:text-8xl
                    font-black
                    tracking-tighter
                    tabular-nums
                    text-green-400
                    drop-shadow-[0_0_30px_rgba(74,222,128,.9)]
                `}
            >
                {actual.toFixed(2)}
            </div>

            <p className="mt-1 text-sm uppercase tracking-[0.3em] text-zinc-600">
                SECONDS
            </p>

            <div
                className={`
                    mt-5
                    text-3xl
                    font-black
                    tabular-nums
                    ${rating.color}
                    ${rating.glow}
                `}
            >
                +{error.toFixed(2)}
            </div>

            <div
                className={`
                    mt-2
                    text-lg
                    font-black
                    tracking-[0.2em]
                    uppercase
                    ${rating.color}
                `}
            >
                {rating.label}
            </div>

        </div>
    );
}