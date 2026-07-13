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
          h-48
          w-48
          rounded-full
          font-black
          text-4xl
          text-white
          select-none
          transition-all
          duration-100
          disabled:opacity-50
          disabled:cursor-not-allowed
          enabled:hover:scale-[1.02]
          enabled:active:translate-y-2
          enabled:active:shadow-none
          border-4
          ${isRunning
                        ? `
                bg-red-500
                border-red-300
                shadow-[0_12px_0_#991b1b,0_0_40px_rgba(239,68,68,.45)]
              `
                        : `
                bg-green-500
                border-green-300
                shadow-[0_12px_0_#166534,0_0_40px_rgba(34,197,94,.45)]
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