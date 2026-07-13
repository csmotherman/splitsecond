"use client";

import GameContainer from "@/components/game/GameContainer";

export default function PracticePage() {
    const targets = Array.from(
        { length: 5 },
        () =>
            Number(
                (Math.random() * 9 + 1).toFixed(2)
            )
    );

    return (
        <GameContainer
            gameMode="practice"
            mode="normal"
            targets={targets}
        />
    );
}