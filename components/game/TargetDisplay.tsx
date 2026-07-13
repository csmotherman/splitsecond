"use client";

type TargetDisplayProps = {
    target: number;
};

export default function TargetDisplay({
    target,
}: TargetDisplayProps) {
    return (
        <div className="text-center py-1">
            <h1 className="text-5xl sm:text-6xl font-black text-white leading-none">
                {target.toFixed(2)}
            </h1>

            <p className="mt-1 text-xs font-bold tracking-[0.35em] text-zinc-500 uppercase">
                TARGET
            </p>
        </div>
    );
}