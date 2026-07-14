"use client";

type DuelLobbyProps = {
    duel: {
        id: string;
        status: string;
        match_code: string | null;
        current_round: number;
    };
};

export default function DuelLobby({
    duel,
}: DuelLobbyProps) {
    return (
        <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-brand-card p-6 text-white">
            <h1 className="mb-4 text-3xl font-black">
                Duel Lobby
            </h1>

            <div className="space-y-2">
                <p>
                    <strong>Code:</strong>{" "}
                    {duel.match_code ??
                        "N/A"}
                </p>

                <p>
                    <strong>Status:</strong>{" "}
                    {duel.status}
                </p>

                <p>
                    <strong>Round:</strong>{" "}
                    {duel.current_round}
                </p>
            </div>
        </div>
    );
}