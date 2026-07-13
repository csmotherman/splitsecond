"use client";

import { useEffect, useState } from "react";
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

export default function PlayPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const mode: Mode =
        searchParams.get("mode") === "extreme"
            ? "extreme"
            : "normal";

    const [challenge, setChallenge] =
        useState<DailyChallenge | null>(null);

    const [submission, setSubmission] =
        useState<DailySubmission | null>(null);

    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] =
        useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function loadGame() {
            try {
                setLoading(true);
                setErrorMessage(null);

                const {
                    data: { user },
                    error: authError,
                } = await supabase.auth.getUser();

                if (authError) {
                    throw authError;
                }

                if (!user) {
                    router.replace("/login");
                    return;
                }

                const challengeData =
                    (await getTodaysChallenge(mode)) as DailyChallenge;
                console.log("CHALLENGE:", challengeData);
                if (!challengeData) {
                    throw new Error(
                        `No ${mode} challenge is available for today.`
                    );
                }

                if (
                    !Array.isArray(challengeData.targets) ||
                    challengeData.targets.length !== 5
                ) {
                    throw new Error(
                        "Today's challenge does not contain five valid targets."
                    );
                }

                const targetsAreValid = challengeData.targets.every(
                    (target) =>
                        typeof target === "number" &&
                        Number.isFinite(target) &&
                        target > 0
                );

                if (!targetsAreValid) {
                    throw new Error(
                        "Today's challenge contains invalid target values."
                    );
                }

                const submissionData =
                    (await getOrCreateSubmission(
                        challengeData.id
                    )) as DailySubmission;

                if (cancelled) {
                    return;
                }

                setChallenge(challengeData);
                setSubmission(submissionData);
            } catch (error) {
                if (cancelled) {
                    return;
                }

                console.error("Unable to load game:", error);

                setErrorMessage(
                    error instanceof Error
                        ? error.message
                        : "Unable to load today's challenge."
                );
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        void loadGame();

        return () => {
            cancelled = true;
        };
    }, [mode, router]);

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
                <p className="text-zinc-400">
                    Loading today&apos;s challenge...
                </p>
            </main>
        );
    }

    if (errorMessage || !challenge || !submission) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
                <div className="w-full max-w-md text-center">
                    <h1 className="text-2xl font-bold">
                        Challenge unavailable
                    </h1>

                    <p className="mt-3 text-zinc-400">
                        {errorMessage ??
                            "Today's challenge could not be loaded."}
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
        <main className="min-h-screen bg-black text-white">
            <GameContainer
                mode={mode}
                targets={challenge.targets}
                submission={submission}
            />
        </main>
    );
}