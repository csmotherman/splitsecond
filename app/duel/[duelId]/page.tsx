"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { supabase } from "@/lib/supabase/client";
import DuelLobby from "@/components/duel/DuelLobby";
import DuelCountdown from "@/components/duel/DuelCountdown";
import DuelTimer from "@/components/duel/DuelTimer";
import { setReady, submitTime } from "@/lib/duel/api";
import {
    subscribeToDuel,
    subscribeToPlayers,
    subscribeToRounds,
    subscribeToSubmissions,
    unsubscribe,
} from "@/lib/duel/realtime";

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

type DuelPlayer = {
    id: string;
    duel_id: string;
    user_id: string;
    slot: number;
    ready: boolean;
    round_wins: number;
};

function formatSeconds(milliseconds: number) {
    return (milliseconds / 1000).toFixed(3);
}

export default function DuelPage() {
    const params = useParams();
    const duelId = params.duelId as string;

    const [loading, setLoading] = useState(true);
    const [duel, setDuel] = useState<Duel | null>(null);
    const [rounds, setRounds] = useState<DuelRound[]>([]);
    const [players, setPlayers] = useState<DuelPlayer[]>([]);
    const [submissions, setSubmissions] = useState<DuelSubmission[]>([]);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const advancedRoundRef = useRef<string | null>(null);

    const loadData = useCallback(async () => {
        try {
            const { data: authData, error: authError } = await supabase.auth.getUser();
            if (authError) console.error("AUTH ERROR", authError);
            const userId = authData.user?.id ?? null;
            setCurrentUserId(userId);

            const [duelResult, playersResult, roundsResult] = await Promise.all([
                supabase.from("duels").select("id,status,match_code,current_round,winner_user_id").eq("id", duelId).single(),
                supabase.from("duel_players").select("*").eq("duel_id", duelId).order("slot"),
                supabase.from("duel_rounds").select("id,duel_id,round_number,target_ms,status,winner_user_id,is_tie").eq("duel_id", duelId).order("round_number"),
            ]);

            if (duelResult.error) throw duelResult.error;
            if (playersResult.error) throw playersResult.error;
            if (roundsResult.error) throw roundsResult.error;

            const loadedRounds = roundsResult.data ?? [];
            const roundIds = loadedRounds.map((item) => item.id);
            let loadedSubmissions: DuelSubmission[] = [];

            if (roundIds.length > 0) {
                const submissionResult = await supabase
                    .from("duel_round_submissions")
                    .select("id,round_id,user_id,elapsed_ms,error_ms,submitted_at")
                    .in("round_id", roundIds)
                    .order("submitted_at");
                if (submissionResult.error) throw submissionResult.error;
                loadedSubmissions = submissionResult.data ?? [];
            }

            setDuel(duelResult.data);
            setPlayers(playersResult.data ?? []);
            setRounds(loadedRounds);
            setSubmissions(loadedSubmissions);
        } catch (error) {
            console.error("DUEL LOAD ERROR", error);
        } finally {
            setLoading(false);
        }
    }, [duelId]);

    useEffect(() => {
        loadData();
        const channels = [
            subscribeToDuel(duelId, loadData),
            subscribeToPlayers(duelId, loadData),
            subscribeToRounds(duelId, loadData),
            subscribeToSubmissions(loadData),
        ];
        const fallback = window.setInterval(loadData, 15000);
        return () => {
            window.clearInterval(fallback);
            channels.forEach(unsubscribe);
        };
    }, [duelId, loadData]);

    const currentRound = useMemo(() => {
        if (!duel) return null;
        return rounds.find((item) => item.round_number === duel.current_round)
            ?? rounds[rounds.length - 1]
            ?? null;
    }, [duel, rounds]);

    const me = useMemo(
        () => players.find((player) => player.user_id === currentUserId) ?? null,
        [players, currentUserId]
    );
    const opponent = useMemo(
        () => players.find((player) => player.user_id !== currentUserId) ?? null,
        [players, currentUserId]
    );

    const submissionsForRound = useMemo(
        () => currentRound ? submissions.filter((item) => item.round_id === currentRound.id) : [],
        [submissions, currentRound]
    );
    const myCurrentSubmission = useMemo(
        () => submissionsForRound.find((item) => item.user_id === currentUserId) ?? null,
        [submissionsForRound, currentUserId]
    );

    const mySubmissions = useMemo(
        () => submissions.filter((item) => item.user_id === currentUserId),
        [submissions, currentUserId]
    );
    const opponentSubmissions = useMemo(
        () => submissions.filter((item) => item.user_id !== currentUserId),
        [submissions, currentUserId]
    );

    useEffect(() => {
        if (
            duel?.status !== "revealing" ||
            !currentRound ||
            submissionsForRound.length < 2 ||
            !me ||
            advancedRoundRef.current === currentRound.id
        ) return;

        advancedRoundRef.current = currentRound.id;
        const timer = window.setTimeout(async () => {
            try {
                await setReady(duel.id, true);
            } catch (error) {
                advancedRoundRef.current = null;
                console.error("AUTO ADVANCE ERROR", error);
            }
        }, 1600);
        return () => window.clearTimeout(timer);
    }, [duel, currentRound, submissionsForRound.length, me]);

    async function handleSubmitTime(elapsedMs: number) {
        if (!currentRound || submitting || myCurrentSubmission) return;
        try {
            setSubmitting(true);
            setSubmitError(null);
            await submitTime(currentRound.id, elapsedMs);
            await loadData();
        } catch (error) {
            console.error("TIME SUBMISSION ERROR", error);
            setSubmitError(error instanceof Error ? error.message : "Unable to submit time.");
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return <main className="flex min-h-screen items-center justify-center bg-brand-bg text-white">Loading duel...</main>;
    }
    if (!duel) {
        return <main className="flex min-h-screen items-center justify-center bg-brand-bg text-white">Duel not found.</main>;
    }

    if (duel.status === "waiting" || duel.status === "matched") {
        return <main className="min-h-screen bg-brand-bg p-4"><DuelLobby duel={duel} /></main>;
    }

    if (duel.status === "countdown") {
        return <main className="flex min-h-screen items-center justify-center bg-brand-bg"><DuelCountdown onComplete={loadData} /></main>;
    }

    if (duel.status === "playing" && currentRound) {
        if (myCurrentSubmission) {
            return (
                <main className="flex min-h-screen items-center justify-center bg-brand-bg px-6 text-white">
                    <div className="w-full max-w-md text-center">
                        <p className="text-xs font-black uppercase tracking-[0.25em] text-neon-lime">Round {currentRound.round_number} of 3</p>
                        <h1 className="mt-4 text-4xl font-black">Waiting for opponent</h1>
                        <p className="mt-4 text-white/50">Your time was {formatSeconds(myCurrentSubmission.elapsed_ms)}s.</p>
                    </div>
                </main>
            );
        }
        return (
            <main className="min-h-screen bg-brand-bg px-6 py-10">
                <div className="mx-auto mb-8 max-w-md text-center text-white">
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-white/40">Round {currentRound.round_number} of 3</p>
                </div>
                <DuelTimer targetMs={currentRound.target_ms} onSubmit={handleSubmitTime} />
                {submitting && <p className="mt-4 text-center text-sm font-bold text-white/50">Submitting time...</p>}
                {submitError && <p className="mt-4 text-center text-sm font-bold text-red-400">{submitError}</p>}
            </main>
        );
    }

    if (duel.status === "revealing" && currentRound) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-brand-bg px-6 text-white">
                <section className="w-full max-w-md rounded-3xl border border-white/10 bg-brand-card p-8 text-center">
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-neon-lime">Round {currentRound.round_number} complete</p>
                    <div className="mt-6 text-sm uppercase tracking-[0.2em] text-white/40">Target</div>
                    <div className="mt-2 text-5xl font-black">{formatSeconds(currentRound.target_ms)}s</div>
                    {myCurrentSubmission ? (
                        <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
                            <div className="text-sm text-white/50">Your time</div>
                            <div className="mt-1 text-3xl font-black text-neon-lime">{formatSeconds(myCurrentSubmission.elapsed_ms)}s</div>
                            <div className="mt-2 text-sm font-bold text-white/60">Error {formatSeconds(Math.abs(myCurrentSubmission.error_ms))}s</div>
                        </div>
                    ) : <p className="mt-8 text-white/50">Waiting for your submission...</p>}
                    <p className="mt-6 text-sm text-white/40">{submissionsForRound.length < 2 ? "Waiting for opponent..." : currentRound.round_number < 3 ? "Next round starting..." : "Calculating final result..."}</p>
                </section>
            </main>
        );
    }

    if (duel.status === "completed") {
        const myTotal = mySubmissions.reduce((sum, item) => sum + Math.abs(item.error_ms), 0);
        const opponentTotal = opponentSubmissions.reduce((sum, item) => sum + Math.abs(item.error_ms), 0);
        const didWin = myTotal < opponentTotal;
        const isTie = myTotal === opponentTotal;
        return (
            <main className="min-h-screen bg-brand-bg px-4 py-10 text-white">
                <section className="mx-auto w-full max-w-xl">
                    <header className="text-center">
                        <p className="text-xs font-black uppercase tracking-[0.25em] text-neon-lime">Duel complete</p>
                        <h1 className="mt-3 text-5xl font-black">{isTie ? "Tie Game" : didWin ? "You Win" : "You Lose"}</h1>
                        <p className="mt-3 text-white/50">Lowest total error wins.</p>
                    </header>
                    <div className="mt-8 grid grid-cols-2 gap-3">
                        <div className="rounded-3xl border border-neon-lime/30 bg-brand-card p-5 text-center"><div className="text-xs font-black uppercase tracking-widest text-white/40">You</div><div className="mt-2 text-4xl font-black text-neon-lime">{formatSeconds(myTotal)}s</div></div>
                        <div className="rounded-3xl border border-white/10 bg-brand-card p-5 text-center"><div className="text-xs font-black uppercase tracking-widest text-white/40">Opponent</div><div className="mt-2 text-4xl font-black">{formatSeconds(opponentTotal)}s</div></div>
                    </div>
                    <div className="mt-5 space-y-3">
                        {rounds.slice(0, 3).map((round) => {
                            const mine = mySubmissions.find((item) => item.round_id === round.id);
                            const theirs = opponentSubmissions.find((item) => item.round_id === round.id);
                            return (
                                <div key={round.id} className="rounded-2xl border border-white/10 bg-brand-card p-4">
                                    <div className="flex items-center justify-between"><span className="font-black">Round {round.round_number}</span><span className="text-sm text-white/40">Target {formatSeconds(round.target_ms)}s</span></div>
                                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                        <div><div className="text-white/40">You</div><div className="mt-1 font-black">{mine ? `${formatSeconds(mine.elapsed_ms)}s` : "—"}</div><div className="text-white/50">{mine ? `±${formatSeconds(Math.abs(mine.error_ms))}s` : ""}</div></div>
                                        <div><div className="text-white/40">Opponent</div><div className="mt-1 font-black">{theirs ? `${formatSeconds(theirs.elapsed_ms)}s` : "—"}</div><div className="text-white/50">{theirs ? `±${formatSeconds(Math.abs(theirs.error_ms))}s` : ""}</div></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <Link href="/duel" className="mt-8 block w-full rounded-2xl bg-neon-lime px-5 py-4 text-center text-lg font-black text-black">Back to Duels</Link>
                </section>
            </main>
        );
    }

    return <main className="flex min-h-screen items-center justify-center bg-brand-bg text-white">Updating duel...</main>;
}
