import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://usekraft.xyz"),
  title: {
    default: "KRAFT — Learn the Work Before the Title",
    template: "%s | KRAFT",
  },
  description:
    "A practical Web3 career course to understand roles, build proof-of-work, prepare for interviews, and apply with context.",
  keywords: [
    "web3 jobs",
    "blockchain careers",
    "crypto jobs",
    "career roadmap",
    "web3 education",
  ],
  openGraph: {
    title: "KRAFT — Learn the Work Before the Title",
    description: "Learn the work, build proof-of-work, and apply with context.",
    url: "https://usekraft.xyz",
    siteName: "KRAFT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <SiteChrome>{children}</SiteChrome>
        <GoogleAnalytics gaId="G-58F9FBFVMS" />
      </body>
    </html>
  );
}
