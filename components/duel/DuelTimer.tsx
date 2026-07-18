"use client";

import {
    useRef,
    useState,
} from "react";

type Props = {
    targetMs: number;
    onSubmit: (
        elapsedMs: number
    ) => void;
};

export default function DuelTimer({
    targetMs,
    onSubmit,
}: Props) {
    const startRef =
        useRef<number | null>(
            null
        );

    const [started, setStarted] =
        useState(false);

    function handleStart() {
        startRef.current =
            performance.now();

        setStarted(true);
    }

    function handleStop() {
        if (
            !startRef.current
        ) {
            return;
        }

        const elapsed =
            Math.round(
                performance.now() -
                startRef.current
            );

        onSubmit(elapsed);
    }

    return (
        <div className="space-y-8 text-center text-white">
            <div className="text-7xl font-black text-neon-lime">
                {(
                    targetMs / 1000
                ).toFixed(3)}
            </div>

            {!started ? (
                <button
                    onClick={
                        handleStart
                    }
                >
                    START
                </button>
            ) : (
                <button
                    onClick={
                        handleStop
                    }
                >
                    STOP
                </button>
            )}
        </div>
    );
}
