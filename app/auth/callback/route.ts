import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);

    const code =
        requestUrl.searchParams.get("code");

    const next =
        requestUrl.searchParams.get("next") ?? "/";

    if (!code) {
        return NextResponse.redirect(
            new URL(
                "/login?error=missing_code",
                requestUrl.origin
            )
        );
    }

    const supabase = await createClient();

    const { error } =
        await supabase.auth.exchangeCodeForSession(
            code
        );

    if (error) {
        console.error(
            "OAuth code exchange failed:",
            error
        );

        return NextResponse.redirect(
            new URL(
                "/login?error=oauth_exchange",
                requestUrl.origin
            )
        );
    }

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.redirect(
            new URL("/login", requestUrl.origin)
        );
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();

    if (!profile?.username) {
        return NextResponse.redirect(
            new URL(
                "/onboarding",
                requestUrl.origin
            )
        );
    }

    const safeNext =
        next.startsWith("/") &&
            !next.startsWith("//")
            ? next
            : "/";

    return NextResponse.redirect(
        new URL(
            safeNext,
            requestUrl.origin
        )
    );
}