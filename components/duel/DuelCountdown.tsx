"use client";

import {
    useEffect,
    useState,
} from "react";

type Props = {
    onComplete: () => void;
};

export default function DuelCountdown({
    onComplete,
}: Props) {
    const [count, setCount] =
        useState(3);

    useEffect(() => {
        const interval =
            setInterval(() => {
                setCount(
                    current => {
                        if (
                            current <= 1
                        ) {
                            clearInterval(
                                interval
                            );

                            onComplete();

                            return 0;
                        }

                        return (
                            current - 1
                        );
                    }
                );
            }, 1000);

        return () =>
            clearInterval(
                interval
            );
    }, [onComplete]);

    return (
        <div className="text-center text-8xl font-black text-neon-lime">
            {count}
        </div>
    );
}