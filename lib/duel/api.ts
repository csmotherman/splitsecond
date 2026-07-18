import { supabase } from "@/lib/supabase/client";

export async function createPrivateDuel() {
    const { data, error } =
        await supabase.rpc(
            "create_private_duel"
        );

    if (error) {
        throw error;
    }

    return data as string;
}

export async function joinPrivateDuel(
    matchCode: string
) {
    const { data, error } =
        await supabase.rpc(
            "join_private_duel",
            {
                p_match_code:
                    matchCode,
            }
        );

    if (error) {
        throw error;
    }

    return data as string;
}

export async function startDuel(
    duelId: string
) {
    const { error } =
        await supabase.rpc(
            "start_duel",
            {
                p_duel_id:
                    duelId,
            }
        );

    if (error) {
        throw error;
    }
}

export async function submitTime(
    roundId: string,
    elapsedMs: number
) {
    const { error } =
        await supabase.rpc(
            "submit_duel_time",
            {
                p_round_id:
                    roundId,
                p_elapsed_ms:
                    elapsedMs,
            }
        );

    if (error) {
        throw error;
    }
}

export async function advanceDuelRound(
    duelId: string
) {
    const { error } =
        await supabase.rpc(
            "advance_duel_round",
            {
                p_duel_id:
                    duelId,
            }
        );

    if (error) {
        throw error;
    }
}