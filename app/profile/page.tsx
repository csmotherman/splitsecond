import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    async function signOut() {
        "use server";

        const supabase = await createClient();

        await supabase.auth.signOut();

        redirect("/");
    }

    const displayName =
        user.user_metadata?.full_name ??
        user.user_metadata?.name ??
        "Player";

    const email = user.email;

    const avatarUrl =
        user.user_metadata?.avatar_url ??
        user.user_metadata?.picture ??
        null;

    const initials = displayName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    const [
        profileResult,
        gamesPlayedResult,
        bestErrorResult,
        avgErrorResult,
        perfectTimersResult,
        winsResult,
    ] = await Promise.all([
        supabase
            .from("profiles")
            .select("current_streak, longest_streak")
            .eq("id", user.id)
            .single(),

        supabase
            .from("daily_submissions")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.id),

        supabase
            .from("daily_submissions")
            .select("total_error")
            .eq("user_id", user.id)
            .order("total_error", { ascending: true })
            .limit(1)
            .maybeSingle(),

        supabase
            .from("daily_submissions")
            .select("total_error")
            .eq("user_id", user.id),

        supabase
            .from("attempts")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.id)
            .eq("perfect_timer", true),

        supabase
            .from("daily_submissions")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.id)
            .eq("daily_rank", 1),
    ]);

    const currentStreak =
        profileResult.data?.current_streak ?? 0;

    const longestStreak =
        profileResult.data?.longest_streak ?? 0;

    const gamesPlayed =
        gamesPlayedResult.count ?? 0;

    const perfectTimers =
        perfectTimersResult.count ?? 0;

    const wins =
        winsResult.count ?? 0;

    const bestError =
        bestErrorResult.data?.total_error ?? null;

    const avgError =
        avgErrorResult.data?.length
            ? (
                avgErrorResult.data.reduce(
                    (sum, row) => sum + Number(row.total_error),
                    0
                ) / avgErrorResult.data.length
            ).toFixed(3)
            : null;

    return (
        <div className="space-y-6">
            {/* Profile */}
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex flex-col items-center text-center">
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt={displayName}
                            className="h-24 w-24 rounded-full border border-white/10"
                        />
                    ) : (
                        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/5 text-3xl font-black text-[#39FF14]">
                            {initials}
                        </div>
                    )}

                    <h1 className="mt-4 text-2xl font-black">
                        {displayName}
                    </h1>

                    <p className="text-sm text-slate-400">
                        {email}
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
                    Statistics
                </h2>

                <div className="grid grid-cols-2 gap-3">
                    <StatCard
                        label="Games Played"
                        value={gamesPlayed}
                    />

                    <StatCard
                        label="Current Streak"
                        value={currentStreak}
                    />

                    <StatCard
                        label="Longest Streak"
                        value={longestStreak}
                    />

                    <StatCard
                        label="Perfect Timers"
                        value={perfectTimers}
                    />

                    <StatCard
                        label="Daily Wins"
                        value={wins}
                    />

                    <StatCard
                        label="Best Error"
                        value={
                            bestError !== null
                                ? Number(bestError).toFixed(3)
                                : "-"
                        }
                    />

                    <StatCard
                        label="Average Error"
                        value={avgError ?? "-"}
                    />
                </div>
            </section>

            {/* Sign Out */}
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <form action={signOut}>
                    <button
                        type="submit"
                        className="w-full rounded-2xl border border-red-500/20 bg-red-500/10 py-3 text-sm font-bold text-red-400 transition hover:bg-red-500/20"
                    >
                        Sign Out
                    </button>
                </form>
            </section>
        </div>
    );
}

function StatCard({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) {
    return (
        <div className="rounded-2xl border border-white/10 p-4">
            <div className="text-2xl font-black">
                {value}
            </div>

            <div className="text-xs text-slate-500">
                {label}
            </div>
        </div>
    );
}