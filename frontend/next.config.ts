import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: '../',
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
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