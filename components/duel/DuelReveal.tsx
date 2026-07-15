"use client";

import { useEffect, useState } from "react";

type Props = {
    roundNumber: number;

    targetMs: number;

    yourTime: number;
    opponentTime: number;

    yourWins: number;
    opponentWins: number;

    onReadyUp?: () => void;

    isReady?: boolean;
    readyDisabled?: boolean;
}

export default function DuelReveal({
    roundNumber,
    targetMs,
    yourTime,
    opponentTime,
    yourWins,
    opponentWins,
    onReadyUp,
    isReady = false,
    readyDisabled = false,
}: Props): import("react").JSX.Element {
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

    const difference = Math.abs(
        yourError - opponentError
    );

    const [showYou, setShowYou] =
        useState(false);

    const [
        showOpponent,
        setShowOpponent,
    ] = useState(false);

    const [
        opponentLocked,
        setOpponentLocked,
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
        setShowYou(false);
        setShowOpponent(false);
        setOpponentLocked(false);
        setShowResult(false);
        setSpinningValue(0);

        const showYouTimer =
            window.setTimeout(() => {
                setShowYou(true);
            }, 500);

        const showOpponentTimer =
            window.setTimeout(() => {
                setShowOpponent(true);
            }, 1250);

        const showResultTimer =
            window.setTimeout(() => {
                setShowResult(true);
            }, 3050);

        return () => {
            window.clearTimeout(
                showYouTimer
            );

            window.clearTimeout(
                showOpponentTimer
            );

            window.clearTimeout(
                showResultTimer
            );
        };
    }, [
        roundNumber,
        targetMs,
        yourTime,
        opponentTime,
    ]);

    useEffect(() => {
        if (!showOpponent) {
            return;
        }

        setOpponentLocked(false);

        const opponentSeconds =
            opponentError / 1000;

        const maximumSpinValue =
            Math.max(
                yourError / 1000,
                opponentSeconds,
                0.25
            ) + 0.75;

        const interval =
            window.setInterval(() => {
                setSpinningValue(
                    Math.random() *
                    maximumSpinValue
                );
            }, 55);

        const stopTimer =
            window.setTimeout(() => {
                window.clearInterval(
                    interval
                );

                setSpinningValue(
                    opponentSeconds
                );

                setOpponentLocked(true);
            }, 1450);

        return () => {
            window.clearInterval(
                interval
            );

            window.clearTimeout(
                stopTimer
            );
        };
    }, [
        showOpponent,
        opponentError,
        yourError,
    ]);

    const resultLabel = tie
        ? "DRAW"
        : youWon
            ? "VICTORY"
            : "DEFEAT";

    const marginLabel = tie
        ? "Exact tie"
        : youWon
            ? `Won by ${(
                difference / 1000
            ).toFixed(2)}s`
            : `Lost by ${(
                difference / 1000
            ).toFixed(2)}s`;

    return (
        <section className="flex h-full min-h-0 w-full flex-col overflow-hidden px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-2 text-center text-white">
            {/* REVEAL CONTENT */}

            <div className="mx-auto flex min-h-0 w-full max-w-md flex-1 flex-col items-center justify-start">
                {/* ROUND */}

                <div className="text-[9px] font-black uppercase tracking-[0.42em] text-white/35">
                    Round {roundNumber} of 3
                </div>

                {/* TARGET */}

                <div className="mt-3">
                    <div className="text-[10px] font-black uppercase tracking-[0.34em] text-white/40">
                        Target
                    </div>

                    <div className="mt-1 font-mono text-5xl font-black leading-none text-neon-lime sm:text-6xl">
                        {(
                            targetMs / 1000
                        ).toFixed(2)}
                    </div>
                </div>

                {/* YOUR ERROR */}

                <div
                    className={`mt-4 transition-all duration-500 ${showYou
                        ? "translate-y-0 scale-100 opacity-100"
                        : "translate-y-2 scale-95 opacity-0"
                        }`}
                >
                    <div className="text-[10px] font-black uppercase tracking-[0.34em] text-white/40">
                        Your Error
                    </div>

                    <div className="mt-1 font-mono text-5xl font-black leading-none text-neon-lime sm:text-6xl">
                        {(
                            yourError / 1000
                        ).toFixed(2)}
                    </div>
                </div>

                {/* VS */}

                <div className="mt-2 text-xs font-black uppercase tracking-[0.4em] text-white/20">
                    VS
                </div>

                {/* OPPONENT ERROR */}

                <div
                    className={`mt-2 transition-all duration-500 ${showOpponent
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-0"
                        }`}
                >
                    <div className="text-[10px] font-black uppercase tracking-[0.34em] text-white/40">
                        Opponent Error
                    </div>

                    <div
                        className={`mt-1 font-mono text-5xl font-black leading-none transition-all duration-300 sm:text-6xl ${opponentLocked
                            ? "scale-100 text-white"
                            : "scale-[1.03] text-white/70 blur-[0.4px]"
                            }`}
                    >
                        {spinningValue.toFixed(
                            2
                        )}
                    </div>
                </div>

                {/* RESULT */}

                <div
                    className={`mt-4 transition-all duration-500 ${showResult
                        ? "translate-y-0 scale-100 opacity-100"
                        : "translate-y-2 scale-75 opacity-0"
                        }`}
                >
                    <div
                        className={`text-4xl font-black leading-none tracking-tight sm:text-5xl ${tie
                            ? "text-yellow-400"
                            : youWon
                                ? "text-neon-lime"
                                : "text-red-500"
                            }`}
                    >
                        {resultLabel}
                    </div>

                    <div className="mt-2 text-[9px] font-black uppercase tracking-[0.28em] text-white/40">
                        {marginLabel}
                    </div>

                    <div className="mt-2 flex items-center justify-center gap-3">
                        <span
                            className={
                                youWon
                                    ? "text-2xl font-black text-neon-lime"
                                    : "text-2xl font-black text-white"
                            }
                        >
                            {yourWins}
                        </span>

                        <span className="text-sm font-black text-white/20">
                            —
                        </span>

                        <span
                            className={
                                !youWon && !tie
                                    ? "text-2xl font-black text-red-400"
                                    : "text-2xl font-black text-white"
                            }
                        >
                            {opponentWins}
                        </span>
                    </div>
                </div>
            </div>

            {/* READY BUTTON */}

            <div
                className={`mx-auto w-full max-w-md shrink-0 transition-all delay-200 duration-500 ${showResult
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-3 opacity-0"
                    }`}
            >
                <button
                    type="button"
                    onClick={onReadyUp}
                    disabled={
                        readyDisabled ||
                        isReady ||
                        !showResult
                    }
                    className={`flex h-12 w-full items-center justify-center rounded-2xl border text-sm font-black uppercase tracking-[0.22em] transition active:scale-[0.98] ${isReady
                        ? "cursor-default border-neon-lime/20 bg-neon-lime/10 text-neon-lime/60"
                        : "border-neon-lime bg-neon-lime text-black shadow-[0_0_24px_rgba(57,255,20,0.22)] hover:brightness-110"
                        } disabled:cursor-not-allowed`}
                >
                    {isReady
                        ? "Ready — Waiting..."
                        : roundNumber >= 3
                            ? "View Final Result"
                            : `Ready For Round ${roundNumber + 1
                            }`}
                </button>
            </div>
        </section>
    );
}