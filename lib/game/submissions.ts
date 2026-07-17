import { supabase } from "@/lib/supabase/client";

async function getCurrentUser() {
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) throw error;
    if (!user) throw new Error("User not authenticated");

    return user;
}

export async function getOrCreateSubmission(
    challengeId: string
) {
    const user = await getCurrentUser();

    const { data: existing, error: fetchError } = await supabase
        .from("daily_submissions")
        .select("*")
        .eq("user_id", user.id)
        .eq("challenge_id", challengeId)
        .maybeSingle();

    if (fetchError) throw fetchError;
    if (existing) return existing;

    const { data, error } = await supabase
        .from("daily_submissions")
        .insert({
            user_id: user.id,
            challenge_id: challengeId,
            total_error: 0,
            current_round: 1,
            completed: false,
        })
        .select()
        .single();

    if (error) throw error;

    return data;
}

export async function getSubmission(
    challengeId: string
) {
    const user = await getCurrentUser();

    const { data, error } = await supabase
        .from("daily_submissions")
        .select("*")
        .eq("user_id", user.id)
        .eq("challenge_id", challengeId)
        .maybeSingle();

    if (error) throw error;

    return data;
}

export async function saveRoundResult(
    submissionId: string,
    round: number,
    actual: number,
    errorValue: number
) {
    const updateData: Record<string, unknown> = {
        [`round_${round}_actual`]: actual,
        [`round_${round}_error`]: errorValue,
        current_round: round + 1,
    };

    const { error } = await supabase
        .from("daily_submissions")
        .update(updateData)
        .eq("id", submissionId);

    if (error) throw error;
}

export async function getSubmissionStats(
    challengeId: string,
    totalError: number
) {
    const { count: betterToday, error: dailyRankError } =
        await supabase
            .from("daily_submissions")
            .select("id", {
                count: "exact",
                head: true,
            })
            .eq("challenge_id", challengeId)
            .eq("completed", true)
            .lt("total_error", totalError);

    if (dailyRankError) throw dailyRankError;

    const { count: betterAllTime, error: allTimeRankError } =
        await supabase
            .from("daily_submissions")
            .select("id", {
                count: "exact",
                head: true,
            })
            .eq("completed", true)
            .lt("total_error", totalError);

    if (allTimeRankError) throw allTimeRankError;

    const { count: totalRuns, error: totalRunsError } =
        await supabase
            .from("daily_submissions")
            .select("id", {
                count: "exact",
                head: true,
            })
            .eq("completed", true);

    if (totalRunsError) throw totalRunsError;

    const { count: worseRuns, error: percentileError } =
        await supabase
            .from("daily_submissions")
            .select("id", {
                count: "exact",
                head: true,
            })
            .eq("completed", true)
            .gt("total_error", totalError);

    if (percentileError) throw percentileError;

    const completedRunCount = totalRuns ?? 0;

    return {
        dailyRank: (betterToday ?? 0) + 1,
        allTimeRank: (betterAllTime ?? 0) + 1,
        totalRuns: completedRunCount,
        percentile:
            completedRunCount > 0
                ? ((worseRuns ?? 0) / completedRunCount) * 100
                : 0,
    };
}

export async function completeSubmission(
    submissionId: string,
    totalError: number,
    perfectTimers: number = 0,
    completedSeconds?: number
) {
    const updateData: Record<string, unknown> = {
        total_error: totalError,
        perfect_timers: perfectTimers,
        completed: true,
        submitted_at: new Date().toISOString(),
        current_round: 6,
    };

    if (completedSeconds !== undefined) {
        updateData.completed_seconds = completedSeconds;
    }

    const { data: submission, error: updateError } =
        await supabase
            .from("daily_submissions")
            .update(updateData)
            .eq("id", submissionId)
            .select("challenge_id, total_error")
            .single();

    if (updateError) throw updateError;

    return getSubmissionStats(
        submission.challenge_id,
        Number(submission.total_error)
    );
}

export async function isChallengeCompleted(
    challengeId: string
) {
    const user = await getCurrentUser();

    const { data, error } = await supabase
        .from("daily_submissions")
        .select("completed,total_error")
        .eq("user_id", user.id)
        .eq("challenge_id", challengeId)
        .maybeSingle();

    if (error) throw error;

    return data;
}
