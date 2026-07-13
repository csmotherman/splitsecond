"use client";

type TargetDisplayProps = {
    target: number;
};

export default function TargetDisplay({
    target,
}: TargetDisplayProps) {
    return (
        <div className="text-center">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-zinc-500">
                Target
            </p>

            <h1 className="text-7xl font-black text-white">
                {target.toFixed(2)}
            </h1>

            <p className="mt-2 text-2xl font-semibold text-green-400">
                seconds
            </p>
        </div>
    );
}