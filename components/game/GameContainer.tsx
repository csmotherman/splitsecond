"use client";

import { useEffect, useState } from "react";

import ActionButton from "./ActionButton";
import FinalResults from "./FinalResults";
import ProgressDots from "./ProgressDots";
import ResultReveal from "./ResultReveal";
import TargetDisplay from "./TargetDisplay";
import TargetHeader from "./TargetHeader";

import {
    saveRoundResult,
    completeSubmission,
    getSubmissionStats,
} from "@/lib/game/submissions";

type GamePhase =
    | "waiting"
    | "result"
    | "finished";

type Mode = "normal" | "extreme";

type GameMode =
    | "daily"
    | "practice";

type RoundResult = {
    target: number;
    actual: number;
    error: number;
};

type Submission = {
    id: string;

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

    daily_rank?: number | null;
    percentile?: number | null;

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
};

export default function GameContainer({
    targets,
    mode,
    gameMode = "daily",
    submission,
}: GameContainerProps) {
    const [phase, setPhase] =
        useState<GamePhase>(
            gameMode === "practice"
                ? "waiting"
                : submission?.completed
                    ? "finished"
                    : "waiting"
        );

    const [currentRound, setCurrentRound] =
        useState(
            gameMode === "practice"
                ? 0
                : Math.max(
                    0,
                    (submission?.current_round ?? 1) - 1
                )
        );

    const [results, setResults] =
        useState<RoundResult[]>(() => {
            if (gameMode === "practice") {
                return [];
            }

            const restored: RoundResult[] = [];

            for (let i = 1; i <= 5; i++) {
                const actual =
                    submission?.[
                        `round_${i}_actual` as keyof Submission
                    ];

                const error =
                    submission?.[
                        `round_${i}_error` as keyof Submission
                    ];

                if (
                    typeof actual === "number" &&
                    typeof error === "number"
                ) {
                    restored.push({
                        target: targets[i - 1],
                        actual,
                        error,
                    });
                }
            }

            return restored;
        });

    const [actualTime, setActualTime] =
        useState(0);

    const [isRunning, setIsRunning] =
        useState(false);

    const [saving, setSaving] =
        useState(false);

    const [startTimestamp, setStartTimestamp] =
        useState<number | null>(null);

    const [dailyRank, setDailyRank] =
        useState<number | undefined>(
            typeof submission?.daily_rank === "number"
                ? submission.daily_rank
                : undefined
        );

    const [percentile, setPercentile] =
        useState<number | undefined>(
            typeof submission?.percentile === "number"
                ? submission.percentile
                : undefined
        );

    const target = targets[currentRound];

    const handleButtonPress = async () => {
        if (!isRunning) {
            setStartTimestamp(
                performance.now()
            );

            setIsRunning(true);
            return;
        }

        if (startTimestamp === null) {
            return;
        }

        const elapsed =
            (performance.now() -
                startTimestamp) /
            1000;

        const roundedActual = Number(
            elapsed.toFixed(2)
        );

        const error = Number(
            Math.abs(
                target - roundedActual
            ).toFixed(2)
        );

        const roundNumber =
            currentRound + 1;

        const newResult: RoundResult = {
            target,
            actual: roundedActual,
            error,
        };

        const updatedResults = [
            ...results,
            newResult,
        ];

        try {
            setSaving(true);

            if (
                gameMode === "daily" &&
                submission
            ) {
                await saveRoundResult(
                    submission.id,
                    roundNumber,
                    roundedActual,
                    error
                );

                if (
                    roundNumber ===
                    targets.length
                ) {
                    const finalTotalError =
                        Number(
                            updatedResults
                                .reduce(
                                    (
                                        sum,
                                        result
                                    ) =>
                                        sum +
                                        result.error,
                                    0
                                )
                                .toFixed(2)
                        );

                    const ranking =
                        await completeSubmission(
                            submission.id,
                            finalTotalError
                        );

                    setDailyRank(
                        ranking.dailyRank
                    );

                    setPercentile(
                        ranking.percentile
                    );
                }
            }

            setActualTime(
                roundedActual
            );

            setResults(
                updatedResults
            );

            setIsRunning(false);
            setStartTimestamp(null);
            setPhase("result");
        } catch (err) {
            console.error(
                "Failed to save round result:",
                err
            );
        } finally {
            setSaving(false);
        }
    };

    const nextRound = () => {
        const nextIndex =
            currentRound + 1;

        if (
            nextIndex >=
            targets.length
        ) {
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
            .reduce(
                (sum, result) =>
                    sum + result.error,
                0
            )
            .toFixed(2)
    );

    return (
        <div className="mx-auto flex w-full max-w-xl flex-col gap-8 px-4 py-8">
            {phase !== "finished" && (
                <>
                    <TargetHeader
                        currentRound={
                            currentRound
                        }
                        totalRounds={
                            targets.length
                        }
                        mode={mode}
                    />

                    <ProgressDots
                        currentRound={
                            currentRound
                        }
                        totalRounds={
                            targets.length
                        }
                    />

                    <TargetDisplay
                        target={target}
                    />
                </>
            )}

            {phase === "waiting" && (
                <div className="space-y-6 text-center">
                    <p className="text-zinc-400">
                        {isRunning
                            ? "Tap again when you think you've reached the target."
                            : "Tap the button to start the timer."}
                    </p>

                    {saving &&
                        gameMode ===
                            "daily" && (
                            <p className="text-green-400">
                                Saving round...
                            </p>
                        )}

                    <ActionButton
                        label={
                            saving
                                ? "SAVING..."
                                : isRunning
                                    ? "STOP"
                                    : "START"
                        }
                        isRunning={
                            isRunning
                        }
                        disabled={saving}
                        onClick={
                            handleButtonPress
                        }
                    />
                </div>
            )}

            {phase === "result" && (
                <div className="space-y-6">
                    <ResultReveal
                        target={target}
                        actual={actualTime}
                        error={Math.abs(
                            target -
                                actualTime
                        )}
                    />

                    <ActionButton
                        label={
                            currentRound ===
                            targets.length - 1
                                ? "RESULTS"
                                : "NEXT"
                        }
                        onClick={
                            nextRound
                        }
                    />
                </div>
            )}

            {phase === "finished" && (
                <FinalResults
                    results={results}
                    totalError={
                        totalError
                    }
                    mode={mode}
                    dailyRank={
                        dailyRank
                    }
                    percentile={
                        percentile
                    }
                />
            )}
        </div>
    );
}