import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {}
    }
  },
  staticPageGenerationTimeout: 60,
};

export default nextConfig;
