"use client";

import { useRef, useState } from "react";

type Props = {
    targetMs: number;
    onSubmit: (elapsedMs: number) => void;
};

export default function DuelTimer({ targetMs, onSubmit }: Props) {
    const startRef = useRef<number | null>(null);
    const [started, setStarted] = useState(false);
    const [stopped, setStopped] = useState(false);

    function handleStart() {
        if (started || stopped) return;
        startRef.current = performance.now();
        setStarted(true);
    }

    function handleStop() {
        if (startRef.current === null || stopped) return;
        const elapsed = Math.round(performance.now() - startRef.current);
        setStopped(true);
        onSubmit(elapsed);
    }

    return (
        <section className="mx-auto flex min-h-[65vh] w-full max-w-md flex-col items-center justify-center text-center text-white">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-white/40">Stop at</p>
            <div className="mt-4 font-mono text-7xl font-black tracking-tight text-neon-lime drop-shadow-[0_0_18px_rgba(57,255,20,0.35)]">
                {(targetMs / 1000).toFixed(3)}
            </div>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-white/35">seconds</p>

            <button
                type="button"
                onClick={started ? handleStop : handleStart}
                disabled={stopped}
                className={`mt-14 flex h-44 w-44 items-center justify-center rounded-full border-4 text-3xl font-black uppercase tracking-wider transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${started ? "border-red-400/70 bg-red-500/15 text-red-300 shadow-[0_0_40px_rgba(248,113,113,0.18)]" : "border-neon-lime/70 bg-neon-lime/10 text-neon-lime shadow-[0_0_40px_rgba(57,255,20,0.18)]"}`}
            >
                {stopped ? "Locked" : started ? "Stop" : "Start"}
            </button>

            <p className="mt-10 max-w-xs text-sm leading-6 text-white/40">
                {started ? "The timer is hidden. Stop when you think you reached the target." : "Press start when you are ready. The timer disappears once it begins."}
            </p>
        </section>
    );
}
