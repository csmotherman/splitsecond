"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { supabase } from "@/lib/supabase/client";

import DuelLobby from "@/components/duel/DuelLobby";
import DuelCountdown from "@/components/duel/DuelCountdown";
import DuelTimer from "@/components/duel/DuelTimer";
import DuelReveal from "@/components/duel/DuelReveal";

import { submitTime } from "@/lib/duel/api";

type Duel = {
    id: string;
    status: string;
    match_code: string | null;
    current_round: number;
    winner_user_id: string | null;
};

type DuelRound = {
    id: string;
    duel_id: string;
    round_number: number;
    target_ms: number;
    status: string;
    winner_user_id: string | null;
    is_tie: boolean;
};

type DuelSubmission = {
    id: string;
    round_id: string;
    user_id: string;
    elapsed_ms: number;
    error_ms: number;
    submitted_at: string;
};

export default function DuelPage() {
    const params = useParams();

    const duelId = params.duelId as string;

    const [loading, setLoading] =
        useState(true);

    const [duel, setDuel] =
        useState<Duel | null>(null);

    const [round, setRound] =
        useState<DuelRound | null>(null);

    const [submissions, setSubmissions] =
        useState<DuelSubmission[]>([]);

    const [currentUserId, setCurrentUserId] =
        useState<string | null>(null);

    const [submitting, setSubmitting] =
        useState(false);

    const [submitError, setSubmitError] =
        useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function loadData() {
            try {
                const {
                    data: authData,
                    error: authError,
                } = await supabase.auth.getUser();

                if (authError) {
                    console.error(
                        "AUTH ERROR",
                        authError
                    );
                }

                const userId =
                    authData.user?.id ?? null;

                if (!cancelled) {
                    setCurrentUserId(userId);
                }

                const {
                    data: duelData,
                    error: duelError,
                } = await supabase
                    .from("duels")
                    .select(
                        `
                        id,
                        status,
                        match_code,
                        current_round,
                        winner_user_id
                        `
                    )
                    .eq("id", duelId)
                    .single();

                if (duelError) {
                    console.error(
                        "DUEL ERROR",
                        duelError
                    );

                    return;
                }

                const {
                    data: roundData,
                    error: roundError,
                } = await supabase
                    .from("duel_rounds")
                    .select(
                        `
                        id,
                        duel_id,
                        round_number,
                        target_ms,
                        status,
                        winner_user_id,
                        is_tie
                        `
                    )
                    .eq(
                        "duel_id",
                        duelId
                    )
                    .order(
                        "round_number",
                        {
                            ascending: false,
                        }
                    )
                    .limit(1)
                    .maybeSingle();

                if (roundError) {
                    console.error(
                        "ROUND ERROR",
                        roundError
                    );
                }

                let submissionData:
                    | DuelSubmission[]
                    | null = [];

                if (roundData) {
                    const {
                        data,
                        error:
                        submissionError,
                    } = await supabase
                        .from(
                            "duel_round_submissions"
                        )
                        .select(
                            `
                            id,
                            round_id,
                            user_id,
                            elapsed_ms,
                            error_ms,
                            submitted_at
                            `
                        )
                        .eq(
                            "round_id",
                            roundData.id
                        )
                        .order(
                            "submitted_at",
                            {
                                ascending: true,
                            }
                        );

                    if (submissionError) {
                        console.error(
                            "SUBMISSION ERROR",
                            submissionError
                        );
                    } else {
                        submissionData =
                            data;
                    }
                }

                if (!cancelled) {
                    setDuel(duelData);
                    setRound(roundData);
                    setSubmissions(
                        submissionData ?? []
                    );
                }
            } catch (error) {
                console.error(
                    "LOAD ERROR",
                    error
                );
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadData();

        const interval = window.setInterval(
            loadData,
            750
        );

        return () => {
            cancelled = true;
            window.clearInterval(interval);
        };
    }, [duelId]);

    const mySubmission = useMemo(() => {
        if (!currentUserId) {
            return null;
        }

        return (
            submissions.find(
                submission =>
                    submission.user_id ===
                    currentUserId
            ) ?? null
        );
    }, [
        submissions,
        currentUserId,
    ]);

    const opponentSubmission =
        useMemo(() => {
            if (!currentUserId) {
                return null;
            }

            return (
                submissions.find(
                    submission =>
                        submission.user_id !==
                        currentUserId
                ) ?? null
            );
        }, [
            submissions,
            currentUserId,
        ]);

    async function handleSubmitTime(
        elapsedMs: number
    ) {
        if (
            !round ||
            submitting ||
            mySubmission
        ) {
            return;
        }

        try {
            setSubmitting(true);
            setSubmitError(null);

            await submitTime(
                round.id,
                elapsedMs
            );
        } catch (error) {
            console.error(
                "TIME SUBMISSION ERROR",
                error
            );

            setSubmitError(
                error instanceof Error
                    ? error.message
                    : "Unable to submit time."
            );
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-brand-bg text-white">
                Loading duel...
            </main>
        );
    }

    if (!duel) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-brand-bg text-white">
                Duel not found.
            </main>
        );
    }

    if (
        duel.status === "waiting" ||
        duel.status === "matched"
    ) {
        return (
            <main className="min-h-screen bg-brand-bg p-4">
                <DuelLobby duel={duel} />
            </main>
        );
    }

    if (duel.status === "countdown") {
        return (
            <main className="flex min-h-screen items-center justify-center bg-brand-bg">
                <DuelCountdown
                    onComplete={() => {
                        console.log(
                            "Countdown finished"
                        );
                    }}
                />
            </main>
        );
    }

    if (
        duel.status === "playing" &&
        round
    ) {
        if (mySubmission) {
            return (
                <main className="flex min-h-screen items-center justify-center bg-brand-bg px-6 text-white">
                    <div className="w-full max-w-md text-center">
                        <p className="text-xs font-black uppercase tracking-[0.25em] text-neon-lime">
                            Time submitted
                        </p>

                        <h1 className="mt-4 text-4xl font-black">
                            Waiting for opponent
                        </h1>

                        <p className="mt-4 text-white/50">
                            Your time was{" "}
                            {(
                                mySubmission.elapsed_ms /
                                1000
                            ).toFixed(3)}
                            .
                        </p>
                    </div>
                </main>
            );
        }

        return (
            <main className="min-h-screen bg-brand-bg">
                <DuelTimer
                    targetMs={
                        round.target_ms
                    }
                    onSubmit={
                        handleSubmitTime
                    }
                />

                {submitting && (
                    <p className="mt-4 text-center text-sm font-bold text-white/50">
                        Submitting time...
                    </p>
                )}

                {submitError && (
                    <p className="mt-4 text-center text-sm font-bold text-red-400">
                        {submitError}
                    </p>
                )}
            </main>
        );
    }

    if (
        duel.status === "revealing" &&
        round
    ) {
        if (
            !mySubmission ||
            !opponentSubmission
        ) {
            return (
                <main className="flex min-h-screen items-center justify-center bg-brand-bg text-white">
                    Loading round results...
                </main>
            );
        }

        return (
            <main className="min-h-screen bg-brand-bg p-4">
                <DuelReveal
                    targetMs={
                        round.target_ms
                    }
                    yourTime={
                        mySubmission.elapsed_ms
                    }
                    opponentTime={
                        opponentSubmission.elapsed_ms
                    }
                />
            </main>
        );
    }

    if (duel.status === "completed") {
        return (
            <main className="flex min-h-screen items-center justify-center bg-brand-bg text-white">
                <div className="text-center">
                    <h1 className="text-5xl font-black">
                        Duel Complete
                    </h1>

                    <p className="mt-4 text-white/60">
                        Results screen coming next.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-brand-bg p-8 text-white">
            <pre>
                {JSON.stringify(
                    {
                        duel,
                        round,
                        currentUserId,
                        submissions,
                    },
                    null,
                    2
                )}
            </pre>
        </main>
    );
}