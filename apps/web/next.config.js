//@ts-check
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
	cacheOnFrontEndNav: true,
	swSrc: "app/sw.ts",
	swDest: "public/sw.js",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
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
