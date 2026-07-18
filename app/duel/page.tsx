"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/client";
import {
    createPrivateDuel,
    joinPrivateDuel,
} from "@/lib/duel/api";

export default function DuelMenuPage() {
    const router = useRouter();
    const [matchCode, setMatchCode] = useState("");
    const [loadingAction, setLoadingAction] = useState<"create" | "join" | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        async function checkAuthentication() {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) console.error("Failed to check authentication:", error);
            setIsAuthenticated(Boolean(user));
            setCheckingAuth(false);
        }
        void checkAuthentication();
    }, []);

    async function handleCreateDuel() {
        if (loadingAction) return;
        setErrorMessage(null);
        setLoadingAction("create");
        try {
            const duelId = await createPrivateDuel();
            router.push(`/duel/${duelId}`);
        } catch (error) {
            console.error("Failed to create duel:", error);
            setErrorMessage(error instanceof Error ? error.message : "Unable to create the duel.");
        } finally {
            setLoadingAction(null);
        }
    }

    async function handleJoinDuel(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (loadingAction) return;
        const normalizedCode = matchCode.trim().toUpperCase();
        if (normalizedCode.length !== 6) {
            setErrorMessage("Enter the six-character match code.");
            return;
        }
        setErrorMessage(null);
        setLoadingAction("join");
        try {
            const duelId = await joinPrivateDuel(normalizedCode);
            router.push(`/duel/${duelId}`);
        } catch (error) {
            console.error("Failed to join duel:", error);
            setErrorMessage(error instanceof Error ? error.message : "Unable to join the duel.");
        } finally {
            setLoadingAction(null);
        }
    }

    function handleCodeChange(value: string) {
        setMatchCode(value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6));
        setErrorMessage(null);
    }

    if (checkingAuth) {
        return <main className="flex min-h-[75vh] items-center justify-center px-6 text-white"><p className="text-sm font-bold uppercase tracking-[0.2em] text-white/50">Loading duels...</p></main>;
    }

    if (!isAuthenticated) {
        return (
            <main className="flex min-h-[75vh] items-center justify-center px-6">
                <section className="w-full max-w-md rounded-3xl border border-white/10 bg-brand-card p-8 text-center text-white">
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-neon-lime">1v1 Duels</p>
                    <h1 className="text-4xl font-black">Sign in to duel</h1>
                    <p className="mt-4 text-sm leading-6 text-white/60">An account is only used to identify both players inside the lobby. Duel scores are not saved.</p>
                    <button type="button" onClick={() => router.push("/login")} className="mt-8 w-full rounded-2xl bg-neon-lime px-5 py-4 text-base font-black text-black transition hover:brightness-110 active:scale-[0.98]">Go to Login</button>
                </section>
            </main>
        );
    }

    return (
        <main className="flex min-h-[75vh] items-center justify-center px-6 py-10">
            <section className="w-full max-w-md text-white">
                <header className="mb-8 text-center">
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-neon-lime">Daily 1v1</p>
                    <h1 className="text-5xl font-black tracking-tight">Duels</h1>
                    <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-white/60">Create a lobby or enter a friend&apos;s code. You both play today&apos;s exact five-round game, then compare scores at the end.</p>
                </header>
                <div className="space-y-4">
                    <button type="button" onClick={handleCreateDuel} disabled={Boolean(loadingAction)} className="w-full rounded-2xl bg-neon-lime px-5 py-5 text-lg font-black text-black transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50">{loadingAction === "create" ? "Creating Lobby..." : "Create Lobby"}</button>
                    <div className="flex items-center gap-4 py-2"><div className="h-px flex-1 bg-white/10"/><span className="text-xs font-black uppercase tracking-[0.2em] text-white/35">Or join</span><div className="h-px flex-1 bg-white/10"/></div>
                    <form onSubmit={handleJoinDuel} className="rounded-3xl border border-white/10 bg-brand-card p-5">
                        <label htmlFor="match-code" className="mb-3 block text-xs font-black uppercase tracking-[0.2em] text-white/50">Lobby code</label>
                        <input id="match-code" name="match-code" type="text" value={matchCode} onChange={(event) => handleCodeChange(event.target.value)} placeholder="ABC123" autoComplete="off" autoCapitalize="characters" spellCheck={false} maxLength={6} disabled={Boolean(loadingAction)} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-center font-mono text-3xl font-black uppercase tracking-[0.3em] text-white outline-none transition placeholder:text-white/15 focus:border-neon-lime/70 disabled:opacity-50"/>
                        <button type="submit" disabled={Boolean(loadingAction) || matchCode.length !== 6} className="mt-4 w-full rounded-2xl border border-white/10 bg-white px-5 py-4 text-base font-black text-black transition hover:bg-white/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40">{loadingAction === "join" ? "Joining Lobby..." : "Join Lobby"}</button>
                    </form>
                    {errorMessage && <div role="alert" className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm font-bold text-red-300">{errorMessage}</div>}
                </div>
            </section>
        </main>
    );
}
