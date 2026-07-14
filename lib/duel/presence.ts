import { supabase } from "@/lib/supabase/client";

export function createPresenceChannel(
    duelId: string,
    userId: string
) {
    const channel =
        supabase.channel(
            `presence:${duelId}`,
            {
                config: {
                    presence: {
                        key: userId,
                    },
                },
            }
        );

    return channel;
}

export async function trackPresence(
    duelId: string,
    userId: string
) {
    const channel =
        createPresenceChannel(
            duelId,
            userId
        );

    await channel.subscribe(
        async status => {
            if (
                status ===
                "SUBSCRIBED"
            ) {
                await channel.track({
                    online: true,
                    joinedAt:
                        Date.now(),
                });
            }
        }
    );

    return channel;
}

export function getPresenceCount(
    channel: any
) {
    const state =
        channel.presenceState();

    return Object.keys(state)
        .length;
}