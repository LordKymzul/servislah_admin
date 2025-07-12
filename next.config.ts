import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    PYTHON_GATEWAY_URL: process.env.PYTHON_GATEWAY_URL,
    GOLANG_SERVER_URL: process.env.GOLANG_SERVER_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  },
};

export default nextConfig;
