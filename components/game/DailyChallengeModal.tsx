"use client";

type DailyChallengeModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSelectMode: (mode: "normal" | "extreme") => void;
};

export default function DailyChallengeModal({
    isOpen,
    onClose,
    onSelectMode,
}: DailyChallengeModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">
                <div className="mb-6 text-center">
                    <h2 className="text-3xl font-bold text-white">
                        Daily Challenge
                    </h2>

                    <p className="mt-2 text-sm text-zinc-400">
                        Choose your challenge mode for today.
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => onSelectMode("normal")}
                        className="
              w-full
              rounded-2xl
              border
              border-green-500/30
              bg-green-500/10
              p-5
              text-left
              transition
              hover:border-green-500
              hover:bg-green-500/20
            "
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-white">
                                Normal Mode
                            </span>

                            <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                                MOST PLAYED
                            </span>
                        </div>

                        <div className="mt-2 text-sm text-zinc-400">
                            Fast-paced timing challenge.
                        </div>

                        <div className="mt-4 text-green-400 font-medium">
                            5 targets between 0.50s and 10.00s
                        </div>

                        <div className="mt-1 text-xs text-zinc-500">
                            Example: 1.23s • 3.27s • 7.81s
                        </div>
                    </button>

                    <button
                        onClick={() => onSelectMode("extreme")}
                        className="
              w-full
              rounded-2xl
              border
              border-red-500/30
              bg-red-500/10
              p-5
              text-left
              transition
              hover:border-red-500
              hover:bg-red-500/20
            "
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-white">
                                Extreme Mode
                            </span>

                            <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-400">
                                HARDCORE
                            </span>
                        </div>

                        <div className="mt-2 text-sm text-zinc-400">
                            Longer targets. Greater pressure.
                        </div>

                        <div className="mt-4 text-red-400 font-medium">
                            5 targets between 10.00s and 30.00s
                        </div>

                        <div className="mt-1 text-xs text-zinc-500">
                            Example: 12.84s • 18.37s • 24.62s
                        </div>
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="
            mt-6
            w-full
            rounded-2xl
            border
            border-zinc-700
            py-3
            font-semibold
            text-zinc-300
            transition
            hover:bg-zinc-800
          "
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}