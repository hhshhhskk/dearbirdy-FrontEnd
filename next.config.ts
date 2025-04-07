import type { NextConfig } from "next";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/auth/kakao",
        destination: "https://dev.dearbirdy.xyz/api/v1/auth/kakao",
      },
    ];
  },
};

export default withPWA(nextConfig);
