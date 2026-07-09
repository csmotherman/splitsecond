import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
    console.log("========================================");
    console.log("AUTH CALLBACK START");
    console.log("========================================");

    const requestUrl = new URL(request.url);

    console.log("FULL URL:");
    console.log(request.url);

    console.log("ORIGIN:");
    console.log(requestUrl.origin);

    console.log("PATHNAME:");
    console.log(requestUrl.pathname);

    console.log("SEARCH:");
    console.log(requestUrl.search);

    const code = requestUrl.searchParams.get("code");
    const error = requestUrl.searchParams.get("error");
    const errorCode = requestUrl.searchParams.get("error_code");
    const errorDescription =
        requestUrl.searchParams.get("error_description");

    console.log("----------------------------------------");
    console.log("QUERY PARAMS");
    console.log("----------------------------------------");

    console.log("CODE:", code);
    console.log("ERROR:", error);
    console.log("ERROR CODE:", errorCode);
    console.log("ERROR DESCRIPTION:", errorDescription);

    try {
        const supabase = await createClient();

        console.log("----------------------------------------");
        console.log("SUPABASE CLIENT CREATED");
        console.log("----------------------------------------");

        if (code) {
            console.log("Attempting code exchange...");

            const result =
                await supabase.auth.exchangeCodeForSession(code);

            console.log("----------------------------------------");
            console.log("EXCHANGE RESULT");
            console.log("----------------------------------------");

            console.log("ERROR:", result.error);

            console.log(
                "USER:",
                result.data?.user?.email ?? null
            );

            console.log(
                "SESSION EXISTS:",
                !!result.data?.session
            );

            console.log(
                "ACCESS TOKEN EXISTS:",
                !!result.data?.session?.access_token
            );

            console.log(
                "REFRESH TOKEN EXISTS:",
                !!result.data?.session?.refresh_token
            );
        } else {
            console.log("----------------------------------------");
            console.log("NO CODE PRESENT");
            console.log("----------------------------------------");
        }

        const userResult = await supabase.auth.getUser();

        console.log("----------------------------------------");
        console.log("GET USER AFTER EXCHANGE");
        console.log("----------------------------------------");

        console.log(
            "USER:",
            userResult.data.user?.email ?? null
        );

        console.log(
            "ERROR:",
            userResult.error
        );
    } catch (err) {
        console.log("----------------------------------------");
        console.log("EXCEPTION");
        console.log("----------------------------------------");

        console.error(err);
    }

    console.log("========================================");
    console.log("REDIRECTING HOME");
    console.log("========================================");

    return NextResponse.redirect(
        new URL("/", requestUrl.origin)
    );
}