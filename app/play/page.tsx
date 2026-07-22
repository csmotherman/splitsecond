"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import GameContainer from "@/components/game/GameContainer";
import { getTodaysChallenge } from "@/lib/game/challenges";
import {
    completeSubmission,
    getOrCreateSubmission,
    saveRoundResult,
} from "@/lib/game/submissions";
import { supabase } from "@/lib/supabase/client";

type Mode = "normal" | "extreme";

type DailyChallenge = {
    id: string;
    challenge_date: string;
    mode: Mode;
    targets: number[];
    status: "active" | "complete";
    finalized: boolean;
};

type DailySubmission = {
    id: string;
    user_id: string;
    challenge_id: string;
    total_error: number | null;
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
    submitted_at: string | null;
    started_at: string | null;
};

type PendingDailyRun = {
    challengeId: string;
    mode: Mode;
    results: Array<{
        target: number;
        actual: number;
        error: number;
    }>;
    totalError: number;
    completedAt: string;
};

const PENDING_RUN_KEY = "splitsecond_pending_daily";

function isValidPendingRun(
    value: unknown,
    challenge: DailyChallenge,
    mode: Mode
): value is PendingDailyRun {
    if (!value || typeof value !== "object") return false;

    const pending = value as PendingDailyRun;

    if (
        pending.challengeId !== challenge.id ||
        pending.mode !== mode ||
        !Array.isArray(pending.results) ||
        pending.results.length !== challenge.targets.length ||
        typeof pending.totalError !== "number" ||
        !Number.isFinite(pending.totalError) ||
        typeof pending.completedAt !== "string"
    ) {
        return false;
    }

    const completedAt = Date.parse(pending.completedAt);
    if (!Number.isFinite(completedAt)) return false;

    return pending.results.every((result, index) => {
        const expectedTarget = challenge.targets[index];
        const expectedError = Number(
            Math.abs(result.target - result.actual).toFixed(2)
        );

        return (
            typeof result.target === "number" &&
            typeof result.actual === "number" &&
            typeof result.error === "number" &&
            Number.isFinite(result.target) &&
            Number.isFinite(result.actual) &&
            Number.isFinite(result.error) &&
            result.target === expectedTarget &&
            result.error === expectedError
        );
    });
}

function PlayPageContent() {
    const searchParams = useSearchParams();
    const mode: Mode =
        searchParams.get("mode") === "extreme" ? "extreme" : "normal";
    const shouldClaim = searchParams.get("claim") === "1";

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [gameState, setGameState] = useState<{
        challenge: DailyChallenge | null;
        submission: DailySubmission | null;
        loading: boolean;
        error: string | null;
    }>({
        challenge: null,
        submission: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        const controller = new AbortController();

        async function loadGame() {
            try {
                const {
                    data: { session },
                } = await supabase.auth.getSession();

                const challengeData = (await getTodaysChallenge(
                    mode
                )) as DailyChallenge;

                if (!challengeData) {
                    throw new Error(
                        `No ${mode} challenge is available for today.`
                    );
                }

                const isValidTarget = (target: unknown) =>
                    typeof target === "number" &&
                    Number.isFinite(target) &&
                    target > 0;

                if (
                    !Array.isArray(challengeData.targets) ||
                    challengeData.targets.length !== 5 ||
                    !challengeData.targets.every(isValidTarget)
                ) {
                    throw new Error(
                        "Today's challenge contains invalid or missing targets."
                    );
                }

                let submissionData: DailySubmission | null = null;

                if (session) {
                    setIsLoggedIn(true);
                    submissionData = (await getOrCreateSubmission(
                        challengeData.id
                    )) as DailySubmission;

                    if (
                        shouldClaim &&
                        !submissionData.completed
                    ) {
                        const rawPending = localStorage.getItem(PENDING_RUN_KEY);

                        if (rawPending) {
                            let parsedPending: unknown;

                            try {
                                parsedPending = JSON.parse(rawPending);
                            } catch {
                                localStorage.removeItem(PENDING_RUN_KEY);
                                parsedPending = null;
                            }

                            if (
                                isValidPendingRun(
                                    parsedPending,
                                    challengeData,
                                    mode
                                )
                            ) {
                                const pending = parsedPending;
                                const computedTotal = Number(
                                    pending.results
                                        .reduce(
                                            (sum, result) =>
                                                sum + result.error,
                                            0
                                        )
                                        .toFixed(2)
                                );

                                if (computedTotal === pending.totalError) {
                                    for (
                                        let index = 0;
                                        index < pending.results.length;
                                        index++
                                    ) {
                                        const result = pending.results[index];

                                        await saveRoundResult(
                                            submissionData.id,
                                            index + 1,
                                            result.actual,
                                            result.error
                                        );
                                    }

                                    await completeSubmission(
                                        submissionData.id,
                                        pending.totalError
                                    );

                                    localStorage.removeItem(PENDING_RUN_KEY);

                                    submissionData = (await getOrCreateSubmission(
                                        challengeData.id
                                    )) as DailySubmission;
                                }
                            }
                        }
                    }
                }

                if (!controller.signal.aborted) {
                    setGameState({
                        challenge: challengeData,
                        submission: submissionData,
                        loading: false,
                        error: null,
                    });
                }
            } catch (error) {
                if (!controller.signal.aborted) {
                    console.error("Unable to load game:", error);
                    setGameState((previous) => ({
                        ...previous,
                        loading: false,
                        error:
                            error instanceof Error
                                ? error.message
                                : "Unable to load today's challenge.",
                    }));
                }
            }
        }

        void loadGame();

        return () => {
            controller.abort();
        };
    }, [mode, shouldClaim]);

    if (gameState.loading) {
        return (
            <main className="flex min-h-screen items-center justify-center px-4">
                <p className="text-zinc-500 dark:text-zinc-400">
                    Loading today&apos;s challenge...
                </p>
            </main>
        );
    }

    if (gameState.error || !gameState.challenge) {
        return (
            <main className="flex min-h-screen items-center justify-center px-4">
                <div className="w-full max-w-md text-center">
                    <h1 className="text-2xl font-bold">
                        Challenge unavailable
                    </h1>

                    <p className="mt-3 text-zinc-500 dark:text-zinc-400">
                        {gameState.error ??
                            "Today's challenge could not be loaded."}
                    </p>

                    <a
                        href="/"
                        className="mt-6 inline-block rounded-xl bg-green-500 px-6 py-3 font-bold text-white transition hover:bg-green-400"
                    >
                        Return Home
                    </a>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen">
            <GameContainer
                mode={mode}
                targets={gameState.challenge.targets}
                challengeId={gameState.challenge.id}
                submission={gameState.submission ?? undefined}
                isLoggedIn={isLoggedIn}
            />
        </main>
    );
}

export default function PlayPage() {
    return (
        <Suspense
            fallback={
                <main className="flex min-h-screen items-center justify-center px-4">
                    <p className="text-zinc-500 dark:text-zinc-400">
                        Loading...
                    </p>
                </main>
            }
        >
            <PlayPageContent />
        </Suspense>
    );
}
