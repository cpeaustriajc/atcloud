//@ts-check

import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swDest: "public/sw.js",
  swSrc: "app/sw.ts",
  cacheOnNavigation: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: "incremental",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openweathermap.org",
        pathname: "/img/wn/**",
      },
    ],
  },
};

export default withSerwist(nextConfig);
