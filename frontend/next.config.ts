import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: '../',
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*",
      },
    ];
  },
  serverActions: {
    bodySizeLimit: '50mb',
  },
  experimental: {
    middlewareClientMaxBodySize: 50 * 1024 * 1024,
  },
};

export default nextConfig;