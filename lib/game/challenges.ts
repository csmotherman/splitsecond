import { supabase } from "@/lib/supabase/client";

type ChallengeMode = "normal" | "extreme";

function getEasternDate(): string {
    const parts = new Intl.DateTimeFormat(
        "en-US",
        {
            timeZone: "America/New_York",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }
    ).formatToParts(new Date());

    const year = parts.find(
        (part) => part.type === "year"
    )?.value;

    const month = parts.find(
        (part) => part.type === "month"
    )?.value;

    const day = parts.find(
        (part) => part.type === "day"
    )?.value;

    if (!year || !month || !day) {
        throw new Error(
            "Unable to determine the current Eastern date."
        );
    }

    return `${year}-${month}-${day}`;
}

export async function getTodaysChallenge(
    mode: ChallengeMode = "normal"
) {
    const todayEastern = getEasternDate();

    const { data, error } = await supabase
        .from("daily_challenges")
        .select("*")
        .eq("challenge_date", todayEastern)
        .eq("mode", mode)
        .maybeSingle();

    if (error) {
        console.error(
            "Today's challenge query failed:",
            error
        );

        throw error;
    }

    if (!data) {
        console.error(
            `No ${mode} challenge exists for ${todayEastern}.`
        );

        return null;
    }

    return data;
}