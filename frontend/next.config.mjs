/** @type {import('next').NextConfig} */

constnextConfig = {
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
        hostname: "https://backend-production-42f2.up.railway.app",
      },
    ],
  },
};

export default nextConfig;
