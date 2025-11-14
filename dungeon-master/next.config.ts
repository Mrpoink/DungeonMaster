import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Allow production builds to succeed even if there are ESLint errors
    ignoreDuringBuilds: true,
  },
  // Silence root inference warning by explicitly setting tracing root
  // (Removed invalid experimental.outputFileTracingRoot; warning is cosmetic.)
  async rewrites() {
    const target = process.env.BACKEND_TARGET || "http://127.0.0.1:1068";
    return [
      {
        source: "/api/:path*",
        destination: `${target}/:path*`,
      },
    ];
  },
};

export default nextConfig;
