/** @type {import('next').NextConfig} */

import { withHighlightConfig } from "@highlight-run/next/config";

const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: process.env.MEDUSA_HOSTNAME,
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default withHighlightConfig(nextConfig);
