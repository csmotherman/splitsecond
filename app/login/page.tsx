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
        <main className="flex min-h-screen items-center justify-center px-6">
            <div className="w-full max-w-md">
                <h1 className="mb-2 text-center text-5xl font-black text-white">
                    SPLIT
                    <span className="text-[#39FF14]">
                        SECOND
                    </span>
                </h1>

                <p className="mb-8 text-center text-zinc-400">
                    Sign in to play today's challenge, save your scores,
                    and start building your SplitSecond profile.
                </p>

                <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-5">
                    <h2 className="mb-4 text-lg font-bold text-white">
                        Why create an account?
                    </h2>

                    <ul className="space-y-3 text-sm text-zinc-300">
                        <li>
                            ✓ Compete on daily and all-time leaderboards
                        </li>

                        <li>
                            ✓ Track your personal records and improvement
                        </li>

                        <li>
                            ✓ Save your challenge history automatically
                        </li>

                        <li>
                            ✓ Reserve your username before more players join
                        </li>
                    </ul>

                    <div className="mt-5 rounded-xl border border-[#39FF14]/20 bg-[#39FF14]/10 p-4">
                        <p className="text-sm text-zinc-200">
                            Future updates will include ELO ratings,
                            player levels, achievements, streaks, seasonal
                            rankings, and additional game modes.
                        </p>

                        <p className="mt-3 text-sm font-medium text-[#39FF14]">
                            The sooner you create your account, the more
                            history, stats, and rewards you'll carry forward
                            as new features launch.
                        </p>
                    </div>
                </div>

                <button
                    onClick={signInWithGoogle}
                    className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-3
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

                <p className="mt-4 text-center text-xs text-zinc-500">
                    Free to play. Sign in takes less than 30 seconds.
                </p>
            </div>
        </main>
    );
}