"use client";

import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";

interface HeaderProps {
    isLoggedIn: boolean;
    displayName?: string | null;
    avatarUrl?: string | null;
}

export default function Header({
    isLoggedIn,
    displayName,
    avatarUrl,
}: HeaderProps) {
    const initials = displayName
        ? displayName
            .split(" ")
            .map(part => part[0])
            .join("")
            .substring(0, 2)
            .toUpperCase()
        : null;

    return (
        <header className="flex items-start justify-between py-2">
            <Link href="/" className="group">
                <h1 className="font-college text-3xl leading-none tracking-wider text-white md:text-4xl">
                    SPLIT
                    <span className="text-[#39FF14] drop-shadow-[0_0_10px_rgba(57,255,20,0.45)]">
                        SECOND
                    </span>
                </h1>

                <p className="mt-1 font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-slate-400">
                    Daily Timer Challenge
                </p>
            </Link>

            <Link
                href={
                    isLoggedIn
                        ? "/profile"
                        : "/login"
                }
                aria-label={
                    isLoggedIn
                        ? "View Profile"
                        : "Log In"
                }
                className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] text-white backdrop-blur-md transition-all duration-300 hover:border-[#39FF14]/50 hover:bg-[#39FF14]/10 active:scale-95"
            >
                {isLoggedIn ? (
                    avatarUrl ? (
                        <Image
                            src={avatarUrl}
                            alt={
                                displayName ??
                                "User avatar"
                            }
                            fill
                            className="rounded-xl object-cover"
                        />
                    ) : initials ? (
                        <span className="text-sm font-black text-[#39FF14]">
                            {initials}
                        </span>
                    ) : (
                        <User className="h-5 w-5 text-[#39FF14]" />
                    )
                ) : (
                    <User className="h-5 w-5 text-slate-400 transition-colors hover:text-[#39FF14]" />
                )}
            </Link>
        </header>
    );
}