"use client";

import { useEffect, useState } from "react";
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

export default function DuelPage() {
    const params = useParams();

    const duelId =
        params.duelId as string;

    const [loading, setLoading] =
        useState(true);

    const [duel, setDuel] =
        useState<Duel | null>(null);

    const [round, setRound] =
        useState<DuelRound | null>(
            null
        );

    const [mySubmission, setMySubmission] =
        useState<number | null>(
            null
        );

    useEffect(() => {
        async function loadData() {
            try {
                console.log(
                    "Loading duel:",
                    duelId
                );

                const {
                    data: duelData,
                    error: duelError,
                } = await supabase
                    .from("duels")
                    .select("*")
                    .eq("id", duelId)
                    .single();

                if (duelError) {
                    console.error(
                        "DUEL ERROR",
                        duelError
                    );

                    setLoading(false);
                    return;
                }

                const {
                    data: roundData,
                    error: roundError,
                } = await supabase
                    .from("duel_rounds")
                    .select("*")
                    .eq(
                        "duel_id",
                        duelId
                    )
                    .order(
                        "round_number",
                        {
                            ascending:
                                false,
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

                setDuel(duelData);
                setRound(roundData);
            } catch (error) {
                console.error(
                    "LOAD ERROR",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [duelId]);

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center text-white">
                Loading duel...
            </main>
        );
    }

    if (!duel) {
        return (
            <main className="flex min-h-screen items-center justify-center text-white">
                Duel not found.
            </main>
        );
    }

    if (
        duel.status ===
        "waiting" ||
        duel.status ===
        "matched"
    ) {
        return (
            <main className="min-h-screen bg-brand-bg p-4">
                <DuelLobby
                    duel={duel}
                />
            </main>
        );
    }

    if (
        duel.status ===
        "countdown"
    ) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-brand-bg">
                <DuelCountdown
                    onComplete={() =>
                        console.log(
                            "Countdown finished"
                        )
                    }
                />
            </main>
        );
    }

    if (
        duel.status ===
        "playing" &&
        round
    ) {
        return (
            <main className="min-h-screen bg-brand-bg">
                <DuelTimer
                    targetMs={
                        round.target_ms
                    }
                    onSubmit={async (
                        elapsedMs
                    ) => {
                        setMySubmission(
                            elapsedMs
                        );

                        await submitTime(
                            round.id,
                            elapsedMs
                        );
                    }}
                />
            </main>
        );
    }

    if (
        duel.status ===
        "revealing" &&
        round &&
        mySubmission !==
        null
    ) {
        return (
            <main className="min-h-screen bg-brand-bg p-4">
                <DuelReveal
                    targetMs={
                        round.target_ms
                    }
                    yourTime={
                        mySubmission
                    }
                    opponentTime={
                        round.target_ms
                    }
                />
            </main>
        );
    }

    if (
        duel.status ===
        "completed"
    ) {
        return (
            <main className="flex min-h-screen items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-5xl font-black">
                        Duel Complete
                    </h1>

                    <p className="mt-4 text-white/60">
                        Results screen
                        coming next.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="p-8 text-white">
            <pre>
                {JSON.stringify(
                    {
                        duel,
                        round,
                    },
                    null,
                    2
                )}
            </pre>
        </main>
    );
}