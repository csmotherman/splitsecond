import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function run() {
    const easternNow = new Date(
        new Date().toLocaleString(
            "en-US",
            {
                timeZone:
                    "America/New_York",
            }
        )
    );

    easternNow.setDate(
        easternNow.getDate() - 1
    );

    const challengeDate =
        easternNow
            .toISOString()
            .split("T")[0];

    console.log(
        `Finalizing challenge ${challengeDate}`
    );

    const {
        data: challenge,
        error: challengeError,
    } = await supabase
        .from("daily_challenges")
        .select("*")
        .eq(
            "challenge_date",
            challengeDate
        )
        .eq("mode", "normal")
        .maybeSingle();

    if (challengeError) {
        throw challengeError;
    }

    if (!challenge) {
        throw new Error(
            `No challenge found for ${challengeDate}`
        );
    }

    const {
        data: submissions,
        error: submissionsError,
    } = await supabase
        .from("daily_submissions")
        .select(`
            id,
            user_id,
            total_error,
            profiles (
                username
            )
        `)
        .eq(
            "challenge_id",
            challenge.id
        )
        .eq("completed", true)
        .order("total_error", {
            ascending: true,
        });

    if (submissionsError) {
        throw submissionsError;
    }

    if (
        !submissions ||
        submissions.length === 0
    ) {
        console.log(
            "No completed submissions."
        );

        await supabase
            .from("daily_challenges")
            .update({
                status: "complete",
            })
            .eq(
                "id",
                challenge.id
            );

        return;
    }

    for (
        let i = 0;
        i < submissions.length;
        i++
    ) {
        const submission =
            submissions[i];

        const rank = i + 1;

        const { error } =
            await supabase
                .from(
                    "daily_submissions"
                )
                .update({
                    daily_rank: rank,
                })
                .eq(
                    "id",
                    submission.id
                );

        if (error) {
            throw error;
        }
    }

    await supabase
        .from("daily_challenges")
        .update({
            status: "complete",
        })
        .eq(
            "id",
            challenge.id
        );

    console.log("");
    console.log(
        "🏆 SPLITSECOND RESULTS"
    );
    console.log(
        `Date: ${challengeDate}`
    );
    console.log("");

    const winner =
        submissions[0];

    console.log(
        `🥇 Winner: ${
            winner.profiles?.[0]
                ?.username ??
            "Anonymous"
        }`
    );

    console.log(
        `Error: ${winner.total_error}s`
    );

    console.log("");
    console.log("Top 10");

    submissions
        .slice(0, 10)
        .forEach(
            (
                submission: any,
                index
            ) => {
                console.log(
                    `${
                        index + 1
                    }. ${
                        submission
                            .profiles?.[0]
                            ?.username ??
                        "Anonymous"
                    } - ${
                        submission.total_error
                    }s`
                );
            }
        );

    console.log("");
    console.log(
        `Players: ${submissions.length}`
    );
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});