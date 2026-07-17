import { supabase } from "@/lib/supabase/client";

async function getCurrentUser() {
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) {
        throw error;
    }

    if (!user) {
        throw new Error("User not authenticated");
    }

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

    if (fetchError) {
        throw fetchError;
    }

    if (existing) {
        return existing;
    }

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

    if (error) {
        throw error;
    }

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

    if (error) {
        throw error;
    }

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

    if (error) {
        throw error;
    }
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
            .select("id, challenge_id, total_error")
            .single();

    if (updateError) {
        throw updateError;
    }

    const { count: betterToday } =
        await supabase
            .from("daily_submissions")
            .select("*", {
                count: "exact",
                head: true,
            })
            .eq(
                "challenge_id",
                submission.challenge_id
            )
            .eq("completed", true)
            .lt(
                "total_error",
                submission.total_error
            );

    const dailyRank =
        (betterToday ?? 0) + 1;

    const { count: totalRuns } =
        await supabase
            .from("daily_submissions")
            .select("*", {
                count: "exact",
                head: true,
            })
            .eq("completed", true);

    const { count: worseRuns } =
        await supabase
            .from("daily_submissions")
            .select("*", {
                count: "exact",
                head: true,
            })
            .eq("completed", true)
            .gt(
                "total_error",
                submission.total_error
            );

    const percentile =
        totalRuns && totalRuns > 0
            ? (
                  ((worseRuns ?? 0) /
                      totalRuns) *
                  100
              )
            : 0;

    return {
        dailyRank,
        percentile,
    };
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

    if (error) {
        throw error;
    }

    return data;
}
export async function getSubmissionStats(
    challengeId: string,
    totalError: number
) {
    console.log("getSubmissionStats input", {
        challengeId,
        totalError,
    });
    const { count: betterToday, error: rankError } =
        await supabase
            .from("daily_submissions")
            .select("*", {
                count: "exact",
                head: true,
            })
            .eq("challenge_id", challengeId)
            .eq("completed", true)
            .lt("total_error", totalError);

    if (rankError) {
        throw rankError;
    }

    const dailyRank =
        (betterToday ?? 0) + 1;

    const { count: totalRuns, error: totalErrorQuery } =
        await supabase
            .from("daily_submissions")
            .select("*", {
                count: "exact",
                head: true,
            })
            .eq("completed", true);

    if (totalErrorQuery) {
        throw totalErrorQuery;
    }

    const { count: worseRuns, error: percentileError } =
        await supabase
            .from("daily_submissions")
            .select("*", {
                count: "exact",
                head: true,
            })
            .eq("completed", true)
            .gt("total_error", totalError);

    if (percentileError) {
        throw percentileError;
    }

    const percentile =
        totalRuns && totalRuns > 0
            ? ((worseRuns ?? 0) /
                  totalRuns) *
              100
            : 0;
    console.log("getSubmissionStats output", {
        dailyRank,
        percentile,
    });
    return {
        dailyRank,
        percentile,
    };
}