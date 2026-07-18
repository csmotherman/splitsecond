"use client";

import { motion } from "framer-motion";
import { Infinity as InfinityIcon, Target } from "lucide-react";

type RoundResult = {
    target: number;
    actual: number;
    error: number;
};

type UnlimitedResultsProps = {
    results: RoundResult[];
    totalError: number;
};

type GradeConfig = {
    grade: string;
    subtext: string;
    emoji: string;
    color: string;
    glowColor: string;
    bgGradient: string;
    borderGlow: string;
    isShining?: boolean;
};

export default function UnlimitedResults({
    results,
    totalError,
}: UnlimitedResultsProps) {
    const getGrade = (): GradeConfig => {
        if (totalError <= 0.25) {
            return {
                grade: "GOAT",
                subtext: "PERFECT TIMING",
                emoji: "👑",
                color: "from-amber-200 via-yellow-400 to-amber-500",
                glowColor: "rgba(245, 158, 11, 0.45)",
                bgGradient:
                    "from-amber-500/20 via-yellow-500/10 to-amber-950/40",
                borderGlow:
                    "border-amber-400/50 shadow-amber-500/20",
                isShining: true,
            };
        }

        if (totalError <= 0.5) {
            return {
                grade: "S+",
                subtext: "GODLIKE",
                emoji: "💎",
                color: "from-cyan-200 via-teal-300 to-emerald-300",
                glowColor: "rgba(6, 182, 212, 0.4)",
                bgGradient:
                    "from-cyan-500/20 via-teal-500/10 to-cyan-950/40",
                borderGlow:
                    "border-cyan-400/50 shadow-cyan-500/20",
                isShining: true,
            };
        }

        if (totalError <= 0.75) {
            return {
                grade: "S",
                subtext: "INSANE ACCURACY",
                emoji: "💎",
                color: "from-cyan-300 to-teal-400",
                glowColor: "rgba(6, 182, 212, 0.35)",
                bgGradient:
                    "from-cyan-500/20 via-teal-500/10 to-cyan-950/40",
                borderGlow: "border-cyan-400/40",
            };
        }

        if (totalError <= 1.0) {
            return {
                grade: "A+",
                subtext: "LEGENDARY",
                emoji: "🏆",
                color: "from-purple-300 to-fuchsia-400",
                glowColor: "rgba(168, 85, 247, 0.35)",
                bgGradient:
                    "from-purple-500/20 via-fuchsia-500/10 to-purple-950/40",
                borderGlow: "border-purple-400/40",
            };
        }

        if (totalError <= 1.5) {
            return {
                grade: "A",
                subtext: "SUPER SHARP",
                emoji: "⚡",
                color: "from-purple-400 to-pink-400",
                glowColor: "rgba(168, 85, 247, 0.25)",
                bgGradient:
                    "from-purple-500/15 via-fuchsia-500/10 to-purple-950/30",
                borderGlow: "border-purple-400/30",
            };
        }

        if (totalError <= 2.0) {
            return {
                grade: "B",
                subtext: "GREAT TIMING",
                emoji: "✨",
                color: "from-emerald-300 to-teal-400",
                glowColor: "rgba(16, 185, 129, 0.25)",
                bgGradient:
                    "from-emerald-500/15 via-teal-500/10 to-emerald-950/30",
                borderGlow: "border-emerald-400/30",
            };
        }

        if (totalError <= 3.0) {
            return {
                grade: "C",
                subtext: "SOLID PERFORMANCE",
                emoji: "👍",
                color: "from-blue-400 to-indigo-500",
                glowColor: "rgba(59, 130, 246, 0.15)",
                bgGradient:
                    "from-blue-500/10 via-zinc-900/10 to-zinc-950/30",
                borderGlow: "border-blue-500/20",
            };
        }

        if (totalError <= 5.0) {
            return {
                grade: "D",
                subtext: "ROOM TO IMPROVE",
                emoji: "⚠️",
                color: "from-orange-400 to-amber-500",
                glowColor: "rgba(249, 115, 22, 0.15)",
                bgGradient:
                    "from-orange-500/10 via-zinc-900/10 to-zinc-950/30",
                borderGlow: "border-orange-500/20",
            };
        }

        return {
            grade: "F",
            subtext: "LOST IN TIME",
            emoji: "💀",
            color: "from-rose-400 to-red-600",
            glowColor: "rgba(244, 63, 94, 0.25)",
            bgGradient:
                "from-rose-950/30 via-red-950/20 to-zinc-950/50",
            borderGlow: "border-rose-500/30",
        };
    };

    const getRoundColor = (error: number) => {
        if (error <= 0.02) {
            return "bg-emerald-500/10 text-emerald-400";
        }

        if (error <= 0.08) {
            return "bg-cyan-500/10 text-cyan-400";
        }

        if (error <= 0.2) {
            return "bg-amber-500/10 text-amber-400";
        }

        return "bg-rose-500/10 text-rose-400";
    };

    const resultGrade = getGrade();

    return (
        <div className="mx-auto w-full max-w-sm select-none px-4 py-6">
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 15,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.35,
                    ease: "easeOut",
                }}
                style={{
                    boxShadow: `0 0 50px -10px ${resultGrade.glowColor}`,
                }}
                className={`relative overflow-hidden rounded-[2rem] border bg-gradient-to-b ${resultGrade.bgGradient} ${resultGrade.borderGlow} bg-zinc-950/90 p-6 shadow-2xl backdrop-blur-2xl`}
            >
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-white/[0.03] blur-3xl" />

                    <div className="absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-white/[0.02] blur-3xl" />
                </div>

                <div className="relative">
                    <div className="mb-4 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-zinc-300">
                            <InfinityIcon className="h-3.5 w-3.5 text-[#39FF14]" />
                            Unlimited Mode
                        </span>

                        <span className="flex items-center gap-1.5 text-xs font-bold text-zinc-500">
                            <Target className="h-3.5 w-3.5" />
                            SplitSecond
                        </span>
                    </div>

                    <div className="flex flex-col items-center border-b border-white/5 pb-6">
                        <motion.div
                            initial={{
                                scale: 0,
                                rotate: -25,
                            }}
                            animate={{
                                scale: 1,
                                rotate: 0,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 18,
                                delay: 0.1,
                            }}
                            className="relative"
                        >
                            {resultGrade.isShining && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 5,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        delay: 0.3,
                                    }}
                                    className="absolute -top-5 left-1/2 z-10 -translate-x-1/2 text-3xl"
                                >
                                    👑
                                </motion.div>
                            )}

                            <span
                                className={`bg-gradient-to-br ${resultGrade.color} bg-clip-text text-8xl font-black tracking-tighter text-transparent drop-shadow-md`}
                            >
                                {resultGrade.grade}
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 8,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: 0.18,
                            }}
                            className="mt-2 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-300"
                        >
                            <span>{resultGrade.subtext}</span>
                            <span>{resultGrade.emoji}</span>
                        </motion.div>

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 8,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                delay: 0.24,
                            }}
                            className="mt-5 flex flex-col items-center"
                        >
                            <span className="mb-1 text-xs font-bold uppercase tracking-widest text-zinc-500">
                                Total Error
                            </span>

                            <div className="text-4xl font-black leading-none tracking-tight text-white">
                                {totalError.toFixed(2)}

                                <span className="ml-1 text-lg font-medium text-zinc-500">
                                    s
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                                Round Breakdown
                            </p>

                            <p className="mt-1 text-xs text-zinc-600">
                                Your result for each target
                            </p>
                        </div>

                        <div className="rounded-lg border border-white/5 bg-black/30 px-2.5 py-1 text-xs font-bold text-zinc-400">
                            {results.length} rounds
                        </div>
                    </div>

                    <div className="mt-4 space-y-2">
                        {results.map((result, index) => (
                            <motion.div
                                key={`${result.target}-${result.actual}-${index}`}
                                initial={{
                                    opacity: 0,
                                    x: -10,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                transition={{
                                    delay: 0.2 + index * 0.05,
                                }}
                                className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 px-4 py-3"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="w-5 text-xs font-extrabold text-zinc-500">
                                        R{index + 1}
                                    </span>

                                    <div className="flex items-baseline gap-2">
                                        <span className="text-sm font-bold text-white">
                                            {result.actual.toFixed(2)}s
                                        </span>

                                        <span className="text-[10px] font-medium text-zinc-500">
                                            / {result.target.toFixed(2)}s
                                        </span>
                                    </div>
                                </div>

                                <div
                                    className={`rounded-md px-2.5 py-1 font-mono text-xs font-bold tracking-tight ${getRoundColor(
                                        result.error
                                    )}`}
                                >
                                    +{result.error.toFixed(2)}s
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 10,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.55,
                        }}
                        className="mt-6 rounded-xl border border-[#39FF14]/15 bg-[#39FF14]/5 px-4 py-3 text-center"
                    >
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#39FF14]">
                            Unlimited Play
                        </p>

                        <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                            Your score was not saved. Start a new game to
                            generate five new targets.
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}