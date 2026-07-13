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
    return (
        <div className="flex justify-center">
            <button
                onClick={onClick}
                disabled={disabled}
                aria-label={label}
                className={`
                    relative
                    h-32
                    w-32
                    sm:h-40
                    sm:w-40
                    rounded-full
                    font-black
                    text-2xl
                    sm:text-3xl
                    text-white
                    select-none
                    transition-all
                    duration-100
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    enabled:hover:scale-[1.02]
                    enabled:active:translate-y-1
                    enabled:active:shadow-none
                    border-4
                    ${isRunning
                        ? `
                                bg-red-500
                                border-red-300
                                shadow-[0_10px_0_#991b1b,0_0_30px_rgba(239,68,68,.35)]
                              `
                        : `
                                bg-green-500
                                border-green-300
                                shadow-[0_10px_0_#166534,0_0_30px_rgba(34,197,94,.35)]
                              `
                    }
                `}
            >
                <div className="flex h-full w-full items-center justify-center">
                    {label}
                </div>
            </button>
        </div>
    );
}