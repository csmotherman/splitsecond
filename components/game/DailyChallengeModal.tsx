"use client";

import React from "react";

type GameMode = "normal" | "extreme";

interface DailyChallengeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectMode: (mode: GameMode) => void;
}

export default function DailyChallengeModal({
    isOpen,
    onClose,
    onSelectMode,
}: DailyChallengeModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-center">
                    Daily Challenge
                </h2>

                <p className="mt-2 text-center text-gray-600">
                    Choose your difficulty
                </p>

                <div className="mt-6 space-y-4">
                    <button
                        onClick={() => onSelectMode("normal")}
                        className="w-full rounded-xl border p-4 text-left transition hover:bg-gray-50"
                    >
                        <div className="font-bold text-lg">
                            Normal
                        </div>

                        <div className="text-sm text-gray-500 mt-1">
                            5 targets • 2 decimal places
                        </div>

                        <div className="text-sm text-gray-400 mt-1">
                            Example: 3.27, 4.81, 7.44
                        </div>
                    </button>

                    <button
                        onClick={() => onSelectMode("extreme")}
                        className="w-full rounded-xl border p-4 text-left transition hover:bg-gray-50"
                    >
                        <div className="font-bold text-lg">
                            Extreme
                        </div>

                        <div className="text-sm text-gray-500 mt-1">
                            5 targets • 3 decimal places
                        </div>

                        <div className="text-sm text-gray-400 mt-1">
                            Example: 3.271, 4.812, 7.447
                        </div>
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="mt-6 w-full rounded-xl bg-gray-100 py-3 font-medium hover:bg-gray-200"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}