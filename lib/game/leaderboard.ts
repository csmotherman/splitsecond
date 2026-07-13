import { supabase } from "@/lib/supabase/client";

export type LeaderboardEntry = {
    rank: number;
    username: string;
    totalError: number;
};

export async function getDailyLeaderboard(): Promise<
    LeaderboardEntry[]
> {
    const {
        data: challenge,
        error: challengeError,
    } = await supabase
        .from("daily_challenges")
        .select("id, challenge_date")
        .eq("status", "active")
        .eq("mode", "normal")
        .order("challenge_date", {
            ascending: false,
        })
        .limit(1)
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
        data?.map((row: any, index: number) => ({
            rank: index + 1,
            username:
                row.profiles?.username ??
                "Anonymous",
            totalError: Number(
                row.total_error
            ),
        })) ?? []
    );
}