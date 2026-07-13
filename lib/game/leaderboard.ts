import { supabase } from "@/lib/supabase/client";

export type LeaderboardEntry = {
    rank: number;
    username: string;
    totalError: number;
};

export async function getDailyLeaderboard() {
    const { data: challenge } = await supabase
        .from("daily_challenges")
        .select("id")
        .eq("status", "active")
        .eq("mode", "normal")
        .single();

    if (!challenge) {
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
        console.error(error);
        return [];
    }

    return (
        data?.map((row: any, index: number) => ({
            rank: index + 1,
            username:
                row.profiles?.username ??
                "Anonymous",
            totalError:
                Number(row.total_error),
        })) ?? []
    );
}