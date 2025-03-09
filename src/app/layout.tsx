import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";

import { ThemeProvider } from "@/contexts/theme-context";

import Header from "@/components/header";
import "@/styles/globals.scss";

const nunitoSans = Nunito_Sans({
	variable: "--font-nunito-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "REST Countries API",
	description: "A simple app to display information about countries",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={nunitoSans.variable}>
				<ThemeProvider>
					<Header />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
