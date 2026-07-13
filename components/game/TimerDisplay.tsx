"use client";

type TimerDisplayProps = {
    value?: string;
};

export default function TimerDisplay({
    value = "--.--",
}: TimerDisplayProps) {
    return (
        <div className="flex justify-center">
            <div
                className="
          rounded-3xl
          border
          border-white/10
          bg-zinc-900
          px-8
          py-5
          shadow-xl
        "
            >
                <span className="text-5xl font-black text-zinc-700">
                    {value}
                </span>
            </div>
        </div>
    );
}