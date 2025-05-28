import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/proxy/worldvectorlogo/:path*",
        destination: "https://worldvectorlogo.com/:path*",
      },
    ];
  },
  images: {
    domains: [
      "images.unsplash.com",
      "content.rozetka.com.ua",
      "content1.rozetka.com.ua",
      "content2.rozetka.com.ua",
      "content3.rozetka.com.ua",
    ],
  },
};

export default nextConfig;
