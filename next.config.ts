import type { NextConfig } from "next";

const repository = "rest-countries-api";
const isGhPages = process.env["GH_PAGES"] === "true";

const nextConfig: NextConfig = {
	basePath: isGhPages ? `/${repository}` : "",
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "flagcdn.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "upload.wikimedia.org",
				pathname: "/**",
			},
		],
		unoptimized: true,
	},
	output: "export",
	trailingSlash: true,
};

export default nextConfig;
