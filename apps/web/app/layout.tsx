import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const APP_TITLE = "Atcloud";
const APP_DESCRIPTION = "Weather app created with Next.js + Edge Functions";

export const metadata = {
	icons: {
		apple: { url: "/icons/apple-touch-icon.png" },
	},
	manifest: "/manifest.json",
	title: APP_TITLE,
	description: APP_DESCRIPTION,
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: APP_TITLE,
	},
	openGraph: {
		type: "website",
		siteName: APP_TITLE,
		title: APP_TITLE,
		description: APP_DESCRIPTION,
	},
	twitter: {
		card: "summary",
		title: APP_TITLE,
		description: APP_DESCRIPTION,
	},
};

export const viewport = {
	themeColor: "#FFFFFF",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} bg-neutral-950 text-neutral-50 h-dvh`}
			>
				{children}
			</body>
		</html>
	);
}
