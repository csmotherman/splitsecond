import Link from "next/link";
import { Play, Dumbbell, BookOpen, Zap } from "lucide-react";

export default function HomePage() {
    return (
        <div className="relative">
            {/* Background Radial Glow */}
            <div className="pointer-events-none fixed left-1/2 top-0 -z-10 h-[350px] w-full max-w-lg -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#39FF14]/10 via-transparent to-transparent blur-3xl" />

            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 backdrop-blur-xl">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#39FF14]/20 bg-[#39FF14]/10 px-3 py-1 font-mono text-[10px] font-semibold text-[#39FF14]">
                    <Zap className="h-3 w-3 fill-current" />
                    <span>TEST YOUR INTERNAL CLOCK</span>
                </div>

                <h2 className="mt-4 font-college text-4xl text-white tracking-wider">
                    DAILY TIMER CHALLENGE
                </h2>

                <p className="mt-1 text-sm leading-relaxed text-slate-400">
                    Can you accurately count time in your head down to the exact millisecond?
                </p>

                <Link
                    href="/play"
                    className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#39FF14] py-4 font-mono text-xs font-black uppercase tracking-wider text-black shadow-[0_0_20px_rgba(57,255,20,0.25)] transition-all duration-300 hover:bg-[#32e612] hover:shadow-[0_0_25px_rgba(57,255,20,0.45)] active:scale-[0.98]"
                >
                    <Play className="h-4 w-4 fill-current transition-transform group-hover:translate-x-0.5" />
                    <span>Play Today's Challenge</span>
                </Link>
            </section>

            {/* Secondary Navigation */}
            <nav className="mt-4 grid grid-cols-2 gap-3">
                <Link
                    href="/practice"
                    className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-white/[0.05] active:scale-95"
                >
                    <Dumbbell className="h-5 w-5 text-[#39FF14] transition-transform group-hover:scale-110" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
                        Practice Mode
                    </span>
                </Link>

                <Link
                    href="/how-to-play"
                    className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-white/[0.05] active:scale-95"
                >
                    <BookOpen className="h-5 w-5 text-slate-400 transition-transform group-hover:scale-110 group-hover:text-white" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
                        How To Play
                    </span>
                </Link>
            </nav>
        </div>
    );
}