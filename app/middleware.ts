import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const IN_APP_BROWSERS = [
    "Instagram",
    "FBAN",
    "FBAV",
    "FB_IAB",
    "Messenger",
    "Snapchat",
    "TikTok",
    "musical_ly",
    "Pinterest",
    "LinkedIn",
    "Twitter",
];

export function middleware(request: NextRequest) {
    const ua = request.headers.get("user-agent") ?? "";

    const isInApp = IN_APP_BROWSERS.some((browser) =>
        ua.includes(browser)
    );

    if (isInApp) {
        return NextResponse.redirect(
            new URL("/open-in-browser", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/login/:path*",
        "/play/:path*",
        "/auth/:path*",
    ],
};