"use client";

import { useState } from "react";

import ActionButton from "./ActionButton";
import FinalResults from "./FinalResults";
import ProgressDots from "./ProgressDots";
import ResultReveal from "./ResultReveal";
import TargetDisplay from "./TargetDisplay";
import TargetHeader from "./TargetHeader";

import {
    saveRoundResult,
    completeSubmission,
} from "@/lib/game/submissions";

type GamePhase =
    | "waiting"
    | "result"
    | "finished";

type Mode = "normal" | "extreme";

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
    submission: Submission;
};

export default function GameContainer({
    targets,
    mode,
    submission,
}: GameContainerProps) {
    const [phase, setPhase] = useState<GamePhase>(
        submission.completed ? "finished" : "waiting"
    );

    const [currentRound, setCurrentRound] = useState(
        Math.max(0, (submission.current_round ?? 1) - 1)
    );

    const [results, setResults] = useState<RoundResult[]>(() => {
        const restored: RoundResult[] = [];

        for (let i = 1; i <= 5; i++) {
            const actual =
                submission[
                `round_${i}_actual` as keyof Submission
                ];

            const error =
                submission[
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

    const [actualTime, setActualTime] = useState(0);

    const [isRunning, setIsRunning] = useState(false);

    const [saving, setSaving] = useState(false);

    const [startTimestamp, setStartTimestamp] =
        useState<number | null>(null);

    const target = targets[currentRound];

    const handleButtonPress = async () => {
        // START TIMER
        if (!isRunning) {
            setStartTimestamp(performance.now());
            setIsRunning(true);
            return;
        }

        // STOP TIMER
        if (!startTimestamp) return;

        const elapsed =
            (performance.now() - startTimestamp) / 1000;

        const roundedActual = Number(
            elapsed.toFixed(2)
        );

        const error = Number(
            Math.abs(target - roundedActual).toFixed(2)
        );

        const roundNumber = currentRound + 1;

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

            await saveRoundResult(
                submission.id,
                roundNumber,
                roundedActual,
                error
            );

            if (roundNumber === targets.length) {
                const finalTotalError = Number(
                    updatedResults
                        .reduce(
                            (sum, result) =>
                                sum + result.error,
                            0
                        )
                        .toFixed(2)
                );

                await completeSubmission(
                    submission.id,
                    finalTotalError
                );
            }

            setActualTime(roundedActual);
            setResults(updatedResults);

            setIsRunning(false);
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
                        currentRound={currentRound}
                        totalRounds={targets.length}
                        mode={mode}
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

                    {saving && (
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

            {phase === "finished" && (
                <FinalResults
                    results={results}
                    totalError={totalError}
                    mode={mode}
                />
            )}
        </div>
    );
}