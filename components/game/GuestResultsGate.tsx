"use client";

import { useRouter } from "next/navigation";

type Props = {
    mode: "normal" | "extreme";
};

export default function GuestResultsGate({ mode }: Props) {
    const router = useRouter();

    const claimScore = () => {
        const next = `/play?mode=${mode}&claim=1`;
        router.push(`/login?next=${encodeURIComponent(next)}`);
    };

    return (
        <div className="rounded-2xl border border-white/10 bg-[#12151E] p-6 text-center">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#39FF14]">
                Daily Challenge Complete
            </p>

            <h2 className="mt-3 text-3xl font-black text-white">
                Your result is ready
            </h2>

            <p className="mt-3 text-slate-400">
                Log in to reveal your score, see your rank, and claim your place
                on today&apos;s leaderboard.
            </p>

            <button
                type="button"
                onClick={claimScore}
                className="mt-6 w-full rounded-xl bg-[#39FF14] px-5 py-3 font-black text-black transition hover:brightness-110"
            >
                LOG IN TO REVEAL SCORE
            </button>
        </div>
    );
}
