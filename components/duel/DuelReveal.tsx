"use client";

import { useEffect, useState } from "react";

type Props = {
    roundNumber: number;

    targetMs: number;

    yourTime: number;
    opponentTime: number;

    yourWins: number;
    opponentWins: number;
};

export default function DuelReveal({
    roundNumber,
    targetMs,
    yourTime,
    opponentTime,
    yourWins,
    opponentWins,
}: Props) {
    const yourError = Math.abs(
        targetMs - yourTime
    );

    const opponentError = Math.abs(
        targetMs - opponentTime
    );

    const tie =
        yourError === opponentError;

    const youWon =
        yourError < opponentError;

    const [showYou, setShowYou] =
        useState(false);

    const [
        showOpponent,
        setShowOpponent,
    ] = useState(false);

    const [
        showResult,
        setShowResult,
    ] = useState(false);

    const [
        spinningValue,
        setSpinningValue,
    ] = useState(0);

    useEffect(() => {
        const t1 = setTimeout(
            () => setShowYou(true),
            800
        );

        const t2 = setTimeout(
            () => setShowOpponent(true),
            1800
        );

        const t3 = setTimeout(
            () => setShowResult(true),
            3600
        );

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, []);

    useEffect(() => {
        if (!showOpponent) return;

        const interval = setInterval(() => {
            setSpinningValue(
                Math.random() * 10
            );
        }, 50);

        const stop = setTimeout(() => {
            clearInterval(interval);

            setSpinningValue(
                opponentError / 1000
            );
        }, 1500);

        return () => {
            clearInterval(interval);
            clearTimeout(stop);
        };
    }, [
        showOpponent,
        opponentError,
    ]);

    return (
        <div className="flex h-full flex-col items-center px-5 pt-6 text-center text-white">
            {/* ROUND */}

            <div className="text-[10px] font-black uppercase tracking-[0.45em] text-white/35">
                Round {roundNumber} of 5
            </div>

            {/* TARGET */}

            <div className="mt-8">
                <div className="text-[11px] font-black uppercase tracking-[0.35em] text-white/40">
                    Target
                </div>

                <div className="mt-2 font-mono text-7xl font-black leading-none text-neon-lime">
                    {(
                        targetMs / 1000
                    ).toFixed(2)}
                </div>
            </div>

            {/* YOUR ERROR */}

            <div
                className={`mt-8 transition-all duration-500 ${showYou
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                    }`}
            >
                <div className="text-[11px] font-black uppercase tracking-[0.35em] text-white/40">
                    Your Error
                </div>

                <div className="mt-1 text-7xl font-black leading-none text-neon-lime">
                    {showYou
                        ? (
                            yourError /
                            1000
                        ).toFixed(2)
                        : "--"}
                </div>
            </div>

            {/* VS */}

            <div className="mt-4 text-sm font-black tracking-[0.4em] text-white/20">
                VS
            </div>

            {/* OPPONENT */}

            <div
                className={`mt-4 transition-all duration-500 ${showOpponent
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                    }`}
            >
                <div className="text-[11px] font-black uppercase tracking-[0.35em] text-white/40">
                    Opponent Error
                </div>

                <div className="mt-1 text-7xl font-black leading-none">
                    {showOpponent
                        ? spinningValue.toFixed(
                            2
                        )
                        : "--"}
                </div>
            </div>

            {/* RESULT */}

            <div
                className={`mt-10 transition-all duration-500 ${showResult
                    ? "scale-100 opacity-100"
                    : "scale-75 opacity-0"
                    }`}
            >
                <div
                    className={`text-6xl font-black leading-none ${tie
                        ? "text-yellow-400"
                        : youWon
                            ? "text-neon-lime"
                            : "text-red-500"
                        }`}
                >
                    {tie
                        ? "DRAW"
                        : youWon
                            ? "VICTORY"
                            : "DEFEAT"}
                </div>

                <div className="mt-4 text-[10px] font-black uppercase tracking-[0.35em] text-white/40">
                    Match Score
                </div>

                <div className="mt-1 text-4xl font-black">
                    {yourWins}
                    <span className="mx-3 text-white/25">
                        -
                    </span>
                    {opponentWins}
                </div>
            </div>
        </div>
    );
}