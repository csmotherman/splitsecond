"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
    Crown,
    Flame,
    Medal,
    Target,
    Trophy,
    X,
} from "lucide-react";
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
    dailyRank?: number;
    percentile?: number;
    allTimeRank?: number;
    totalRuns?: number;
    showAchievement?: boolean;
    onCloseAchievement?: () => void;
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
    dailyRank,
    percentile,
    allTimeRank,
    totalRuns,
    showAchievement = false,
    onCloseAchievement,
}: FinalResultsProps) {
    const getGrade = (): GradeConfig => {
        if (totalError <= 0.25)
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

        if (totalError <= 0.5)
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

        if (totalError <= 0.75)
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

        if (totalError <= 1.0)
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

        if (totalError <= 1.5)
            return {
                grade: "A",
                subtext: "SUPER SHARP",
                emoji: "⚡",
                color: "from-purple-400 to-pink-400",
                glowColor: "rgba(168, 85, 247, 0.25)",
                bgGradient: "from-purple-500/15 via-fuchsia-500/10 to-purple-950/30",
                borderGlow: "border-purple-400/30",
            };

        if (totalError <= 2.0)
            return {
                grade: "B",
                subtext: "GREAT TIMING",
                emoji: "✨",
                color: "from-emerald-300 to-teal-400",
                glowColor: "rgba(16, 185, 129, 0.25)",
                bgGradient: "from-emerald-500/15 via-teal-500/10 to-emerald-950/30",
                borderGlow: "border-emerald-400/30",
            };

        if (totalError <= 3.0)
            return {
                grade: "C",
                subtext: "SOLID PERFORMANCE",
                emoji: "👍",
                color: "from-blue-400 to-indigo-500",
                glowColor: "rgba(59, 130, 246, 0.15)",
                bgGradient: "from-blue-500/10 via-zinc-900/10 to-zinc-950/30",
                borderGlow: "border-blue-500/20",
            };

        if (totalError <= 5.0)
            return {
                grade: "D",
                subtext: "ROOM TO IMPROVE",
                emoji: "⚠️",
                color: "from-orange-400 to-amber-500",
                glowColor: "rgba(249, 115, 22, 0.15)",
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
    const hasAchievement =
        showAchievement &&
        typeof allTimeRank === "number" &&
        allTimeRank <= 10;

    const achievement =
        allTimeRank === 1
            ? {
                title: "WORLD RECORD",
                description: "You just set the best score in SplitSecond history.",
                icon: <Crown className="h-14 w-14 fill-amber-300/20 text-amber-300" />,
                accent: "text-amber-300",
                border: "border-amber-400/40",
                background: "from-amber-500/20 via-yellow-500/10 to-zinc-950",
            }
            : typeof allTimeRank === "number" && allTimeRank <= 5
                ? {
                    title: "TOP 5 ALL-TIME",
                    description: `Your run is now ranked #${allTimeRank} in SplitSecond history.`,
                    icon: <Medal className="h-14 w-14 text-cyan-300" />,
                    accent: "text-cyan-300",
                    border: "border-cyan-400/40",
                    background: "from-cyan-500/20 via-blue-500/10 to-zinc-950",
                }
                : {
                    title: "TOP 10 ALL-TIME",
                    description: `Your run is now ranked #${allTimeRank} in SplitSecond history.`,
                    icon: <Flame className="h-14 w-14 text-orange-300" />,
                    accent: "text-orange-300",
                    border: "border-orange-400/40",
                    background: "from-orange-500/20 via-rose-500/10 to-zinc-950",
                };

    useEffect(() => {
        if (!resultGrade.triggerConfetti) return;

        const duration = 2000;
        const animationEnd = Date.now() + duration;
        const interval: NodeJS.Timeout = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            confetti({
                particleCount: 35 * (timeLeft / duration),
                startVelocity: 30,
                spread: 360,
                ticks: 60,
                origin: {
                    x: Math.random(),
                    y: Math.random() - 0.2,
                },
                zIndex: 100,
            });
        }, 300);

        return () => clearInterval(interval);
    }, [resultGrade.triggerConfetti]);

    const getRoundColor = (error: number) => {
        if (error <= 0.02)
            return "text-emerald-400 bg-emerald-500/10";
        if (error <= 0.08)
            return "text-cyan-400 bg-cyan-500/10";
        if (error <= 0.2)
            return "text-amber-400 bg-amber-500/10";
        return "text-rose-400 bg-rose-500/10";
    };

    return (
        <>
            <div className="mx-auto w-full max-w-sm select-none px-4 py-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    style={{
                        boxShadow: `0 0 50px -10px ${resultGrade.glowColor}`,
                    }}
                    className={`relative overflow-hidden rounded-[2rem] border bg-gradient-to-b ${resultGrade.bgGradient} ${resultGrade.borderGlow} bg-zinc-950/90 p-6 backdrop-blur-2xl shadow-2xl`}
                >
                    <div className="mb-4 flex items-center justify-between">
                        <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-zinc-400">
                            {mode === "normal"
                                ? "Normal Mode"
                                : "Extreme Mode"}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-zinc-500">
                            <Target className="h-3.5 w-3.5" />
                            SplitSecond
                        </span>
                    </div>

                    <div className="flex flex-col items-center border-b border-white/5 pb-6">
                        <motion.div
                            initial={{ scale: 0, rotate: -25 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 18,
                                delay: 0.1,
                            }}
                            className="relative"
                        >
                            {resultGrade.isShining && (
                                <Crown className="absolute -top-4 left-1/2 z-10 h-8 w-8 -translate-x-1/2 fill-amber-300/30 text-amber-300" />
                            )}
                            <span className={`bg-gradient-to-br ${resultGrade.color} bg-clip-text text-8xl font-black tracking-tighter text-transparent drop-shadow-md`}>
                                {resultGrade.grade}
                            </span>
                        </motion.div>

                        <div className="mt-2 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-300">
                            <span>{resultGrade.subtext}</span>
                            <span>{resultGrade.emoji}</span>
                        </div>

                        <div className="mt-4 flex flex-col items-center">
                            <span className="mb-1 text-xs font-bold uppercase tracking-widest text-zinc-500">
                                Total Error
                            </span>
                            <div className="text-4xl font-black leading-none tracking-tight text-white">
                                {totalError.toFixed(3)}
                                <span className="ml-1 text-lg font-medium text-zinc-500">
                                    s
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 grid w-full grid-cols-2 gap-3">
                        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-3 text-center">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-yellow-400">
                                Daily Rank
                            </div>
                            <div className="mt-1 text-2xl font-black text-white">
                                {typeof dailyRank === "number"
                                    ? `#${dailyRank}`
                                    : "--"}
                            </div>
                        </div>

                        <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-3 text-center">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                                All-Time Rank
                            </div>
                            <div className="mt-1 text-2xl font-black text-white">
                                {typeof allTimeRank === "number"
                                    ? `#${allTimeRank}`
                                    : "--"}
                            </div>
                            {typeof totalRuns === "number" && (
                                <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                    of {totalRuns} runs
                                </div>
                            )}
                        </div>
                    </div>

                    {typeof percentile === "number" && (
                        <p className="mt-3 text-center text-xs font-semibold text-zinc-400">
                            Better than {percentile.toFixed(1)}% of all completed runs
                        </p>
                    )}

                    <div className="mt-6 space-y-2">
                        {results.slice(0, 5).map((result, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + index * 0.05 }}
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
                                            / {result.target.toFixed(1)}s
                                        </span>
                                    </div>
                                </div>
                                <div className={`rounded-md px-2.5 py-1 font-mono text-xs font-bold tracking-tight ${getRoundColor(result.error)}`}>
                                    +{result.error.toFixed(2)}s
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-6 flex gap-3">
                        <Share
                            results={results}
                            totalError={totalError}
                            grade={resultGrade.grade}
                            rank={dailyRank}
                            allTimeRank={allTimeRank}
                        />

                        <Link
                            href="/leaderboard"
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-800/80 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-zinc-700"
                        >
                            <Trophy className="h-4 w-4 text-yellow-400" />
                            <span>Leaderboard</span>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {hasAchievement && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className={`relative w-full max-w-sm rounded-3xl border bg-gradient-to-b ${achievement.background} ${achievement.border} p-6 text-center shadow-2xl`}
                    >
                        <button
                            type="button"
                            onClick={onCloseAchievement}
                            className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/30 p-2 text-zinc-400 transition hover:text-white"
                            aria-label="Close achievement"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <div className="flex justify-center">
                            {achievement.icon}
                        </div>
                        <p className={`mt-4 text-xs font-black uppercase tracking-[0.28em] ${achievement.accent}`}>
                            New Achievement
                        </p>
                        <h2 className="mt-2 text-3xl font-black text-white">
                            {achievement.title}
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                            {achievement.description}
                        </p>

                        <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4">
                            <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                                Total Error
                            </div>
                            <div className="mt-1 text-4xl font-black text-white">
                                {totalError.toFixed(3)}s
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onCloseAchievement}
                            className="mt-5 w-full rounded-xl bg-white py-3.5 text-sm font-black text-zinc-950 transition hover:bg-zinc-100"
                        >
                            View Results
                        </button>
                    </motion.div>
                </div>
            )}
        </>
    );
}
