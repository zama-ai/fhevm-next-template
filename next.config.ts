import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin", // Matched parameters can be used in the value
          },
          {
            key: "Cross-Origin-Embedder-Policy", // Matched parameters can be used in the key
            value: "require-corp",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
