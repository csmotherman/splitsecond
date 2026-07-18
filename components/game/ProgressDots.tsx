"use client";

import { Check } from "lucide-react";

type ProgressDotsProps = {
    currentRound: number;
    totalRounds: number;
};

export default function ProgressDots({
    currentRound,
    totalRounds,
}: ProgressDotsProps) {
    return (
        <div className="mx-auto flex w-full max-w-lg items-center justify-center px-3">
            {Array.from({ length: totalRounds }).map(
                (_, index) => {
                    const completed =
                        index < currentRound;

                    const current =
                        index === currentRound;

                    return (
                        <div
                            key={index}
                            className="flex flex-1 items-center"
                        >
                            {/* Circle */}
                            <div
                                className={`
                                    relative
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    border-2
                                    font-black
                                    text-xs
                                    transition-all
                                    duration-300

                                    sm:h-10
                                    sm:w-10
                                    sm:text-sm

                                    ${current
                                        ? `
                                                scale-110
                                                border-[#39FF14]
                                                bg-[#39FF14]
                                                text-black
                                                shadow-[0_0_18px_rgba(57,255,20,.6)]
                                            `
                                        : completed
                                            ? `
                                                border-green-500
                                                bg-green-600
                                                text-white
                                            `
                                            : `
                                                border-zinc-700
                                                bg-zinc-900
                                                text-zinc-500
                                            `
                                    }
                                `}
                            >
                                {completed ? (
                                    <Check
                                        size={16}
                                        strokeWidth={3}
                                        className="sm:h-[18px] sm:w-[18px]"
                                    />
                                ) : (
                                    index + 1
                                )}

                                {current && (
                                    <div className="absolute inset-0 rounded-full bg-[#39FF14]/30 animate-ping" />
                                )}
                            </div>

                            {/* Connector */}
                            {index <
                                totalRounds - 1 && (
                                    <div
                                        className={`
                                        mx-2
                                        h-1
                                        flex-1
                                        rounded-full
                                        transition-all
                                        duration-300

                                        ${completed
                                                ? "bg-[#39FF14]"
                                                : "bg-zinc-800"
                                            }
                                    `}
                                    />
                                )}
                        </div>
                    );
                }
            )}
        </div>
    );
}