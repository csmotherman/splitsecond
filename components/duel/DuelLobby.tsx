"use client";

import { useEffect, useMemo, useState } from "react";

import { supabase } from "@/lib/supabase/client";

import {
    setReady,
    startDuel,
} from "@/lib/duel/api";

import {
    subscribeToPlayers,
    unsubscribe,
} from "@/lib/duel/realtime";

type Duel = {
    id: string;
    status: string;
    match_code: string | null;
    current_round: number;
};

type DuelPlayer = {
    id: string;
    duel_id: string;
    user_id: string;
    slot: number;
    ready: boolean;
};

type DuelLobbyProps = {
    duel: Duel;
};

export default function DuelLobby({
    duel,
}: DuelLobbyProps) {
    const [players, setPlayers] =
        useState<DuelPlayer[]>([]);

    const [currentUserId, setCurrentUserId] =
        useState<string | null>(
            null
        );

    const [loadingPlayers, setLoadingPlayers] =
        useState(true);

    const [readyLoading, setReadyLoading] =
        useState(false);

    const [gameStarting, setGameStarting] =
        useState(false);

    useEffect(() => {
        async function load() {
            const {
                data: userData,
            } =
                await supabase.auth.getUser();

            setCurrentUserId(
                userData.user?.id ??
                null
            );

            const {
                data,
                error,
            } = await supabase
                .from("duel_players")
                .select("*")
                .eq(
                    "duel_id",
                    duel.id
                )
                .order("slot");

            if (error) {
                console.error(
                    error
                );
            } else {
                setPlayers(
                    data ?? []
                );
            }

            setLoadingPlayers(
                false
            );
        }

        load();

        const channel =
            subscribeToPlayers(
                duel.id,
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
                                duel.id
                            )
                            .order(
                                "slot"
                            );

                    setPlayers(
                        data ?? []
                    );
                }
            );

        return () => {
            unsubscribe(
                channel
            );
        };
    }, [duel.id]);

    const me = useMemo(
        () =>
            players.find(
                player =>
                    player.user_id ===
                    currentUserId
            ),
        [
            players,
            currentUserId,
        ]
    );

    const allReady =
        players.length === 2 &&
        players.every(
            player =>
                player.ready
        );

    const amHost =
        me?.slot === 1;

    useEffect(() => {
        async function autoStart() {
            if (
                !allReady ||
                !amHost ||
                gameStarting
            ) {
                return;
            }

            try {
                setGameStarting(
                    true
                );

                await startDuel(
                    duel.id
                );

            } catch (error) {
                console.error(
                    error
                );

                setGameStarting(
                    false
                );
            }
        }

        autoStart();
    }, [
        allReady,
        amHost,
        duel.id,
        gameStarting,
    ]);

    async function handleReady() {
        if (
            !me ||
            readyLoading ||
            gameStarting
        ) {
            return;
        }

        try {
            setReadyLoading(
                true
            );

            await setReady(
                duel.id,
                !me.ready
            );
        } catch (error) {
            console.error(
                error
            );
        } finally {
            setReadyLoading(
                false
            );
        }
    }

    return (
        <div className="mx-auto max-w-lg">
            <div className="rounded-3xl border border-white/10 bg-brand-card p-6 text-white">
                <div className="mb-8 text-center">
                    <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-neon-lime">
                        Private Duel
                    </p>

                    <h1 className="text-4xl font-black">
                        Duel Lobby
                    </h1>

                    <p className="mt-4 text-white/60">
                        Share this code
                        with your
                        opponent.
                    </p>

                    <div className="mt-5 rounded-2xl border border-neon-lime/30 bg-black/30 p-4">
                        <div className="font-mono text-4xl font-black tracking-[0.25em] text-neon-lime">
                            {duel.match_code ??
                                "------"}
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white/50">
                        Players
                    </h2>

                    {loadingPlayers && (
                        <div className="rounded-2xl border border-white/10 p-4 text-center text-white/50">
                            Loading...
                        </div>
                    )}

                    {!loadingPlayers &&
                        players.map(
                            player => (
                                <div
                                    key={
                                        player.id
                                    }
                                    className="flex items-center justify-between rounded-2xl border border-white/10 p-4"
                                >
                                    <div>
                                        <div className="font-bold">
                                            Player{" "}
                                            {
                                                player.slot
                                            }

                                            {player.user_id ===
                                                currentUserId &&
                                                " (You)"}
                                        </div>

                                        <div className="text-sm text-white/50">
                                            {player.user_id.slice(
                                                0,
                                                8
                                            )}
                                            ...
                                        </div>
                                    </div>

                                    <div
                                        className={`rounded-xl px-3 py-1 text-sm font-black ${player.ready
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-yellow-500/20 text-yellow-400"
                                            }`}
                                    >
                                        {player.ready
                                            ? "READY"
                                            : "WAITING"}
                                    </div>
                                </div>
                            )
                        )}
                </div>

                <div className="mt-8 space-y-3">
                    <button
                        type="button"
                        onClick={
                            handleReady
                        }
                        disabled={
                            !me ||
                            gameStarting
                        }
                        className="w-full rounded-2xl bg-neon-lime px-5 py-4 text-lg font-black text-black transition hover:brightness-110 disabled:opacity-50"
                    >
                        {gameStarting
                            ? "Starting Duel..."
                            : me?.ready
                                ? "Unready"
                                : "Ready Up"}
                    </button>

                    {allReady && (
                        <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-center">
                            <div className="font-black text-green-400">
                                Starting Duel...
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-6 text-center text-sm text-white/40">
                    {players.length < 2
                        ? "Waiting for opponent..."
                        : allReady
                            ? "Starting duel..."
                            : "Waiting for players to ready up."}
                </div>
            </div>
        </div>
    );
}