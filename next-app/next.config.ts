import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // Force Turbopack to treat next-app as the root
    root: __dirname,
  },
};

export default nextConfig;
