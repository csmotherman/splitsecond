"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ResultRevealProps = {
    target: number;
    actual: number;
    error: number;
};

type RevealTier = {
    label: string;
    textColor: string;
    glowColor: string;
    backgroundColor: string;
    ringColor: string;
    particleColor: string;
    revealDelay: number;
    ratingDelay: number;
    vibrationPattern?: number | number[];
    animation:
    | "perfect"
    | "bullseye"
    | "incredible"
    | "excellent"
    | "great"
    | "close"
    | "decent"
    | "miss";
};

export default function ResultReveal({
    target,
    actual,
    error,
}: ResultRevealProps) {
    const [isVisible, setIsVisible] = useState(false);

    const [showTime, setShowTime] = useState(false);

    const [showError, setShowError] = useState(false);

    const [showRating, setShowRating] = useState(false);

    const [displayActual, setDisplayActual] = useState(actual);

    const animationFrameRef = useRef<number | null>(null);

    const normalizedError = Math.abs(error);

    const tier = useMemo<RevealTier>(() => {
        /*
         * A value below half a thousandth is effectively
         * an exact hit when results are displayed to
         * two decimal places.
         */
        if (normalizedError < 0.0005) {
            return {
                label: "PERFECT TIMER",
                textColor: "text-yellow-300",
                glowColor:
                    "drop-shadow-[0_0_18px_rgba(253,224,71,1)] drop-shadow-[0_0_45px_rgba(250,204,21,0.9)]",
                backgroundColor: "bg-yellow-300/25",
                ringColor: "border-yellow-300/80",
                particleColor: "bg-yellow-200",
                revealDelay: 400,
                ratingDelay: 1050,
                vibrationPattern: [50, 40, 80, 40, 140],
                animation: "perfect",
            };
        }

        if (normalizedError <= 0.02) {
            return {
                label: "BULLSEYE",
                textColor: "text-yellow-400",
                glowColor:
                    "drop-shadow-[0_0_18px_rgba(250,204,21,0.95)] drop-shadow-[0_0_38px_rgba(250,204,21,0.7)]",
                backgroundColor: "bg-yellow-400/20",
                ringColor: "border-yellow-400/70",
                particleColor: "bg-yellow-300",
                revealDelay: 300,
                ratingDelay: 900,
                vibrationPattern: [60, 35, 100],
                animation: "bullseye",
            };
        }

        if (normalizedError <= 0.05) {
            return {
                label: "INCREDIBLE",
                textColor: "text-[#39FF14]",
                glowColor:
                    "drop-shadow-[0_0_18px_rgba(57,255,20,0.95)] drop-shadow-[0_0_38px_rgba(57,255,20,0.65)]",
                backgroundColor: "bg-[#39FF14]/15",
                ringColor: "border-[#39FF14]/60",
                particleColor: "bg-[#39FF14]",
                revealDelay: 260,
                ratingDelay: 820,
                vibrationPattern: [45, 30, 75],
                animation: "incredible",
            };
        }

        if (normalizedError <= 0.1) {
            return {
                label: "EXCELLENT",
                textColor: "text-green-400",
                glowColor: "drop-shadow-[0_0_20px_rgba(74,222,128,0.85)]",
                backgroundColor: "bg-green-400/15",
                ringColor: "border-green-400/50",
                particleColor: "bg-green-300",
                revealDelay: 220,
                ratingDelay: 720,
                vibrationPattern: 50,
                animation: "excellent",
            };
        }

        if (normalizedError <= 0.2) {
            return {
                label: "GREAT",
                textColor: "text-cyan-400",
                glowColor: "drop-shadow-[0_0_18px_rgba(34,211,238,0.75)]",
                backgroundColor: "bg-cyan-400/12",
                ringColor: "border-cyan-400/45",
                particleColor: "bg-cyan-300",
                revealDelay: 180,
                ratingDelay: 620,
                vibrationPattern: 35,
                animation: "great",
            };
        }

        if (normalizedError <= 0.3) {
            return {
                label: "CLOSE",
                textColor: "text-orange-400",
                glowColor: "drop-shadow-[0_0_16px_rgba(251,146,60,0.7)]",
                backgroundColor: "bg-orange-400/10",
                ringColor: "border-orange-400/40",
                particleColor: "bg-orange-300",
                revealDelay: 150,
                ratingDelay: 540,
                vibrationPattern: 25,
                animation: "close",
            };
        }

        if (normalizedError <= 0.5) {
            return {
                label: "DECENT",
                textColor: "text-orange-300",
                glowColor: "drop-shadow-[0_0_10px_rgba(253,186,116,0.4)]",
                backgroundColor: "bg-orange-300/5",
                ringColor: "border-orange-300/25",
                particleColor: "bg-orange-200",
                revealDelay: 100,
                ratingDelay: 430,
                animation: "decent",
            };
        }

        return {
            label: "MISS",
            textColor: "text-red-400",
            glowColor: "",
            backgroundColor: "bg-red-400/5",
            ringColor: "border-red-400/15",
            particleColor: "bg-red-300",
            revealDelay: 80,
            ratingDelay: 320,
            animation: "miss",
        };
    }, [normalizedError]);

    useEffect(() => {
        setIsVisible(false);
        setShowTime(false);
        setShowError(false);
        setShowRating(false);
        setDisplayActual(actual);

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        const visibilityTimer = window.setTimeout(() => {
            setIsVisible(true);
        }, 20);

        const timeTimer = window.setTimeout(() => {
            setShowTime(true);

            /*
             * Small count-up for stronger results.
             * Poor results appear directly so misses
             * do not receive a long celebratory reveal.
             */
            const shouldCount = normalizedError <= 0.3;

            if (!shouldCount) {
                setDisplayActual(actual);
                return;
            }

            const duration =
                tier.animation === "perfect"
                    ? 650
                    : tier.animation === "bullseye"
                        ? 550
                        : 420;

            const startTime = performance.now();

            const startValue = Math.max(0, actual - Math.min(actual, 0.35));

            const animateNumber = (timestamp: number) => {
                const progress = Math.min((timestamp - startTime) / duration, 1);

                const easedProgress = 1 - Math.pow(1 - progress, 4);

                const nextValue = startValue + (actual - startValue) * easedProgress;

                setDisplayActual(nextValue);

                if (progress < 1) {
                    animationFrameRef.current = requestAnimationFrame(animateNumber);
                } else {
                    setDisplayActual(actual);
                }
            };

            animationFrameRef.current = requestAnimationFrame(animateNumber);
        }, tier.revealDelay);

        const errorTimer = window.setTimeout(() => {
            setShowError(true);
        }, tier.revealDelay + 350);

        const ratingTimer = window.setTimeout(() => {
            setShowRating(true);

            if (
                tier.vibrationPattern &&
                typeof navigator !== "undefined" &&
                "vibrate" in navigator
            ) {
                navigator.vibrate(tier.vibrationPattern);
            }
        }, tier.ratingDelay);

        return () => {
            window.clearTimeout(visibilityTimer);

            window.clearTimeout(timeTimer);
            window.clearTimeout(errorTimer);
            window.clearTimeout(ratingTimer);

            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [actual, normalizedError, target, tier]);

    const timeAnimationClass = {
        perfect: "result-perfect-time",
        bullseye: "result-bullseye-time",
        incredible: "result-incredible-time",
        excellent: "result-excellent-time",
        great: "result-great-time",
        close: "result-close-time",
        decent: "result-decent-time",
        miss: "result-miss-time",
    }[tier.animation];

    const ratingAnimationClass = {
        perfect: "result-perfect-rating",
        bullseye: "result-bullseye-rating",
        incredible: "result-incredible-rating",
        excellent: "result-excellent-rating",
        great: "result-great-rating",
        close: "result-close-rating",
        decent: "result-decent-rating",
        miss: "result-miss-rating",
    }[tier.animation];

    const formattedError =
        normalizedError < 0.005 ? "0.00" : normalizedError.toFixed(2);

    return (
        <>
            <div
                className={`
                    relative
                    isolate
                    mx-auto
                    flex
                    min-h-[245px] sm:min-h-[310px]
                    w-full
                    max-w-md
                    items-center
                    justify-center
                    overflow-hidden
                    px-2
                    py-3
                    sm:px-4
                    sm:py-6
                    text-center
                    transition-opacity
                    duration-200
                    ${isVisible ? "opacity-100" : "opacity-0"}
                `}
            >
                {/* Base glow */}
                <div
                    className={`
                        pointer-events-none
                        absolute
                        left-1/2
                        top-1/2
                        -z-20
                        h-48
                        w-48
                        sm:h-64
                        sm:w-64
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        blur-[90px]
                        transition-all
                        duration-700
                        ${tier.backgroundColor}
                        ${showTime
                            ? "scale-125 opacity-100"
                            : "scale-50 opacity-0"
                        }
                    `}
                />

                {/* Perfect screen flash */}
                {tier.animation === "perfect" && showTime && (
                    <div className="result-perfect-flash pointer-events-none absolute inset-0 -z-10 bg-white" />
                )}

                {/* Expanding accuracy rings */}
                {normalizedError <= 0.3 && showTime && (
                    <>
                        <div
                            className={`
                                    result-ring-one
                                    pointer-events-none
                                    absolute
                                    left-1/2
                                    top-1/2
                                    -z-10
                                    h-36
                                    w-36
                                    sm:h-44
                                    sm:w-44
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    rounded-full
                                    border-2
                                    ${tier.ringColor}
                                `}
                        />

                        <div
                            className={`
                                    result-ring-two
                                    pointer-events-none
                                    absolute
                                    left-1/2
                                    top-1/2
                                    -z-10
                                    h-36
                                    w-36
                                    sm:h-44
                                    sm:w-44
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    rounded-full
                                    border
                                    ${tier.ringColor}
                                `}
                        />
                    </>
                )}

                {/* Perfect/bullseye radial rays */}
                {(tier.animation === "perfect" || tier.animation === "bullseye") &&
                    showRating && (
                        <div className="result-rays pointer-events-none absolute left-1/2 top-1/2 -z-10 h-56 w-56 sm:h-72 sm:w-72 -translate-x-1/2 -translate-y-1/2">
                            {Array.from({
                                length: 12,
                            }).map((_, index) => (
                                <span
                                    key={index}
                                    className={`
                                        absolute
                                        left-1/2
                                        top-1/2
                                        h-20
                                        w-1
                                        origin-[50%_0]
                                        rounded-full
                                        ${tier.particleColor}
                                    `}
                                    style={{
                                        transform: `rotate(${index * 30}deg) translateY(-105px)`,
                                    }}
                                />
                            ))}
                        </div>
                    )}

                {/* Celebration particles */}
                {normalizedError <= 0.05 && showRating && (
                    <div className="pointer-events-none absolute inset-0">
                        {Array.from({
                            length: tier.animation === "perfect" ? 18 : 12,
                        }).map((_, index) => {
                            const angle =
                                (360 / (tier.animation === "perfect" ? 18 : 12)) * index;

                            const distance = tier.animation === "perfect" ? 145 : 115;

                            return (
                                <span
                                    key={index}
                                    className={`
                                            result-particle
                                            absolute
                                            left-1/2
                                            top-1/2
                                            h-2
                                            w-2
                                            rounded-full
                                            ${tier.particleColor}
                                        `}
                                    style={
                                        {
                                            "--particle-x": `${Math.cos((angle * Math.PI) / 180) * distance
                                                }px`,
                                            "--particle-y": `${Math.sin((angle * Math.PI) / 180) * distance
                                                }px`,
                                            animationDelay: `${index * 18}ms`,
                                        } as React.CSSProperties
                                    }
                                />
                            );
                        })}
                    </div>
                )}

                <div className="relative z-10 flex w-full flex-col items-center justify-center">
                    <p
                        className={`
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.32em]
                            text-zinc-500
                            transition-all
                            duration-300
                            ${showTime
                                ? "translate-y-0 opacity-100"
                                : "translate-y-1 opacity-0"
                            }
                        `}
                    >
                        Your Time
                    </p>

                    <div
                        className={`
                            mt-1
                            flex
                            items-end
                            justify-center
                            tabular-nums
                            tracking-tighter
                            ${tier.textColor}
                            ${tier.glowColor}
                            ${showTime
                                ? timeAnimationClass
                                : "scale-75 opacity-0"
                            }
                        `}
                    >
                        <span
                            className={`
                                font-college
                                text-6xl
                                leading-none
                                sm:text-8xl
                                ${tier.animation === "perfect"
                                    ? "sm:text-9xl"
                                    : ""
                                }
                            `}
                        >
                            {displayActual.toFixed(2)}
                        </span>

                        <span className="mb-1 ml-1 font-mono text-base font-black tracking-normal opacity-70 sm:mb-2 sm:text-xl">
                            s
                        </span>
                    </div>

                    <div
                        className={`
                            mt-2
                            min-h-8
                            sm:mt-4
                            sm:min-h-10
                            ${showRating
                                ? ratingAnimationClass
                                : "scale-75 opacity-0"
                            }
                        `}
                    >
                        {tier.animation === "perfect" && (
                            <div className="mb-1 flex items-center justify-center gap-2 sm:mb-2">
                                <span className="h-px w-7 bg-gradient-to-r from-transparent to-yellow-300 sm:w-10" />
                                <span className="result-perfect-star text-base text-yellow-300 sm:text-xl">
                                    ✦
                                </span>
                                <span className="h-px w-7 bg-gradient-to-l from-transparent to-yellow-300 sm:w-10" />
                            </div>
                        )}

                        <div
                            className={`
                                font-college
                                text-xl
                                uppercase
                                tracking-[0.16em]
                                sm:text-3xl
                                sm:tracking-[0.2em]
                                ${tier.textColor}
                                ${tier.glowColor}
                            `}
                        >
                            {tier.label}
                        </div>
                    </div>

                    <div
                        className={`
                            mt-2
                            transition-all
                            duration-300
                            sm:mt-4
                            ${showError
                                ? "translate-y-0 opacity-100"
                                : "translate-y-2 opacity-0"
                            }
                        `}
                    >
                        <div className="flex items-baseline justify-center gap-1.5 rounded-full border border-white/[0.06] bg-black/20 px-3 py-1.5 sm:px-4 sm:py-2">
                            <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-zinc-600">
                                Error
                            </span>

                            <span
                                className={`
                                    font-mono
                                    text-lg
                                    font-black
                                    tabular-nums
                                    sm:text-xl
                                    ${tier.textColor}
                                    ${tier.glowColor}
                                `}
                            >
                                +{formattedError}s
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .result-perfect-time {
          animation: perfectTime 900ms cubic-bezier(0.16, 1.3, 0.3, 1) both;
        }

        .result-bullseye-time {
          animation: bullseyeTime 700ms cubic-bezier(0.16, 1.2, 0.3, 1) both;
        }

        .result-incredible-time {
          animation: incredibleTime 650ms cubic-bezier(0.16, 1.15, 0.3, 1) both;
        }

        .result-excellent-time {
          animation: excellentTime 550ms ease-out both;
        }

        .result-great-time {
          animation: greatTime 500ms ease-out both;
        }

        .result-close-time {
          animation: closeTime 430ms ease-out both;
        }

        .result-decent-time {
          animation: decentTime 350ms ease-out both;
        }

        .result-miss-time {
          animation: missTime 280ms ease-out both;
        }

        .result-perfect-rating {
          animation: perfectRating 850ms cubic-bezier(0.16, 1.4, 0.3, 1) both;
        }

        .result-bullseye-rating {
          animation: bullseyeRating 650ms cubic-bezier(0.16, 1.25, 0.3, 1) both;
        }

        .result-incredible-rating {
          animation: incredibleRating 600ms cubic-bezier(0.16, 1.2, 0.3, 1) both;
        }

        .result-excellent-rating {
          animation: excellentRating 500ms ease-out both;
        }

        .result-great-rating {
          animation: greatRating 450ms ease-out both;
        }

        .result-close-rating {
          animation: closeRating 400ms ease-out both;
        }

        .result-decent-rating {
          animation: decentRating 320ms ease-out both;
        }

        .result-miss-rating {
          animation: missRating 260ms ease-out both;
        }

        .result-perfect-flash {
          animation: perfectFlash 700ms ease-out both;
        }

        .result-ring-one {
          animation: ringExpand 900ms ease-out both;
        }

        .result-ring-two {
          animation: ringExpand 900ms 130ms ease-out both;
        }

        .result-rays {
          animation: raysReveal 850ms ease-out both;
        }

        .result-particle {
          animation: particleBurst 850ms cubic-bezier(0.15, 0.75, 0.25, 1) both;
        }

        .result-perfect-star {
          animation: perfectStar 1000ms ease-in-out infinite;
        }

        @keyframes perfectTime {
          0% {
            opacity: 0;
            transform: scale(0.2) rotate(-8deg);
            filter: blur(12px);
          }

          55% {
            opacity: 1;
            transform: scale(1.22) rotate(2deg);
            filter: blur(0);
          }

          75% {
            transform: scale(0.94) rotate(-1deg);
          }

          100% {
            opacity: 1;
            transform: scale(1) rotate(0);
          }
        }

        @keyframes bullseyeTime {
          0% {
            opacity: 0;
            transform: scale(0.35);
            filter: blur(8px);
          }

          60% {
            opacity: 1;
            transform: scale(1.14);
            filter: blur(0);
          }

          80% {
            transform: scale(0.97);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes incredibleTime {
          0% {
            opacity: 0;
            transform: translateY(22px) scale(0.65);
          }

          60% {
            opacity: 1;
            transform: translateY(-5px) scale(1.08);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes excellentTime {
          0% {
            opacity: 0;
            transform: translateY(18px) scale(0.8);
          }

          70% {
            opacity: 1;
            transform: translateY(-3px) scale(1.04);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes greatTime {
          0% {
            opacity: 0;
            transform: translateY(14px) scale(0.88);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes closeTime {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }

          70% {
            opacity: 1;
            transform: scale(1.03);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes decentTime {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes missTime {
          0% {
            opacity: 0;
          }

          100% {
            opacity: 1;
          }
        }

        @keyframes perfectRating {
          0% {
            opacity: 0;
            transform: scale(2.2);
            letter-spacing: 0.55em;
            filter: blur(10px);
          }

          55% {
            opacity: 1;
            transform: scale(0.9);
            filter: blur(0);
          }

          72% {
            transform: scale(1.1);
          }

          100% {
            opacity: 1;
            transform: scale(1);
            letter-spacing: 0.2em;
          }
        }

        @keyframes bullseyeRating {
          0% {
            opacity: 0;
            transform: scale(0.35) rotate(-5deg);
          }

          65% {
            opacity: 1;
            transform: scale(1.15) rotate(2deg);
          }

          100% {
            opacity: 1;
            transform: scale(1) rotate(0);
          }
        }

        @keyframes incredibleRating {
          0% {
            opacity: 0;
            transform: translateY(18px) scale(0.65);
          }

          65% {
            opacity: 1;
            transform: translateY(-3px) scale(1.1);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes excellentRating {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.8);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes greatRating {
          0% {
            opacity: 0;
            transform: translateY(9px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes closeRating {
          0% {
            opacity: 0;
            transform: scale(0.92);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes decentRating {
          0% {
            opacity: 0;
            transform: translateY(5px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes missRating {
          0% {
            opacity: 0;
          }

          100% {
            opacity: 1;
          }
        }

        @keyframes perfectFlash {
          0% {
            opacity: 0;
          }

          15% {
            opacity: 0.85;
          }

          100% {
            opacity: 0;
          }
        }

        @keyframes ringExpand {
          0% {
            opacity: 0.9;
            transform: translate(-50%, -50%) scale(0.35);
          }

          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(2);
          }
        }

        @keyframes raysReveal {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(-15deg) scale(0.3);
          }

          35% {
            opacity: 0.7;
          }

          100% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(20deg) scale(1.3);
          }
        }

        @keyframes particleBurst {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.3);
          }

          100% {
            opacity: 0;
            transform: translate(
                calc(-50% + var(--particle-x)),
                calc(-50% + var(--particle-y))
              )
              scale(0);
          }
        }

        @keyframes perfectStar {
          0%,
          100% {
            transform: scale(0.85) rotate(0deg);
            opacity: 0.7;
          }

          50% {
            transform: scale(1.25) rotate(180deg);
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .result-perfect-time,
          .result-bullseye-time,
          .result-incredible-time,
          .result-excellent-time,
          .result-great-time,
          .result-close-time,
          .result-decent-time,
          .result-miss-time,
          .result-perfect-rating,
          .result-bullseye-rating,
          .result-incredible-rating,
          .result-excellent-rating,
          .result-great-rating,
          .result-close-rating,
          .result-decent-rating,
          .result-miss-rating {
            animation-duration: 1ms;
          }

          .result-perfect-flash,
          .result-ring-one,
          .result-ring-two,
          .result-rays,
          .result-particle {
            display: none;
          }
        }
      `}</style>
        </>
    );
}