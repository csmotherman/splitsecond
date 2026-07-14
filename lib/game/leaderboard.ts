import { supabase } from "@/lib/supabase/client";

export type LeaderboardEntry = {
    rank: number;
    username: string;
    totalError: number;
};

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
            "Unable to determine Eastern date."
        );
    }

    return `${year}-${month}-${day}`;
}

export async function getDailyLeaderboard(): Promise<
    LeaderboardEntry[]
> {
    const todayEastern = getEasternDate();

    const {
        data: challenge,
        error: challengeError,
    } = await supabase
        .from("daily_challenges")
        .select("id, challenge_date")
        .eq("challenge_date", todayEastern)
        .eq("mode", "normal")
        .maybeSingle();

    if (challengeError || !challenge) {
        console.error(
            "Challenge lookup failed:",
            challengeError
        );

        return [];
    }

    const { data, error } = await supabase
        .from("daily_submissions")
        .select(`
            total_error,
            profiles (
                username
            )
        `)
        .eq("challenge_id", challenge.id)
        .eq("completed", true)
        .order("total_error", {
            ascending: true,
        });

    if (error) {
        console.error(
            "Leaderboard query failed:",
            error
        );

        return [];
    }

    return (
        data?.map(
            (
                row: any,
                index: number
            ) => ({
                rank: index + 1,
                username:
                    row.profiles?.username ??
                    "Anonymous",
                totalError: Number(
                    row.total_error
                ),
            })
        ) ?? []
    );
}