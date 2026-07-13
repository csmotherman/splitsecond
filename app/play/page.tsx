"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import GameContainer from "@/components/game/GameContainer";
import { getTodaysChallenge } from "@/lib/game/challenges";
import { getOrCreateSubmission } from "@/lib/game/submissions";
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

// 1. Separate the content that uses search params
function PlayPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const mode: Mode = searchParams.get("mode") === "extreme" ? "extreme" : "normal";

    // 2. Consolidate state to prevent unnecessary re-renders
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
        // 3. Use standard AbortController for cleanup
        const controller = new AbortController();

        async function loadGame() {
            try {
                const {
                    data: { session },
                } = await supabase.auth.getSession();

                if (!session) {
                    router.replace("/login");
                    return;
                }

                const challengeData = (await getTodaysChallenge(mode)) as DailyChallenge;

                if (!challengeData) {
                    throw new Error(`No ${mode} challenge is available for today.`);
                }

                // 4. Streamlined validation logic
                const isValidTarget = (t: unknown) => typeof t === "number" && Number.isFinite(t) && t > 0;
                if (!Array.isArray(challengeData.targets) || challengeData.targets.length !== 5 || !challengeData.targets.every(isValidTarget)) {
                    throw new Error("Today's challenge contains invalid or missing targets.");
                }

                const submissionData = (await getOrCreateSubmission(challengeData.id)) as DailySubmission;

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
                    setGameState((prev) => ({
                        ...prev,
                        loading: false,
                        error: error instanceof Error ? error.message : "Unable to load today's challenge.",
                    }));
                }
            }
        }

        void loadGame();

        return () => {
            controller.abort(); // Cleanup on unmount
        };
    }, [mode, router]);

    if (gameState.loading) {
        return (
            // Removed bg-black and text-white
            <main className="flex min-h-screen items-center justify-center px-4">
                <p className="text-zinc-500 dark:text-zinc-400">
                    Loading today&apos;s challenge...
                </p>
            </main>
        );
    }

    if (gameState.error || !gameState.challenge || !gameState.submission) {
        return (
            <main className="flex min-h-screen items-center justify-center px-4">
                <div className="w-full max-w-md text-center">
                    <h1 className="text-2xl font-bold">
                        Challenge unavailable
                    </h1>

                    <p className="mt-3 text-zinc-500 dark:text-zinc-400">
                        {gameState.error ?? "Today's challenge could not be loaded."}
                    </p>

                    <button
                        type="button"
                        onClick={() => router.replace("/")}
                        className="mt-6 rounded-xl bg-green-500 px-6 py-3 font-bold text-white transition hover:bg-green-400"
                    >
                        Return Home
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen">
            <GameContainer
                mode={mode}
                targets={gameState.challenge.targets}
                submission={gameState.submission}
            />
        </main>
    );
}

// 5. Wrap the export in a Suspense boundary for Next.js App Router compliance
export default function PlayPage() {
    return (
        <Suspense fallback={
            <main className="flex min-h-screen items-center justify-center px-4">
                <p className="text-zinc-500 dark:text-zinc-400">Loading...</p>
            </main>
        }>
            <PlayPageContent />
        </Suspense>
    );
}