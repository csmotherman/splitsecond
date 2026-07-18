"use client";

import { useEffect, useState } from "react";

import GameContainer from "@/components/game/GameContainer";

function generateTargets(): number[] {
    return Array.from({ length: 5 }, () =>
        Number((Math.random() * 9 + 1).toFixed(2))
    );
}

export default function UnlimitedPage() {
    const [gameKey, setGameKey] = useState(0);
    const [targets, setTargets] = useState<number[] | null>(null);

    useEffect(() => {
        setTargets(generateTargets());
    }, []);

    const startNewGame = () => {
        setTargets(generateTargets());
        setGameKey((currentKey) => currentKey + 1);
    };

    if (!targets) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <p className="text-zinc-500">Loading...</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen">
            <GameContainer
                key={gameKey}
                mode="normal"
                targets={targets}
                gameMode="unlimited"
            />

            <div className="mx-auto w-full max-w-xl px-4 pb-10">
                <button
                    type="button"
                    onClick={startNewGame}
                    className="w-full rounded-xl border border-white/10 bg-zinc-800/80 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-zinc-700"
                >
                    NEW GAME
                </button>

                <p className="mt-3 text-center text-xs text-zinc-500">
                    Unlimited games are played locally and are not saved.
                </p>
            </div>
        </main>
    );
}