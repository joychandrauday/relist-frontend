import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dklikxmpm/**",
      },
      {
        protocol: "https",
        hostname: "www.freepnglogos.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
