"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { RealtimeChannel } from "@supabase/supabase-js";

import GameContainer, { RoundResult } from "@/components/game/GameContainer";
import DuelCountdown from "@/components/duel/DuelCountdown";
import DuelLobby from "@/components/duel/DuelLobby";
import { getTodaysChallenge } from "@/lib/game/challenges";
import { subscribeToDuel, unsubscribe } from "@/lib/duel/realtime";
import { supabase } from "@/lib/supabase/client";

type Duel = {
    id: string;
    status: string;
    match_code: string | null;
};

type DuelResult = {
    userId: string;
    results: RoundResult[];
    totalError: number;
};

type DailyChallenge = {
    targets: number[];
};

function DuelResults({
    mine,
    opponent,
}: {
    mine: DuelResult;
    opponent: DuelResult | null;
}) {
    if (!opponent) {
        return (
            <div className="mx-auto w-full max-w-xl px-4 py-8 text-center">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-neon-lime">
                    You finished
                </p>
                <h1 className="mt-3 text-4xl font-black text-white">
                    Waiting for opponent
                </h1>
                <p className="mt-4 text-zinc-400">
                    Your total error was {mine.totalError.toFixed(2)}s.
                </p>
            </div>
        );
    }

    const isTie = mine.totalError === opponent.totalError;
    const didWin = mine.totalError < opponent.totalError;

    return (
        <div className="mx-auto w-full max-w-xl px-4 py-8 text-white">
            <header className="text-center">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-neon-lime">
                    Duel complete
                </p>
                <h1 className="mt-3 text-5xl font-black">
                    {isTie ? "Tie Game" : didWin ? "You Win" : "You Lose"}
                </h1>
                <p className="mt-3 text-zinc-400">Lowest total error wins.</p>
            </header>

            <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-3xl border border-neon-lime/30 bg-brand-card p-5 text-center">
                    <div className="text-xs font-black uppercase tracking-widest text-zinc-500">You</div>
                    <div className="mt-2 text-4xl font-black text-neon-lime">
                        {mine.totalError.toFixed(2)}s
                    </div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-brand-card p-5 text-center">
                    <div className="text-xs font-black uppercase tracking-widest text-zinc-500">Opponent</div>
                    <div className="mt-2 text-4xl font-black">
                        {opponent.totalError.toFixed(2)}s
                    </div>
                </div>
            </div>

            <div className="mt-5 space-y-3">
                {mine.results.map((result, index) => {
                    const opponentResult = opponent.results[index];
                    return (
                        <div key={index} className="rounded-2xl border border-white/10 bg-brand-card p-4">
                            <div className="flex items-center justify-between">
                                <span className="font-black">Round {index + 1}</span>
                                <span className="text-sm text-zinc-500">Target {result.target.toFixed(2)}s</span>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <div className="text-zinc-500">You</div>
                                    <div className="mt-1 font-black">{result.actual.toFixed(2)}s</div>
                                    <div className="text-zinc-400">±{result.error.toFixed(2)}s</div>
                                </div>
                                <div>
                                    <div className="text-zinc-500">Opponent</div>
                                    <div className="mt-1 font-black">{opponentResult?.actual.toFixed(2) ?? "—"}s</div>
                                    <div className="text-zinc-400">
                                        {opponentResult ? `±${opponentResult.error.toFixed(2)}s` : ""}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Link
                href="/duel"
                className="mt-6 block w-full rounded-2xl bg-neon-lime px-5 py-4 text-center text-lg font-black text-black"
            >
                Back to Duels
            </Link>
        </div>
    );
}

export default function DuelPage() {
    const params = useParams();
    const duelId = params.duelId as string;

    const [loading, setLoading] = useState(true);
    const [duel, setDuel] = useState<Duel | null>(null);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [targets, setTargets] = useState<number[]>([]);
    const [myResult, setMyResult] = useState<DuelResult | null>(null);
    const [opponentResult, setOpponentResult] = useState<DuelResult | null>(null);
    const liveChannelRef = useRef<RealtimeChannel | null>(null);

    const loadDuel = useCallback(async () => {
        const [{ data: authData }, duelResponse] = await Promise.all([
            supabase.auth.getUser(),
            supabase
                .from("duels")
                .select("id,status,match_code")
                .eq("id", duelId)
                .single(),
        ]);

        setCurrentUserId(authData.user?.id ?? null);
        if (duelResponse.error) {
            console.error("DUEL LOAD ERROR", duelResponse.error);
            setDuel(null);
        } else {
            setDuel(duelResponse.data);
        }
        setLoading(false);
    }, [duelId]);

    useEffect(() => {
        void loadDuel();
        const duelChannel = subscribeToDuel(duelId, () => void loadDuel());
        return () => {
            void unsubscribe(duelChannel);
        };
    }, [duelId, loadDuel]);

    useEffect(() => {
        async function loadTargets() {
            try {
                const challenge = await getTodaysChallenge("normal") as DailyChallenge;
                if (!challenge?.targets?.length) {
                    throw new Error("Today's targets are unavailable.");
                }
                setTargets(challenge.targets);
            } catch (error) {
                console.error("DUEL TARGET ERROR", error);
            }
        }

        void loadTargets();
    }, []);

    useEffect(() => {
        if (!currentUserId) return;

        const channel = supabase
            .channel(`duel-live:${duelId}`)
            .on("broadcast", { event: "finished" }, ({ payload }) => {
                const incoming = payload as DuelResult;
                if (incoming.userId !== currentUserId) {
                    setOpponentResult(incoming);
                }
            })
            .subscribe();

        liveChannelRef.current = channel;
        return () => {
            liveChannelRef.current = null;
            void supabase.removeChannel(channel);
        };
    }, [duelId, currentUserId]);

    const finishedContent = useMemo(() => {
        if (!myResult) return null;
        return <DuelResults mine={myResult} opponent={opponentResult} />;
    }, [myResult, opponentResult]);

    async function handleComplete(results: RoundResult[], totalError: number) {
        if (!currentUserId) return;

        const completed: DuelResult = {
            userId: currentUserId,
            results,
            totalError,
        };
        setMyResult(completed);

        await liveChannelRef.current?.send({
            type: "broadcast",
            event: "finished",
            payload: completed,
        });
    }

    if (loading) {
        return <main className="flex min-h-screen items-center justify-center text-white">Loading duel...</main>;
    }

    if (!duel) {
        return <main className="flex min-h-screen items-center justify-center text-white">Duel not found.</main>;
    }

    if (duel.status === "waiting" || duel.status === "matched") {
        return <main className="min-h-screen p-4"><DuelLobby duel={duel} /></main>;
    }

    if (duel.status === "countdown") {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <DuelCountdown onComplete={() => void loadDuel()} />
            </main>
        );
    }

    if (targets.length === 0) {
        return <main className="flex min-h-screen items-center justify-center text-white">Loading today&apos;s game...</main>;
    }

    return (
        <main className="min-h-screen">
            <GameContainer
                mode="normal"
                gameMode="duel"
                targets={targets}
                onComplete={handleComplete}
                finishedContent={finishedContent}
            />
        </main>
    );
}
