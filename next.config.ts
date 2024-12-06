/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";
const localDomains = [
	{
		hostname: "localhost",
	},
	{
		hostname: "127.0.0.1",
	},
	{
		hostname: "192.168.2.7",
	},
];
const prodDomains = [
	{
		hostname: "static.vnscdn.com",
	},
	{
		hostname: "media.vnscdn.com",
	},
	{
		hostname: "cdn.nguyenhongthe.dev",
	},
];

const nextConfig = {
	reactStrictMode: true,
	trailingSlash: true,
	assetPrefix: isProd ? "https://cdn.nguyenhongthe.dev" : "",
	images: {
		remotePatterns: isProd ? prodDomains : localDomains,
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});
		return config;
	},
};

module.exports = nextConfig;
