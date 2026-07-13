"use client";

import { useEffect, useState } from "react";

type CountdownProps = {
    seconds?: number;
    onComplete: () => void;
};

export default function Countdown({
    seconds = 3,
    onComplete,
}: CountdownProps) {
    const [count, setCount] = useState(seconds);

    useEffect(() => {
        if (count <= 0) {
            const timeout = setTimeout(() => {
                onComplete();
            }, 500);

            return () => clearTimeout(timeout);
        }

        const interval = setInterval(() => {
            setCount((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [count, onComplete]);

    return (
        <div className="flex items-center justify-center py-16">
            <div
                className="
          text-8xl
          font-extrabold
          text-green-500
          animate-pulse
          select-none
        "
            >
                {count > 0 ? count : "GO!"}
            </div>
        </div>
    );
}