import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function generateTargets(): number[] {
    return Array.from(
        { length: 5 },
        () => Number((Math.random() * 9 + 1).toFixed(2))
    );
}

async function run() {
    const now = new Date();

    const easternNow = new Date(
        now.toLocaleString("en-US", {
            timeZone: "America/New_York",
        })
    );

    // Create tomorrow's challenge
    easternNow.setDate(
        easternNow.getDate() + 1
    );

    const challengeDate =
        easternNow.toISOString().split("T")[0];

    console.log(
        `Checking challenge for ${challengeDate}`
    );

    const { data: existing, error: existingError } =
        await supabase
            .from("daily_challenges")
            .select("id")
            .eq("challenge_date", challengeDate)
            .maybeSingle();

    if (existingError) {
        throw existingError;
    }

    if (existing) {
        console.log(
            `Challenge already exists for ${challengeDate}`
        );
        return;
    }

    const { error } = await supabase
        .from("daily_challenges")
        .insert({
            challenge_date: challengeDate,
            mode: "normal",
            status: "scheduled",
            finalized: false,
            submission_count: 0,
            average_error: null,
            targets: generateTargets(),
        });

    if (error) {
        throw error;
    }

    console.log(
        `Created challenge for ${challengeDate}`
    );
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
