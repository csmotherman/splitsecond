"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Trophy, Crown, Target } from "lucide-react";
import Share from "./Share";

type RoundResult = {
    target: number;
    actual: number;
    error: number;
};

type FinalResultsProps = {
    results: RoundResult[];
    totalError: number;
    mode: "normal" | "extreme";
    onViewLeaderboard?: () => void;
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
    triggerConfetti?: boolean;
};

export default function FinalResults({
    results,
    totalError,
    mode,
    onViewLeaderboard,
}: FinalResultsProps) {
    

    // Fine-tuned 16-tier grade mapping
    const getGrade = (): GradeConfig => {
        if (totalError <= 0.05)
            return {
                grade: "GOAT",
                subtext: "PERFECT TIMING",
                emoji: "👑",
                color: "from-amber-200 via-yellow-400 to-amber-500",
                glowColor: "rgba(245, 158, 11, 0.45)",
                bgGradient: "from-amber-500/20 via-yellow-500/10 to-amber-950/40",
                borderGlow: "border-amber-400/50 shadow-amber-500/20",
                isShining: true,
                triggerConfetti: true,
            };

        if (totalError <= 0.10)
            return {
                grade: "S+",
                subtext: "GODLIKE",
                emoji: "💎",
                color: "from-cyan-200 via-teal-300 to-emerald-300",
                glowColor: "rgba(6, 182, 212, 0.4)",
                bgGradient: "from-cyan-500/20 via-teal-500/10 to-cyan-950/40",
                borderGlow: "border-cyan-400/50 shadow-cyan-500/20",
                isShining: true,
                triggerConfetti: true,
            };

        if (totalError <= 0.15)
            return {
                grade: "S",
                subtext: "INSANE ACCURACY",
                emoji: "💎",
                color: "from-cyan-300 to-teal-400",
                glowColor: "rgba(6, 182, 212, 0.35)",
                bgGradient: "from-cyan-500/20 via-teal-500/10 to-cyan-950/40",
                borderGlow: "border-cyan-400/40",
                triggerConfetti: true,
            };

        if (totalError <= 0.20)
            return {
                grade: "S-",
                subtext: "MASTER CLASS",
                emoji: "🔥",
                color: "from-teal-300 to-emerald-400",
                glowColor: "rgba(20, 184, 166, 0.3)",
                bgGradient: "from-teal-500/20 via-emerald-500/10 to-teal-950/40",
                borderGlow: "border-teal-400/40",
                triggerConfetti: true,
            };

        if (totalError <= 0.30)
            return {
                grade: "A+",
                subtext: "LEGENDARY",
                emoji: "🏆",
                color: "from-purple-300 to-fuchsia-400",
                glowColor: "rgba(168, 85, 247, 0.35)",
                bgGradient: "from-purple-500/20 via-fuchsia-500/10 to-purple-950/40",
                borderGlow: "border-purple-400/40",
                triggerConfetti: true,
            };

        if (totalError <= 0.40)
            return {
                grade: "A",
                subtext: "SUPER SHARP",
                emoji: "⚡",
                color: "from-purple-400 to-pink-400",
                glowColor: "rgba(168, 85, 247, 0.25)",
                bgGradient: "from-purple-500/15 via-fuchsia-500/10 to-purple-950/30",
                borderGlow: "border-purple-400/30",
            };

        if (totalError <= 0.5)
            return {
                grade: "A-",
                subtext: "VERY IMPRESSIVE",
                emoji: "🎯",
                color: "from-fuchsia-400 to-purple-500",
                glowColor: "rgba(192, 132, 252, 0.2)",
                bgGradient: "from-fuchsia-500/15 via-purple-500/10 to-zinc-950/30",
                borderGlow: "border-fuchsia-400/30",
            };

        if (totalError <= 0.7)
            return {
                grade: "B+",
                subtext: "GREAT TIMING",
                emoji: "✨",
                color: "from-emerald-300 to-teal-400",
                glowColor: "rgba(16, 185, 129, 0.25)",
                bgGradient: "from-emerald-500/15 via-teal-500/10 to-emerald-950/30",
                borderGlow: "border-emerald-400/30",
            };

        if (totalError <= 0.9)
            return {
                grade: "B",
                subtext: "SOLID PERFORMER",
                emoji: "👍",
                color: "from-emerald-400 to-green-500",
                glowColor: "rgba(16, 185, 129, 0.2)",
                bgGradient: "from-emerald-500/10 via-zinc-900/10 to-zinc-950/30",
                borderGlow: "border-emerald-500/20",
            };

        if (totalError <= 1)
            return {
                grade: "B-",
                subtext: "ON TARGET",
                emoji: "👌",
                color: "from-green-400 to-teal-500",
                glowColor: "rgba(34, 197, 94, 0.15)",
                bgGradient: "from-green-500/10 via-zinc-900/10 to-zinc-950/30",
                borderGlow: "border-green-500/20",
            };

        if (totalError <= 1.15)
            return {
                grade: "C+",
                subtext: "PRETTY GOOD",
                emoji: "🙂",
                color: "from-blue-300 to-indigo-400",
                glowColor: "rgba(59, 130, 246, 0.2)",
                bgGradient: "from-blue-500/15 via-indigo-500/10 to-blue-950/30",
                borderGlow: "border-blue-400/30",
            };

        if (totalError <= 1.25)
            return {
                grade: "C",
                subtext: "AVERAGE",
                emoji: "😐",
                color: "from-blue-400 to-indigo-500",
                glowColor: "rgba(59, 130, 246, 0.15)",
                bgGradient: "from-blue-500/10 via-zinc-900/10 to-zinc-950/30",
                borderGlow: "border-blue-500/20",
            };

        if (totalError <= 1.5)
            return {
                grade: "C-",
                subtext: "ROOM TO IMPROVE",
                emoji: "🤏",
                color: "from-sky-400 to-blue-500",
                glowColor: "rgba(56, 189, 248, 0.12)",
                bgGradient: "from-sky-500/10 via-zinc-900/10 to-zinc-950/30",
                borderGlow: "border-sky-500/20",
            };

        if (totalError <= 2)
            return {
                grade: "D+",
                subtext: "SLIGHTLY OFF",
                emoji: "👀",
                color: "from-amber-300 to-orange-400",
                glowColor: "rgba(245, 158, 11, 0.15)",
                bgGradient: "from-amber-500/10 via-zinc-900/10 to-zinc-950/30",
                borderGlow: "border-amber-500/20",
            };

        if (totalError <= 2.5)
            return {
                grade: "D",
                subtext: "NOT QUITE",
                emoji: "⚠️",
                color: "from-orange-400 to-amber-500",
                glowColor: "rgba(249, 115, 22, 0.15)",
                bgGradient: "from-orange-500/10 via-zinc-900/10 to-zinc-950/30",
                borderGlow: "border-orange-500/20",
            };

        if (totalError <= 3)
            return {
                grade: "D-",
                subtext: "OFF PACED",
                emoji: "📉",
                color: "from-orange-500 to-rose-400",
                glowColor: "rgba(249, 115, 22, 0.12)",
                bgGradient: "from-orange-500/10 via-zinc-900/10 to-zinc-950/30",
                borderGlow: "border-orange-500/20",
            };

        return {
            grade: "F",
            subtext: "LOST IN TIME",
            emoji: "💀",
            color: "from-rose-400 to-red-600",
            glowColor: "rgba(244, 63, 94, 0.25)",
            bgGradient: "from-rose-950/30 via-red-950/20 to-zinc-950/50",
            borderGlow: "border-rose-500/30",
        };
    };

    const resultGrade = getGrade();

    useEffect(() => {
        if (!resultGrade.triggerConfetti) return;

        const duration = 2000;
        const animationEnd = Date.now() + duration;

        const interval: NodeJS.Timeout = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            const particleCount = 35 * (timeLeft / duration);

            confetti({
                particleCount,
                startVelocity: 30,
                spread: 360,
                ticks: 60,
                origin: { x: Math.random(), y: Math.random() - 0.2 },
                zIndex: 100,
            });
        }, 300);

        return () => clearInterval(interval);
    }, [resultGrade.triggerConfetti]);

    

    

    const getRoundColor = (error: number) => {
        if (error <= 0.02) return "text-emerald-400 bg-emerald-500/10";
        if (error <= 0.08) return "text-cyan-400 bg-cyan-500/10";
        if (error <= 0.2) return "text-amber-400 bg-amber-500/10";
        return "text-rose-400 bg-rose-500/10";
    };

    return (
        <div className="w-full max-w-sm mx-auto px-4 py-6 select-none">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{
                    boxShadow: `0 0 50px -10px ${resultGrade.glowColor}`,
                }}
                className={`relative overflow-hidden rounded-[2rem] border bg-gradient-to-b ${resultGrade.bgGradient} ${resultGrade.borderGlow} bg-zinc-950/90 p-6 backdrop-blur-2xl shadow-2xl`}
            >
                {/* Header & Mode Tag */}
                <div className="flex justify-between items-center mb-4">
                    <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-zinc-400 backdrop-blur-md">
                        {mode === "normal" ? "Normal Mode" : "Extreme Mode"}
                    </span>
                    <span className="text-xs font-bold text-zinc-500 flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5" /> SplitSecond
                    </span>
                </div>

                {/* Rank Badge Header */}
                <div className="flex flex-col items-center pb-6 border-b border-white/5">
                    <motion.div
                        initial={{ scale: 0, rotate: -25 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                        className="relative"
                    >
                        {resultGrade.isShining && (
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                className="absolute -top-4 left-1/2 -translate-x-1/2 text-amber-300 z-10 filter drop-shadow"
                            >
                                <Crown className="w-8 h-8 fill-amber-300/30" />
                            </motion.div>
                        )}
                        <span className={`text-8xl font-black tracking-tighter bg-gradient-to-br ${resultGrade.color} bg-clip-text text-transparent filter drop-shadow-md`}>
                            {resultGrade.grade}
                        </span>
                    </motion.div>

                    <div className="flex items-center gap-2 mt-2 text-sm font-bold text-zinc-300 uppercase tracking-widest">
                        <span>{resultGrade.subtext}</span>
                        <span>{resultGrade.emoji}</span>
                    </div>

                    <div className="mt-4 flex flex-col items-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">
                            Total Error
                        </span>
                        <div className="text-4xl font-black text-white tracking-tight leading-none">
                            {totalError.toFixed(3)}
                            <span className="text-lg font-medium text-zinc-500 ml-1">s</span>
                        </div>
                    </div>
                </div>

                {/* Vertical List Breakdown */}
                <div className="mt-6 space-y-2">
                    {results.slice(0, 5).map((result, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.05 }}
                            className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 px-4 py-3 backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-extrabold text-zinc-500 w-5">
                                    R{index + 1}
                                </span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-sm font-bold text-white">
                                        {result.actual.toFixed(2)}s
                                    </span>
                                    <span className="text-[10px] font-medium text-zinc-500">
                                        / {result.target.toFixed(1)}s
                                    </span>
                                </div>
                            </div>

                            <div className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono tracking-tight ${getRoundColor(result.error)}`}>
                                +{result.error.toFixed(2)}s
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                    <Share
                        results={results}
                        totalError={totalError}
                        grade={resultGrade.grade}
                    />

                    {onViewLeaderboard && (
                        <motion.button
                            whileTap={{ scale: 0.96 }}
                            onClick={onViewLeaderboard}
                            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-800/80 hover:bg-zinc-700 text-white py-3.5 px-5 font-bold text-sm transition shadow-lg"
                            aria-label="View Leaderboard"
                        >
                            <Trophy className="w-4 h-4 text-yellow-400" />
                        </motion.button>
                    )}
                </div>
            </motion.div>
        </div>
    );
}