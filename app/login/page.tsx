"use client";

import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
    async function signInWithGoogle() {
        const redirectTo =
            `${window.location.origin}/auth/callback`;

        alert(redirectTo);

        const result =
            await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo,
                },
            });

        console.log("OAUTH RESULT:");
        console.log(result);
    }

    return (
        <main className="flex min-h-[70vh] items-center justify-center px-6">
            <div className="w-full max-w-sm">
                <h1 className="mb-8 text-center text-5xl font-black text-white">
                    SPLIT
                    <span className="text-[#39FF14]">
                        SECOND
                    </span>
                </h1>

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
                    "
                >
                    Continue with Google
                </button>
            </div>
        </main>
    );
}