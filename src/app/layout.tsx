/** biome-ignore-all assist/source/organizeImports: > */
import type React from "react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import GlobalToasts from "@/components/shared/GlobalToasts";
import ThemeProviderWrapper from "@/providers/ThemeProviderWrapper";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Companion - Connect Travelers, Share Adventures",
  description:
    "Discover curated trips, match with like-minded travelers, read authentic reviews, and book secure subscriptions. Travel together, create memories.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#2dd4cf",
  userScalable: true,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased dark:bg-[#000f0f] `}>
        <ThemeProviderWrapper>
          <main>{children}</main>
          <GlobalToasts />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
