import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
        "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY GitHub Actions secret."
    );
}

const supabase = createClient(
    supabaseUrl,
    serviceRoleKey
);

const challengeMode = "normal";

function generateTargets(): number[] {
    return Array.from(
        { length: 5 },
        () => Number((Math.random() * 9 + 1).toFixed(2))
    );
}

function getTomorrowInEastern(): string {
    const easternDateParts = new Intl.DateTimeFormat(
        "en-US",
        {
            timeZone: "America/New_York",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }
    ).formatToParts(new Date());

    const year = Number(
        easternDateParts.find(
            (part) => part.type === "year"
        )?.value
    );
    const month = Number(
        easternDateParts.find(
            (part) => part.type === "month"
        )?.value
    );
    const day = Number(
        easternDateParts.find(
            (part) => part.type === "day"
        )?.value
    );

    if (!year || !month || !day) {
        throw new Error(
            "Unable to determine the current Eastern date."
        );
    }

    const tomorrow = new Date(
        Date.UTC(year, month - 1, day + 1)
    );

    return tomorrow.toISOString().slice(0, 10);
}

async function run() {
    const challengeDate = getTomorrowInEastern();

    console.log(
        `Checking ${challengeMode} challenge for ${challengeDate}`
    );

    const { data: existing, error: existingError } =
        await supabase
            .from("daily_challenges")
            .select("id")
            .eq("challenge_date", challengeDate)
            .eq("mode", challengeMode)
            .maybeSingle();

    if (existingError) {
        throw existingError;
    }

    if (existing) {
        console.log(
            `${challengeMode} challenge already exists for ${challengeDate}`
        );
        return;
    }

    const { error } = await supabase
        .from("daily_challenges")
        .insert({
            challenge_date: challengeDate,
            mode: challengeMode,
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
        `Created ${challengeMode} challenge for ${challengeDate}`
    );
}

run().catch((error: unknown) => {
    console.error("Daily challenge creation failed:", error);
    process.exit(1);
});
