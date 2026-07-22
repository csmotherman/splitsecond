"use client";

import { useEffect, useRef, useState } from "react";
import ActionButton from "./ActionButton";
import FinalResults from "./FinalResults";
import GuestResultsGate from "./GuestResultsGate";
import ProgressDots from "./ProgressDots";
import ResultReveal from "./ResultReveal";
import TargetDisplay from "./TargetDisplay";
import TargetHeader from "./TargetHeader";
import UnlimitedResults from "./UnlimitedResults";

import {
    saveRoundResult,
    completeSubmission,
    getSubmissionStats,
} from "@/lib/game/submissions";

type GamePhase = "waiting" | "result" | "finished";

type Mode = "normal" | "extreme";
type GameMode = "daily" | "practice" | "unlimited";

type RoundResult = {
    target: number;
    actual: number;
    error: number;
};

type Submission = {
    id: string;
    challenge_id: string;
    current_round: number | null;
    completed: boolean | null;
    round_1_error: number | null;
    round_2_error: number | null;
    round_3_error: number | null;
    round_4_error: number | null;
    round_5_error: number | null;
    round_1_actual: number | null;
    round_2_actual: number | null;
    round_3_actual: number | null;
    round_4_actual: number | null;
    round_5_actual: number | null;
    total_error?: number | null;
    submitted_at?: string | null;
    [key: string]:
        | string
        | number
        | boolean
        | null
        | undefined;
};

type GameContainerProps = {
    targets: number[];
    mode: Mode;
    gameMode?: GameMode;
    submission?: Submission;
    challengeId?: string;
    isLoggedIn?: boolean;
};

const PENDING_RUN_KEY = "splitsecond_pending_daily";

export default function GameContainer({
    targets,
    mode,
    gameMode = "daily",
    submission,
    challengeId,
    isLoggedIn = false,
}: GameContainerProps) {
    const [phase, setPhase] = useState<GamePhase>(
        gameMode !== "daily"
            ? "waiting"
            : submission?.completed
              ? "finished"
              : "waiting"
    );

    const [currentRound, setCurrentRound] = useState(
        gameMode !== "daily"
            ? 0
            : Math.max(0, (submission?.current_round ?? 1) - 1)
    );

    const [results, setResults] = useState<RoundResult[]>(() => {
        if (gameMode !== "daily") return [];

        const restored: RoundResult[] = [];

        for (let i = 1; i <= 5; i++) {
            const actual =
                submission?.[`round_${i}_actual` as keyof Submission];
            const error =
                submission?.[`round_${i}_error` as keyof Submission];

            if (typeof actual === "number" && typeof error === "number") {
                restored.push({
                    target: targets[i - 1],
                    actual,
                    error,
                });
            }
        }

        return restored;
    });

    const [actualTime, setActualTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [saving, setSaving] = useState(false);
    const [startTimestamp, setStartTimestamp] = useState<number | null>(null);
    const [dailyRank, setDailyRank] = useState<number>();
    const [percentile, setPercentile] = useState<number>();
    const [allTimeRank, setAllTimeRank] = useState<number>();
    const [totalRuns, setTotalRuns] = useState<number>();
    const [showAchievement, setShowAchievement] = useState(false);

    const target = targets[currentRound];

    useEffect(() => {
        async function loadStats() {
            if (
                gameMode !== "daily" ||
                !submission?.completed ||
                submission.total_error == null
            ) {
                return;
            }

            try {
                const stats = await getSubmissionStats(
                    submission.challenge_id,
                    Number(submission.total_error)
                );

                setDailyRank(stats.dailyRank);
                setPercentile(stats.percentile);
                setAllTimeRank(stats.allTimeRank);
                setTotalRuns(stats.totalRuns);
            } catch (error) {
                console.error("Failed to load submission stats:", error);
            }
        }

        void loadStats();
    }, [
        gameMode,
        submission?.challenge_id,
        submission?.completed,
        submission?.total_error,
    ]);

    const audioContextRef = useRef<AudioContext | null>(null);

    const playButtonSound = (type: "start" | "stop") => {
        try {
            const AudioContextClass =
                window.AudioContext ||
                (
                    window as typeof window & {
                        webkitAudioContext?: typeof AudioContext;
                    }
                ).webkitAudioContext;

            if (!AudioContextClass) return;

            const audioContext =
                audioContextRef.current ?? new AudioContextClass();

            audioContextRef.current = audioContext;

            if (audioContext.state === "suspended") {
                void audioContext.resume();
            }

            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            const now = audioContext.currentTime;

            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(
                type === "start" ? 700 : 420,
                now
            );

            gainNode.gain.setValueAtTime(0.0001, now);
            gainNode.gain.exponentialRampToValueAtTime(0.18, now + 0.005);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.start(now);
            oscillator.stop(now + 0.08);
        } catch (error) {
            console.warn("Unable to play button sound:", error);
        }
    };

    const handleButtonPress = async () => {
        if (!isRunning) {
            playButtonSound("start");
            setStartTimestamp(performance.now());
            setIsRunning(true);
            return;
        }

        if (startTimestamp === null) return;

        const stopTimestamp = performance.now();
        playButtonSound("stop");

        const elapsed = (stopTimestamp - startTimestamp) / 1000;
        const roundedActual = Number(elapsed.toFixed(2));
        const error = Number(Math.abs(target - roundedActual).toFixed(2));
        const roundNumber = currentRound + 1;
        const newResult: RoundResult = {
            target,
            actual: roundedActual,
            error,
        };
        const updatedResults = [...results, newResult];
        const isFinalRound = roundNumber === targets.length;
        const finalTotalError = Number(
            updatedResults
                .reduce((sum, result) => sum + result.error, 0)
                .toFixed(2)
        );

        setActualTime(roundedActual);
        setResults(updatedResults);
        setIsRunning(false);
        setStartTimestamp(null);
        setPhase("result");

        if (
            gameMode === "daily" &&
            isFinalRound &&
            !submission &&
            challengeId
        ) {
            localStorage.setItem(
                PENDING_RUN_KEY,
                JSON.stringify({
                    challengeId,
                    mode,
                    results: updatedResults,
                    totalError: finalTotalError,
                    completedAt: new Date().toISOString(),
                })
            );
        }

        try {
            setSaving(true);

            if (gameMode === "daily" && submission) {
                await saveRoundResult(
                    submission.id,
                    roundNumber,
                    roundedActual,
                    error
                );

                if (isFinalRound) {
                    const stats = await completeSubmission(
                        submission.id,
                        finalTotalError
                    );

                    setDailyRank(stats.dailyRank);
                    setPercentile(stats.percentile);
                    setAllTimeRank(stats.allTimeRank);
                    setTotalRuns(stats.totalRuns);
                    setShowAchievement(stats.allTimeRank <= 10);
                }
            }
        } catch (error) {
            console.error("Failed to save round result:", error);
        } finally {
            setSaving(false);
        }
    };

    const nextRound = () => {
        const nextIndex = currentRound + 1;

        if (nextIndex >= targets.length) {
            setPhase("finished");
            return;
        }

        setCurrentRound(nextIndex);
        setActualTime(0);
        setStartTimestamp(null);
        setIsRunning(false);
        setPhase("waiting");
    };

    const totalError = Number(
        results
            .reduce((sum, result) => sum + result.error, 0)
            .toFixed(2)
    );

    return (
        <div className="mx-auto flex w-full max-w-xl flex-col gap-8 px-4 py-8">
            {phase !== "finished" && (
                <>
                    <TargetHeader
                        currentRound={currentRound}
                        totalRounds={targets.length}
                        mode={mode}
                        gameMode={gameMode}
                    />

                    <ProgressDots
                        currentRound={currentRound}
                        totalRounds={targets.length}
                    />

                    <TargetDisplay target={target} />
                </>
            )}

            {phase === "waiting" && (
                <div className="space-y-6 text-center">
                    <p className="text-zinc-400">
                        {isRunning
                            ? "Tap again when you think you've reached the target."
                            : "Tap the button to start the timer."}
                    </p>

                    {saving && gameMode === "daily" && (
                        <p className="text-green-400">Saving round...</p>
                    )}

                    <ActionButton
                        label={
                            saving
                                ? "SAVING..."
                                : isRunning
                                  ? "STOP"
                                  : "START"
                        }
                        isRunning={isRunning}
                        disabled={saving}
                        onClick={handleButtonPress}
                    />
                </div>
            )}

            {phase === "result" && (
                <div className="space-y-6">
                    <ResultReveal
                        target={target}
                        actual={actualTime}
                        error={Math.abs(target - actualTime)}
                    />

                    <ActionButton
                        label={
                            currentRound === targets.length - 1
                                ? "RESULTS"
                                : "NEXT"
                        }
                        onClick={nextRound}
                    />
                </div>
            )}

            {phase === "finished" &&
                (gameMode === "daily" ? (
                    isLoggedIn ? (
                        <FinalResults
                            results={results}
                            totalError={totalError}
                            mode={mode}
                            dailyRank={dailyRank}
                            percentile={percentile}
                            allTimeRank={allTimeRank}
                            totalRuns={totalRuns}
                            showAchievement={showAchievement}
                            onCloseAchievement={() =>
                                setShowAchievement(false)
                            }
                        />
                    ) : (
                        <GuestResultsGate mode={mode} />
                    )
                ) : (
                    <UnlimitedResults
                        results={results}
                        totalError={totalError}
                    />
                ))}
        </div>
    );
}
