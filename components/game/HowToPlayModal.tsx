"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Target, Timer, Trophy } from "lucide-react";

type Props = {
    open: boolean;
    onStart: () => void;
};

export default function HowToPlayModal({
    open,
    onStart,
}: Props) {
    const router = useRouter();
    const [dontShowAgain, setDontShowAgain] = useState(true);

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4">
            <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#12151E] p-6 shadow-2xl">

                <h2 className="text-center font-college text-4xl text-white">
                    CAN YOU BEAT
                    <span className="block text-[#39FF14]">
                        YOUR INTERNAL CLOCK?
                    </span>
                </h2>

                <p className="mt-3 text-center text-sm leading-relaxed text-zinc-300">
                    Most people think they're good at counting time.
                    <br />
                    <span className="font-semibold text-white">
                        This game puts that to the test.
                    </span>
                </p>

                <div className="mt-6 space-y-4">

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                        <div className="mb-2 flex items-center gap-2 text-[#39FF14]">
                            <Target size={18} />
                            <span className="font-bold">
                                Your Goal
                            </span>
                        </div>

                        <p className="text-sm text-zinc-300">
                            Match the hidden timer as closely as possible to
                            the target time.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                        <div className="mb-2 flex items-center gap-2 text-[#39FF14]">
                            <Timer size={18} />
                            <span className="font-bold">
                                Example
                            </span>
                        </div>

                        <div className="space-y-2 text-center">

                            <div>
                                <div className="text-[10px] uppercase tracking-widest text-zinc-500">
                                    Target
                                </div>

                                <div className="font-college text-4xl text-[#39FF14]">
                                    3.27
                                </div>
                            </div>

                            <div className="text-sm text-zinc-400">
                                You stopped at
                            </div>

                            <div className="font-college text-3xl text-white">
                                3.31
                            </div>

                            <div className="font-bold text-red-400">
                                +0.04 seconds
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                        <div className="mb-2 flex items-center gap-2 text-[#39FF14]">
                            <Trophy size={18} />
                            <span className="font-bold">
                                Win the Day
                            </span>
                        </div>

                        <ul className="space-y-1 text-sm text-zinc-300">
                            <li>• Play 5 rounds.</li>
                            <li>• Every error is added together.</li>
                            <li>
                                • Lowest total error wins the Daily
                                Challenge.
                            </li>
                        </ul>
                    </div>
                </div>

                <label className="mt-5 flex items-center gap-2 text-sm text-zinc-400">
                    <input
                        type="checkbox"
                        checked={dontShowAgain}
                        onChange={(e) =>
                            setDontShowAgain(e.target.checked)
                        }
                    />
                    Don't show again
                </label>

                <div className="mt-6 flex flex-col gap-3">
                    <button
                        onClick={() =>
                            router.push("/how-to-play")
                        }
                        className="rounded-xl border border-white/10 py-3 font-semibold text-white transition hover:bg-white/5"
                    >
                        Learn More
                    </button>

                    <button
                        onClick={handleStart}
                        className="rounded-xl bg-[#39FF14] py-3 font-bold text-black transition hover:brightness-110"
                    >
                        Play Now
                    </button>
                </div>

            </div>
        </div>
    );
}