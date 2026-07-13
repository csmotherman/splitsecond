"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function OnboardingPage() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        try {
            setError("");
            setLoading(true);

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                router.push("/login");
                return;
            }

            const cleaned = username.trim();

            if (cleaned.length < 3) {
                setError(
                    "Username must be at least 3 characters."
                );
                return;
            }

            const { error } = await supabase
                .from("profiles")
                .update({
                    username: cleaned,
                })
                .eq("id", user.id);

            if (error) {
                if (
                    error.message
                        .toLowerCase()
                        .includes("duplicate")
                ) {
                    setError(
                        "Username already taken."
                    );
                    return;
                }

                throw error;
            }

            router.push("/");
        } catch (err) {
            console.error(err);

            setError(
                "Unable to save username."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="mx-auto max-w-md">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <h1 className="font-college text-4xl text-white">
                    Choose Username
                </h1>

                <p className="mt-2 text-sm text-slate-400">
                    This name will appear on
                    leaderboards and your profile.
                </p>

                <input
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                    maxLength={20}
                    placeholder="TimeLord"
                    className="
                        mt-6
                        w-full
                        rounded-2xl
                        border
                        border-white/10
                        bg-black/20
                        px-4
                        py-4
                        text-white
                        outline-none
                    "
                />

                {error && (
                    <p className="mt-3 text-sm text-red-400">
                        {error}
                    </p>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="
                        mt-6
                        w-full
                        rounded-2xl
                        bg-[#39FF14]
                        py-4
                        font-bold
                        text-black
                    "
                >
                    {loading
                        ? "Saving..."
                        : "Continue"}
                </button>
            </div>
        </main>
    );
}