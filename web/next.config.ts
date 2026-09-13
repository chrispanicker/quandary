import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "http://localhost:3333/admin",
      },
      {
        source: "/admin/:path*",
        destination: "http://localhost:3333/admin/:path*",
      },
    ];
  },
};

export default nextConfig;
