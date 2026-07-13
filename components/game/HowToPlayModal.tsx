"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
    open: boolean;
    onStart: () => void;
};

export default function HowToPlayModal({
    open,
    onStart,
}: Props) {
    const router = useRouter();
    const [dontShowAgain, setDontShowAgain] =
        useState(true);

    if (!open) return null;

    function handleStart() {
        if (dontShowAgain) {
            localStorage.setItem(
                "splitsecond-how-to-play-seen",
                "true"
            );
        }

        onStart();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5">
            <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#12151E] p-6">
                <h2 className="text-center text-3xl font-black text-white">
                    HOW TO PLAY
                </h2>

                <div className="mt-6 text-center">
                    <div className="text-xs uppercase tracking-widest text-zinc-500">
                        Target
                    </div>

                    <div className="font-college text-6xl text-[#39FF14]">
                        3.27
                    </div>
                </div>

                <p className="mt-6 text-center text-sm text-zinc-300">
                    Tap START, then STOP when you think
                    the target time has passed.
                </p>

                <p className="mt-3 text-center text-sm text-zinc-400">
                    Complete 5 rounds. Lowest total
                    error wins.
                </p>

                <label className="mt-5 flex items-center gap-2 text-sm text-zinc-400">
                    <input
                        type="checkbox"
                        checked={dontShowAgain}
                        onChange={(e) =>
                            setDontShowAgain(
                                e.target.checked
                            )
                        }
                    />
                    Don't show again
                </label>

                <div className="mt-6 flex gap-3">
                    <button
                        onClick={() =>
                            router.push("/how-to-play")
                        }
                        className="flex-1 rounded-xl border border-white/10 py-3 text-white"
                    >
                        View More
                    </button>

                    <button
                        onClick={handleStart}
                        className="flex-1 rounded-xl bg-[#39FF14] py-3 font-bold text-black"
                    >
                        Let's Go
                    </button>
                </div>
            </div>
        </div>
    );
}