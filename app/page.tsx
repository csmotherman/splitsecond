import React from 'react';
import {
    Play,
    Trophy,
    Target,
    HelpCircle,
    User,
    Zap,
    Clock,
    Flame,
    ChevronRight,
    Sparkles,
    BarChart3
} from 'lucide-react';

export default function SplitSecondMainMenu() {
    return (
        <div className="space-y-6 pb-12">

            {/* Hero Brand Section */}
            <section className="text-center pt-2 space-y-3">
                {/* Tagline Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/20 text-[#39FF14] text-[10px] font-mono font-bold tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
                    DAILY TIMER GAME
                </div>

                {/* Main Title (College / Teko Font) */}
                <div className="space-y-1">
                    <h1 className="font-college text-6xl md:text-7xl font-black uppercase text-white tracking-wide leading-none">
                        SPLIT<span className="text-[#39FF14]">SECOND</span>
                    </h1>
                    <p className="text-slate-400 text-xs font-mono tracking-wider uppercase">
                        Every Millisecond Matters.
                    </p>
                </div>

                {/* Short Concept Pitch */}
                <p className="text-slate-400 text-xs max-w-xs mx-auto leading-relaxed pt-1">
                    Test your internal clock against hidden targets. Five daily attempts. Zero room for error.
                </p>
            </section>

            {/* Primary CTA: Daily Challenge Card */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#12151E] via-[#12151E] to-[#0A0B0E] border border-[#39FF14]/40 rounded-3xl p-5 shadow-[0_0_25px_rgba(57,255,20,0.15)] space-y-4">
                {/* Glow backdrop */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#39FF14]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-[#39FF14]" />
                        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                            Today's Seed #184
                        </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#39FF14] bg-[#39FF14]/10 px-2.5 py-0.5 rounded-full border border-[#39FF14]/30 font-bold">
                        1 SUBMISSION LEFT
                    </span>
                </div>

                {/* Targets Teaser */}
                <div className="space-y-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        Active Targets (Seconds)
                    </span>
                    <div className="grid grid-cols-5 gap-1.5 text-center">
                        {['0.91s', '2.74s', '4.63s', '6.81s', '9.15s'].map((time, idx) => (
                            <div key={idx} className="bg-[#0A0B0E] border border-white/5 py-2 rounded-xl">
                                <span className="block text-[8px] font-mono text-slate-500">T{idx + 1}</span>
                                <span className="font-mono text-xs font-bold text-[#39FF14]">{time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Play Pill Button */}
                <button className="w-full py-4 rounded-full bg-[#39FF14] hover:bg-[#32e012] text-slate-950 font-black text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(57,255,20,0.35)] transition-all active:scale-[0.98] flex items-center justify-center space-x-2">
                    <Play className="w-4 h-4 fill-current" />
                    <span>PLAY TODAY'S CHALLENGE</span>
                </button>
            </section>

            {/* Mode Selector Options Grid */}
            <section className="space-y-2.5">
                <h2 className="text-xs font-mono text-slate-500 font-bold uppercase tracking-widest px-1">
                    CHOOSE MODE
                </h2>

                <div className="grid grid-cols-1 gap-2.5">
                    {/* Practice Mode */}
                    <button className="w-full bg-[#12151E] hover:bg-[#161A26] border border-white/5 hover:border-white/20 rounded-2xl p-4 text-left flex items-center justify-between transition-all group">
                        <div className="flex items-center space-x-3.5">
                            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:border-blue-400/50 transition-colors">
                                <Target className="w-5 h-5" />
                            </div>
                            <div className="space-y-0.5">
                                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                                    Practice Arena
                                    <span className="text-[9px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-slate-300">Unlimited</span>
                                </h3>
                                <p className="text-xs text-slate-400">Train your internal clock on random targets without affecting stats.</p>
                            </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                    </button>

                    {/* Global Leaderboards */}
                    <button className="w-full bg-[#12151E] hover:bg-[#161A26] border border-white/5 hover:border-white/20 rounded-2xl p-4 text-left flex items-center justify-between transition-all group">
                        <div className="flex items-center space-x-3.5">
                            <div className="p-3 rounded-xl bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/20 group-hover:border-[#39FF14]/50 transition-colors">
                                <Trophy className="w-5 h-5" />
                            </div>
                            <div className="space-y-0.5">
                                <h3 className="font-bold text-sm text-white">Leaderboards</h3>
                                <p className="text-xs text-slate-400">Check Daily, Weekly, Monthly, and All-Time global rankings.</p>
                            </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                    </button>

                    {/* Player Career Stats */}
                    <button className="w-full bg-[#12151E] hover:bg-[#161A26] border border-white/5 hover:border-white/20 rounded-2xl p-4 text-left flex items-center justify-between transition-all group">
                        <div className="flex items-center space-x-3.5">
                            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:border-purple-400/50 transition-colors">
                                <BarChart3 className="w-5 h-5" />
                            </div>
                            <div className="space-y-0.5">
                                <h3 className="font-bold text-sm text-white">Career Profile</h3>
                                <p className="text-xs text-slate-400">View Career Average Error, Perfect Timers, and Current Streaks.</p>
                            </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                    </button>
                </div>
            </section>

            {/* Quick Stats Badges */}
            <section className="grid grid-cols-3 gap-2.5">
                {[
                    { label: 'CAREER AVG', value: '0.042s', highlight: true },
                    { label: 'PERFECT TIMERS', value: '14★', highlight: false },
                    { label: 'STREAK', value: '12 DAYS', highlight: false },
                ].map((stat, i) => (
                    <div key={i} className="bg-[#12151E] border border-white/5 rounded-2xl p-3 text-center flex flex-col justify-center items-center">
                        <span className={`font-mono font-black text-lg ${stat.highlight ? 'text-[#39FF14]' : 'text-white'}`}>
                            {stat.value}
                        </span>
                        <span className="text-[9px] font-mono text-slate-500 font-bold uppercase mt-0.5">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </section>

            {/* How To Play Cards (1, 2, 3) */}
            <section className="space-y-2.5 pt-1">
                <h2 className="text-xs font-mono text-slate-500 font-bold uppercase tracking-widest px-1">
                    HOW TO PLAY
                </h2>

                <div className="grid grid-cols-3 gap-2.5">
                    {[
                        { step: '1', title: 'Start', desc: 'Tap START to trigger the hidden timer.' },
                        { step: '2', title: 'Stop', desc: 'Halt the timer when target is reached.' },
                        { step: '3', title: 'Rank', desc: 'Lowest Total Error wins the day.' },
                    ].map((item) => (
                        <div key={item.step} className="bg-[#12151E] border border-white/5 rounded-2xl p-3 space-y-1 text-left">
                            <span className="text-[#39FF14] font-mono font-black text-xs block">
                                0{item.step}
                            </span>
                            <h3 className="font-bold text-xs text-white tracking-wide">
                                {item.title}
                            </h3>
                            <p className="text-slate-400 text-[10px] leading-snug">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}