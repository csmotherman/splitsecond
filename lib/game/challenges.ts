import { supabase } from "@/lib/supabase/client";

export async function getTodaysChallenge(
    mode: "normal" | "extreme"
) {
    const { data: allRows, error: allError } =
        await supabase
            .from("daily_challenges")
            .select("*");

    console.log("ALL ROWS =", allRows);
    console.log("ALL ERROR =", allError);

    const { data, error } = await supabase
        .from("daily_challenges")
        .select("*")
        .eq("mode", mode)
        .order("challenge_date", {
            ascending: false,
        })
        .limit(1)
        .maybeSingle();

    console.log("QUERY DATA =", data);
    console.log("QUERY ERROR =", error);

    if (error) {
        throw error;
    }

    return data;
}