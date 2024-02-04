//@ts-check

const withSerwist = require("@serwist/next").default({
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

module.exports = withSerwist(nextConfig);
