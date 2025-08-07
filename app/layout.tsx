import type { Metadata } from "next";
import { Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";

const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Code Trail",
	description: "Code Trail is a platform to track your coding journey",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${montserrat.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>
					{children}
				</Providers>
				<Toaster />
			</body>
		</html>
	);
}
