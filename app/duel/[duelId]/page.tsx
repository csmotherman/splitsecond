"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { supabase } from "@/lib/supabase/client";

import DuelLobby from "@/components/duel/DuelLobby";
import DuelCountdown from "@/components/duel/DuelCountdown";
import DuelTimer from "@/components/duel/DuelTimer";
import DuelReveal from "@/components/duel/DuelReveal";

import {
    subscribeToDuel,
    subscribeToPlayers,
    subscribeToRounds,
    unsubscribe,
} from "@/lib/duel/realtime";

import {
    submitTime,
} from "@/lib/duel/api";

type Duel = {
    id: string;
    status: string;
    match_code: string | null;
    current_round: number;
    winner_user_id: string | null;
};

type DuelPlayer = {
    id: string;
    duel_id: string;
    user_id: string;
    slot: number;
    ready: boolean;
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

    const [players, setPlayers] =
        useState<DuelPlayer[]>([]);

    const [round, setRound] =
        useState<DuelRound | null>(
            null
        );

    const [currentUserId, setCurrentUserId] =
        useState<string | null>(
            null
        );

    const [mySubmission, setMySubmission] =
        useState<number | null>(
            null
        );

    useEffect(() => {
        async function loadData() {
            const {
                data: authData,
            } =
                await supabase.auth.getUser();

            setCurrentUserId(
                authData.user?.id ??
                null
            );

            const {
                data: duelData,
            } = await supabase
                .from("duels")
                .select("*")
                .eq("id", duelId)
                .single();

            const {
                data: playerData,
            } = await supabase
                .from("duel_players")
                .select("*")
                .eq(
                    "duel_id",
                    duelId
                )
                .order("slot");

            const {
                data: roundData,
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

            setDuel(duelData);
            setPlayers(
                playerData ?? []
            );
            setRound(roundData);

            setLoading(false);
        }

        loadData();

        const duelChannel =
            subscribeToDuel(
                duelId,
                payload => {
                    setDuel(
                        payload.new as Duel
                    );
                }
            );

        const playerChannel =
            subscribeToPlayers(
                duelId,
                async () => {
                    const {
                        data,
                    } =
                        await supabase
                            .from(
                                "duel_players"
                            )
                            .select("*")
                            .eq(
                                "duel_id",
                                duelId
                            )
                            .order(
                                "slot"
                            );

                    setPlayers(
                        data ?? []
                    );
                }
            );

        const roundChannel =
            subscribeToRounds(
                duelId,
                payload => {
                    setRound(
                        payload.new as DuelRound
                    );
                }
            );

        return () => {
            unsubscribe(
                duelChannel
            );

            unsubscribe(
                playerChannel
            );

            unsubscribe(
                roundChannel
            );
        };
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

                    /*
                     TODO:
                     replace with
                     actual opponent
                     submission once
                     reveal query
                     exists
                    */
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
        <main className="flex min-h-screen items-center justify-center text-white">
            Unknown duel state.
        </main>
    );
}