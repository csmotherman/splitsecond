import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ["10.0.0.188"],

    async redirects() {
        return [
            {
                source: "/:path*",
                has: [
                    {
                        type: "host",
                        value: "www.playsplitsecond.com",
                    },
                ],
                destination: "https://playsplitsecond.com/:path*",
                permanent: true,
            },
        ];
    },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
        ],
    },
};

export default nextConfig;
