"use client";

import { Trophy, BarChart3, User } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
    async function signInWithGoogle() {
        const redirectTo = `${window.location.origin}/auth/callback`;

        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo,
            },
        });
    }

    return (
        <main className="flex min-h-dvh items-center justify-center px-5 py-6">
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#12151E] p-5">

                <div className="text-center">
                    <div className="mb-2 text-5xl">🏆</div>

                    <h1 className="text-3xl font-black text-white">
                        Ready for Today's Challenge?
                    </h1>

                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                        Sign in for free to compete on the{" "}
                        <span className="font-semibold text-white">
                            Daily Leaderboard
                        </span>
                        , track your progress, and secure your username.
                    </p>
                </div>

                <div className="mt-6 space-y-2">

                    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                        <Trophy
                            className="shrink-0 text-[#39FF14]"
                            size={20}
                        />

                        <div>
                            <p className="font-semibold text-white">
                                Daily Leaderboards
                            </p>

                            <p className="text-xs text-zinc-400">
                                See how your timing compares to everyone else.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                        <BarChart3
                            className="shrink-0 text-[#39FF14]"
                            size={20}
                        />

                        <div>
                            <p className="font-semibold text-white">
                                Track Your Progress
                            </p>

                            <p className="text-xs text-zinc-400">
                                Watch your accuracy improve every day.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                        <User
                            className="shrink-0 text-[#39FF14]"
                            size={20}
                        />

                        <div>
                            <p className="font-semibold text-white">
                                Claim Your Username
                            </p>

                            <p className="text-xs text-zinc-400">
                                Build your profile from day one.
                            </p>
                        </div>
                    </div>

                </div>

                <button
                    onClick={signInWithGoogle}
                    className="mt-6 w-full rounded-2xl bg-[#39FF14] py-4 text-lg font-bold text-black transition hover:brightness-110 active:scale-[0.99]"
                >
                    Continue with Google
                </button>

                <p className="mt-3 text-center text-xs text-zinc-500">
                    Free forever • Takes about 10 seconds
                </p>

            </div>
        </main>
    );
}