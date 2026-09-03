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
  experimental: {
    proxyClientMaxBodySize: 50 * 1024 * 1024,
    serverActions: {
      bodySizeLimit: '50mb',
    }
  },
};

export default nextConfig;