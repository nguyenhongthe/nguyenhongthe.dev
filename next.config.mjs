import { withContentlayer } from "next-contentlayer";
const isProd = process.env.NODE_ENV === "production";
const domain = process.env.NEXT_PUBLIC_METADATA_BASE || "nguyenhongthe.dev";

const images = {
	domains: [
		"localhost",
		"127.0.0.1",
		`media.${domain}`,
		`static.${domain}`,
		"nguyenhongthe.net",
	],
};

const nextConfig = {
	reactStrictMode: true,
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	experimental: {
		// appDir: true,
		mdxRs: true,
	},
	trailingSlash: true,
	// assetPrefix: isProd ? `https://cdn.${domain}` : undefined,
	async redirects() {
		return [
			{
				// does not add /docs since basePath: false is set
				source: "/knowledge/cai-dat-xampp-tren-windows",
				destination: "https://nguyenhongthe.net/cai-dat-xampp-tren-windows/",
				basePath: false,
				permanent: true,
			},
			{
				// does not add /docs since basePath: false is set
				source: "/knowledge/cai-dat-ssl-cho-xampp-tren-windows",
				destination:
					"https://nguyenhongthe.net/cai-dat-ssl-cho-xampp-tren-windows/",
				basePath: false,
				permanent: true,
			},
		];
	},
};

export default withContentlayer(nextConfig);
