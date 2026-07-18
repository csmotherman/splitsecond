"use client";

type ActionButtonProps = {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    isRunning?: boolean;
};

export default function ActionButton({
    label,
    onClick,
    disabled = false,
    isRunning = false,
}: ActionButtonProps) {
    const isStop = isRunning;

    return (
        <div className="flex justify-center py-4">
            <button
                onClick={onClick}
                disabled={disabled}
                aria-label={label}
                className={`
                    group
                    relative

                    h-36
                    w-36
                    sm:h-40
                    sm:w-40

                    rounded-full

                    transition-all
                    duration-100
                    ease-out

                    enabled:hover:scale-[1.02]
                    enabled:active:translate-y-[8px]
                    enabled:active:scale-[0.96]

                    disabled:opacity-50
                    disabled:cursor-not-allowed

                    ${!isStop
                        ? "animate-[pulse_2.4s_ease-in-out_infinite]"
                        : ""
                    }
                `}
            >
                {/* Ground shadow */}
                <div
                    className={`
                        absolute
                        inset-x-5
                        -bottom-5
                        h-6
                        rounded-full
                        blur-xl
                        ${isStop
                            ? "bg-red-900/50"
                            : "bg-[#39FF14]/35"
                        }
                    `}
                />

                {/* Button depth */}
                <div
                    className={`
                        absolute
                        inset-0
                        translate-y-[10px]
                        rounded-full
                        ${isStop
                            ? "bg-red-900"
                            : "bg-green-900"
                        }
                    `}
                />

                {/* Metallic ring */}
                <div
                    className="
                        absolute
                        inset-0
                        rounded-full
                        bg-gradient-to-b
                        from-zinc-200
                        via-zinc-500
                        to-zinc-800
                        shadow-[0_12px_0_rgba(0,0,0,.45)]
                    "
                />

                {/* Button face */}
                <div
                    className={`
                        absolute
                        inset-[7px]
                        rounded-full
                        shadow-inner

                        ${isStop
                            ? "bg-[radial-gradient(circle_at_35%_25%,#ffaaaa,#ef4444_45%,#7f1d1d_100%)]"
                            : "bg-[radial-gradient(circle_at_35%_25%,#a6ff8b,#39FF14_45%,#167d00_100%)]"
                        }
                    `}
                >
                    {/* Gloss */}
                    <div className="absolute left-6 right-6 top-4 h-8 rounded-full bg-white/35 blur-md" />

                    {/* Inner bevel */}
                    <div className="absolute inset-2 rounded-full border border-white/20" />

                    {/* Outer bevel */}
                    <div className="absolute inset-5 rounded-full border border-black/10" />

                    {/* Glow */}
                    {!isStop && (
                        <div className="absolute inset-4 rounded-full bg-[#39FF14]/15 blur-lg" />
                    )}
                </div>

                {/* Text */}
                <span
                    className="
                        absolute
                        inset-0

                        flex
                        items-center
                        justify-center

                        text-3xl
                        sm:text-4xl

                        font-black
                        tracking-[0.15em]
                        text-white

                        drop-shadow-[0_2px_5px_rgba(0,0,0,.6)]
                    "
                >
                    {label}
                </span>
            </button>
        </div>
    );
}