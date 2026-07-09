import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";

interface HeaderProps {
    isLoggedIn: boolean;
    displayName?: string | null;
    avatarUrl?: string | null;
}

export default function Header({ isLoggedIn, displayName, avatarUrl }: HeaderProps) {
    const initials = displayName
        ? displayName
            .split(" ")
            .map((part) => part[0])
            .join("")
            .substring(0, 2)
            .toUpperCase()
        : null;

    return (
        <header className="mb-8 flex items-center justify-between">
            <Link href="/" className="group">
                <h1 className="font-college text-4xl text-white tracking-wider">
                    SPLIT<span className="text-[#39FF14] drop-shadow-[0_0_12px_rgba(57,255,20,0.5)]">SECOND</span>
                </h1>
                <p className="mt-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
                    Daily Timer Challenge
                </p>
            </Link>

            <Link
                href={isLoggedIn ? "/profile" : "/login"}
                className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] font-mono text-xs font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-[#39FF14]/50 hover:bg-[#39FF14]/10 active:scale-95"
                aria-label={isLoggedIn ? "View Profile" : "Log In"}
            >
                {isLoggedIn ? (
                    avatarUrl ? (
                        <Image
                            src={avatarUrl}
                            alt={displayName ?? "User avatar"}
                            fill
                            className="object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : initials ? (
                        <span className="text-[#39FF14]">{initials}</span>
                    ) : (
                        <User className="h-5 w-5 text-[#39FF14]" />
                    )
                ) : (
                    <User className="h-5 w-5 text-slate-400 transition-colors group-hover:text-[#39FF14]" />
                )}
            </Link>
        </header>
    );
}