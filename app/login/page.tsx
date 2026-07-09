"use client";

import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
    async function signInWithGoogle() {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    }

    return (
        <main>
            <h1>SplitSecond</h1>

            <button onClick={signInWithGoogle}>
                Sign in with Google
            </button>
        </main>
    );
}