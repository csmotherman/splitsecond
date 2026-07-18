import { supabase } from "@/lib/supabase/client";

export function subscribeToDuel(
    duelId: string,
    callback: (
        payload: any
    ) => void
) {
    const channel =
        supabase
            .channel(
                `duel:${duelId}`
            )
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema:
                        "public",
                    table:
                        "duels",
                    filter: `id=eq.${duelId}`,
                },
                callback
            )
            .subscribe();

    return channel;
}

export function subscribeToPlayers(
    duelId: string,
    callback: (
        payload: any
    ) => void
) {
    const channel =
        supabase
            .channel(
                `players:${duelId}`
            )
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema:
                        "public",
                    table:
                        "duel_players",
                    filter: `duel_id=eq.${duelId}`,
                },
                callback
            )
            .subscribe();

    return channel;
}

export function subscribeToRounds(
    duelId: string,
    callback: (
        payload: any
    ) => void
) {
    const channel =
        supabase
            .channel(
                `rounds:${duelId}`
            )
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema:
                        "public",
                    table:
                        "duel_rounds",
                    filter: `duel_id=eq.${duelId}`,
                },
                callback
            )
            .subscribe();

    return channel;
}

export function unsubscribe(
    channel: any
) {
    return supabase.removeChannel(
        channel
    );
}
