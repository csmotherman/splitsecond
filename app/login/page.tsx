"use client";

import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
    async function signInWithGoogle() {
        const redirectTo =
            `${window.location.origin}/auth/callback`;

        const result =
            await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo,
                },
            });

        console.log(result);
    }

    return (
        <main className="flex min-h-[70vh] items-center justify-center px-6">
            <div className="w-full max-w-md">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h1 className="text-center text-2xl font-bold text-white">
                        Why create an account?
                    </h1>

                    <p className="mt-3 text-center text-sm text-zinc-400">
                        SplitSecond is just getting started. Creating an account now
                        ensures your progress, scores, and future achievements stay
                        attached to your profile from day one.
                    </p>

                    <div className="mt-6 space-y-3 text-sm text-zinc-300">
                        <div>✓ Compete on daily and all-time leaderboards</div>
                        <div>✓ Save your challenge history automatically</div>
                        <div>✓ Track personal bests and improvement over time</div>
                        <div>✓ Secure your username before the community grows</div>
                    </div>

                    <div className="mt-6 rounded-xl border border-[#39FF14]/20 bg-[#39FF14]/10 p-4">
                        <h2 className="mb-2 font-semibold text-[#39FF14]">
                            Coming Soon
                        </h2>

                        <p className="text-sm text-zinc-300">
                            ELO ratings, player levels, achievements, streaks,
                            seasonal rankings, profile stats, and additional game
                            modes are all planned for future updates.
                        </p>

                        <p className="mt-3 text-sm font-medium text-white">
                            The earlier you join, the more history and statistics
                            you'll build as new features are released.
                        </p>
                    </div>

                    <button
                        onClick={signInWithGoogle}
                        className="
                    mt-6
                    w-full
                    rounded-2xl
                    bg-white
                    px-5
                    py-4
                    font-semibold
                    text-black
                    transition
                    hover:scale-[1.02]
                "
                    >
                        Continue with Google
                    </button>

                    <p className="mt-3 text-center text-xs text-zinc-500">
                        Free to play. Sign in takes less than 30 seconds.
                    </p>
                </div>
            </div>
        </main>
    );
}