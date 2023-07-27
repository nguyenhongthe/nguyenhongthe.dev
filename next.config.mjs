import { withContentlayer } from "next-contentlayer";
//const { withContentlayer } = require("next-contentlayer");
/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	experimental: {
		appDir: true,
		mdxRs: true,
	},
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
