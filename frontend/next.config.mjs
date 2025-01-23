import { withHighlightConfig } from "@highlight-run/next/config";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: process.env.MEDUSA_HOSTNAME,
        pathname: "/**",
      },
    ],
  },
};

export default withHighlightConfig(nextConfig);
