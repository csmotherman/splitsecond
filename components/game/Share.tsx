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
    allTimeRank?: number;
    totalRuns?: number;
};

function getShareEmoji(error: number) {
    if (error <= 0.02) return "🎯";
    if (error <= 0.05) return "🟢";
    if (error <= 0.1) return "🟡";
    if (error <= 0.2) return "🟠";
    return "🔴";
}

function getAchievementText(
    allTimeRank?: number,
    totalRuns?: number
) {
    if (
        typeof allTimeRank !== "number" ||
        typeof totalRuns !== "number"
    ) {
        return null;
    }

    if (allTimeRank === 1) {
        return `🥇 WORLD RECORD of ${totalRuns} runs`;
    }

    if (allTimeRank <= 5) {
        return `💎 #${allTimeRank} ALL-TIME of ${totalRuns} runs`;
    }

    if (allTimeRank <= 10) {
        return `🔥 #${allTimeRank} ALL-TIME of ${totalRuns} runs`;
    }

    return `#${allTimeRank} ALL-TIME of ${totalRuns} runs`;
}

export default function Share({
    results,
    totalError,
    allTimeRank,
    totalRuns,
}: ShareProps) {
    const [copied, setCopied] = useState(false);

    async function handleShare() {
        const roundBreakdown = results
            .slice(0, 5)
            .map(
                (result) =>
                    `${getShareEmoji(result.error)} ${result.error.toFixed(2)}s`
            )
            .join("\n");

        const shareText = [
            "SplitSecond",
            getAchievementText(allTimeRank, totalRuns),
            roundBreakdown,
            "TOTAL ERROR",
            `+${totalError.toFixed(2)}`,
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

            await navigator.clipboard.writeText(shareText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Share failed:", error);
        }
    }

    return (
        <button
            type="button"
            onClick={handleShare}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3.5 text-sm font-bold text-zinc-950 shadow-xl transition hover:bg-zinc-100"
        >
            {copied ? (
                <>
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>Copied!</span>
                </>
            ) : (
                <>
                    <Share2 className="h-4 w-4" />
                    <span>Share Score</span>
                </>
            )}
        </button>
    );
}
