import type { NextConfig } from "next";
import { legacyRedirects } from "./src/lib/legacy-redirects";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "@react-three/fiber"],
  async redirects() {
    return legacyRedirects();
  },
};

export default nextConfig;
