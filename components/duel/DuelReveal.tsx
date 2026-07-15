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
            1000
        );

        const t2 = setTimeout(
            () => setShowOpponent(true),
            2000
        );

        const t3 = setTimeout(
            () => setShowResult(true),
            4000
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
                Math.random() * 0.25
            );
        }, 60);

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
        <div className="flex h-screen flex-col items-center justify-center px-6 text-center text-white">
            {/* ROUND */}

            <div className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40">
                Round {roundNumber}
            </div>

            {/* TARGET */}

            <div className="mt-8">
                <div className="text-xs font-black uppercase tracking-[0.35em] text-white/40">
                    Target
                </div>

                <div className="mt-2 font-mono text-7xl font-black text-neon-lime">
                    {(
                        targetMs / 1000
                    ).toFixed(2)}
                </div>
            </div>

            {/* YOU */}

            <div className="mt-10 h-28">
                {showYou && (
                    <>
                        <div className="text-xs font-black uppercase tracking-[0.35em] text-white/40">
                            Your Error
                        </div>

                        <div className="mt-2 text-7xl font-black text-neon-lime">
                            {(
                                yourError /
                                1000
                            ).toFixed(2)}
                        </div>
                    </>
                )}
            </div>

            {/* VS */}

            <div className="text-white/20">
                VS
            </div>

            {/* OPPONENT */}

            <div className="mt-4 h-28">
                {showOpponent && (
                    <>
                        <div className="text-xs font-black uppercase tracking-[0.35em] text-white/40">
                            Opponent Error
                        </div>

                        <div className="mt-2 font-black text-7xl">
                            {spinningValue.toFixed(
                                2
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* RESULT */}

            <div className="mt-8 h-24">
                {showResult && (
                    <>
                        <div
                            className={`text-6xl font-black ${tie
                                    ? "text-yellow-400"
                                    : youWon
                                        ? "text-neon-lime"
                                        : "text-red-400"
                                }`}
                        >
                            {tie
                                ? "DRAW"
                                : youWon
                                    ? "VICTORY"
                                    : "DEFEAT"}
                        </div>

                        <div className="mt-2 text-3xl font-black">
                            {yourWins}
                            <span className="mx-2 text-white/30">
                                -
                            </span>
                            {opponentWins}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}