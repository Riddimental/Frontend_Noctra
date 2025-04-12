import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Temporarily disable for debugging
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
