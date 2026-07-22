"use client";

import { Trophy, Calendar, BarChart3, User } from "lucide-react";
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
        <main className="flex min-h-[100dvh] items-center justify-center px-5 py-8">
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#12151E] p-6">

                <div className="text-center">
                    <div className="mb-3 text-5xl">🏆</div>

                    <h1 className="text-3xl font-black text-white">
                        Join SplitSecond
                    </h1>

                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                        Create your free account to compete in the
                        <span className="font-semibold text-white">
                            {" "}Daily Challenge
                        </span>
                        , climb the leaderboard, and track how your timing improves.
                    </p>
                </div>

                <div className="mt-8 space-y-3">

                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <Trophy className="text-[#39FF14]" size={22} />
                        <div>
                            <p className="font-semibold text-white">
                                Daily Leaderboards
                            </p>
                            <p className="text-sm text-zinc-400">
                                See how your timing stacks up against everyone else.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <Calendar className="text-[#39FF14]" size={22} />
                        <div>
                            <p className="font-semibold text-white">
                                Save Every Challenge
                            </p>
                            <p className="text-sm text-zinc-400">
                                Build your history one day at a time.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <BarChart3 className="text-[#39FF14]" size={22} />
                        <div>
                            <p className="font-semibold text-white">
                                Track Your Progress
                            </p>
                            <p className="text-sm text-zinc-400">
                                Watch your accuracy improve over time.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <User className="text-[#39FF14]" size={22} />
                        <div>
                            <p className="font-semibold text-white">
                                Reserve Your Username
                            </p>
                            <p className="text-sm text-zinc-400">
                                Make your mark before the community grows.
                            </p>
                        </div>
                    </div>

                </div>

                <div className="mt-8 rounded-2xl border border-[#39FF14]/25 bg-[#39FF14]/10 p-4">
                    <p className="text-center text-sm text-zinc-300">
                        🚀 More features are on the way, including streaks,
                        achievements, player stats, seasonal rankings, and new
                        game modes.
                    </p>
                </div>

                <button
                    onClick={signInWithGoogle}
                    className="mt-8 w-full rounded-2xl bg-[#39FF14] py-4 text-lg font-bold text-black transition hover:brightness-110"
                >
                    Continue with Google
                </button>

                <p className="mt-4 text-center text-xs text-zinc-500">
                    Free forever • Takes about 10 seconds
                </p>
            </div>
        </main>
    );
}