"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { supabase } from "@/lib/supabase/client";

import DuelLobby from "@/components/duel/DuelLobby";

type Duel = {
    id: string;
    status: string;
    match_type: string;
    match_code: string | null;
    current_round: number;
    winner_user_id: string | null;
};

export default function DuelPage() {
    const params = useParams();

    const duelId =
        params.duelId as string;

    const [duel, setDuel] =
        useState<Duel | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        async function loadDuel() {
            const { data, error } =
                await supabase
                    .from("duels")
                    .select("*")
                    .eq("id", duelId)
                    .single();

            if (error) {
                console.error(
                    "Failed to load duel:",
                    error
                );
                setLoading(false);
                return;
            }

            setDuel(data);
            setLoading(false);
        }

        loadDuel();

        const channel = supabase
            .channel(`duel:${duelId}`)
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "duels",
                    filter: `id=eq.${duelId}`,
                },
                payload => {
                    setDuel(
                        payload.new as Duel
                    );
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(
                channel
            );
        };
    }, [duelId]);

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-brand-bg text-white">
                Loading duel...
            </main>
        );
    }

    if (!duel) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-brand-bg text-white">
                Duel not found.
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-brand-bg p-4">
            <DuelLobby duel={duel} />
        </main>
    );
}