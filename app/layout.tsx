import "../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

const metadata_base = process.env.NEXT_PUBLIC_METADATA_BASE;
const metadata_canonical = process.env.NEXT_PUBLIC_METADATA_CANONICAL;

export const metadata: Metadata = {
	title: {
		default: "Nguyen Hong The Dev",
		template: "%s | nguyenhongthe.dev",
	},
	description: "Programmer, Web Developer, Trader, Blogger, Writer at vietdev.com and founder of vnspring.com",
	metadataBase: new URL(metadata_base || "/"),
	alternates: {
		canonical: metadata_canonical,
		languages: {
			"en-US": "/en-US",
			"vi-VN": "/vi",
		},
	},
	openGraph: {
		title: "Nguyen Hong The Dev",
		description:
			"Programmer, Web Developer, Trader, Blogger, Writer at vietdev.com and founder of vnspring.com",
		url: "https://nguyenhongthe.dev",
		siteName: "Nguyen Hong The Dev",
		images: [
			{
				url: "https://nguyenhongthe.net/content/images/2020/05/hacking-2.png",
				width: 1920,
				height: 1080,
			},
		],
		locale: "en-US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: "Nguyen Hong The Dev",
		card: "summary_large_image",
	},
	icons: {
		shortcut:
			"https://nguyenhongthe.net/content/images/size/w256h256/2020/05/favicon-1.png",
	},
};
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const calSans = LocalFont({
	src: "../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
			<head>
				<Analytics />
				<title>Nguyen Hong The Dev</title>
			</head>
			<body
				className={`bg-black ${
					process.env.NODE_ENV === "development" ? "debug-screens" : undefined
				}`}
			>
				{children}
			</body>
		</html>
	);
}
