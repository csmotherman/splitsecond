"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

type RoundResult = {
    target: number;
    actual: number;
    error: number;
};

type ShareProps = {
    results: RoundResult[];
    totalError: number;
    grade: string;
    rank?: number;
};

function getShareEmoji(error: number) {
    if (error <= 0.02) return "🎯";
    if (error <= 0.05) return "🟢";
    if (error <= 0.10) return "🟡";
    if (error <= 0.20) return "🟠";
    return "🔴";
}

export default function Share({
    results,
    totalError,
    grade,
    rank,
}: ShareProps) {
    const [copied, setCopied] =
        useState(false);

    const sharePattern = results
        .slice(0, 5)
        .map((r) =>
            getShareEmoji(r.error)
        )
        .join("");

    async function handleShare() {
        const shareText = [
            "SPLITSECOND",
            "",
            sharePattern,
            "",
            `${grade} Grade`,
            `+${totalError.toFixed(3)}s Total Error`,
            rank
                ? `#${rank} Today`
                : null,
            "",
            "Can you beat me?",
            "playsplitsecond.com",
        ]
            .filter(Boolean)
            .join("\n");

        try {
            if (navigator.share) {
                await navigator.share({
                    title: "SplitSecond",
                    text: shareText,
                });

                return;
            }

            await navigator.clipboard.writeText(
                shareText
            );

            setCopied(true);

            setTimeout(
                () => setCopied(false),
                2000
            );
        } catch (error) {
            console.error(
                "Share failed:",
                error
            );
        }
    }

    return (
        <button
            onClick={handleShare}
            className="
                flex-1
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-white
                text-zinc-950
                py-3.5
                px-4
                font-bold
                text-sm
                shadow-xl
                hover:bg-zinc-100
                transition
            "
        >
            {copied ? (
                <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Copied!</span>
                </>
            ) : (
                <>
                    <Share2 className="w-4 h-4" />
                    <span>Share Score</span>
                </>
            )}
        </button>
    );
}