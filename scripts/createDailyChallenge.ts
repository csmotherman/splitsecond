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

function getEasternDate(): string {
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/New_York",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date());
}

async function run() {
    // Create today's challenge based on Eastern Time
    const challengeDate = getEasternDate();

    console.log(
        `Checking normal challenge for ${challengeDate}`
    );

    const {
        data: existing,
        error: existingError,
    } = await supabase
        .from("daily_challenges")
        .select("id")
        .eq("challenge_date", challengeDate)
        .eq("mode", "normal")
        .maybeSingle();

    if (existingError) {
        throw existingError;
    }

    if (existing) {
        console.log(
            `Normal challenge already exists for ${challengeDate}`
        );
        return;
    }

    const { error } = await supabase
        .from("daily_challenges")
        .insert({
            challenge_date: challengeDate,
            mode: "normal",
            status: "active",
            finalized: false,
            submission_count: 0,
            average_error: null,
            targets: generateTargets(),
        });

    if (error) {
        throw error;
    }

    console.log(
        `Created normal challenge for ${challengeDate}`
    );
}

run().catch((err) => {
    console.error(
        "Daily challenge creation failed:",
        err
    );

    process.exit(1);
});