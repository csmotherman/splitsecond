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
        <div className="flex items-center justify-center px-4">
            {Array.from({ length: totalRounds }).map((_, index) => {
                const completed = index < currentRound;
                const current = index === currentRound;

                return (
                    <div
                        key={index}
                        className="flex items-center"
                    >
                        <div
                            className={`
                                relative
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                border-2
                                font-black
                                text-sm
                                transition-all
                                duration-300

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
                                    size={18}
                                    strokeWidth={3}
                                />
                            ) : (
                                index + 1
                            )}

                            {current && (
                                <div className="absolute inset-0 rounded-full animate-ping bg-[#39FF14]/30" />
                            )}
                        </div>

                        {index < totalRounds - 1 && (
                            <div
                                className={`
                                    mx-2
                                    h-1
                                    w-10
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
            })}
        </div>
    );
}