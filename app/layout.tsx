import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HideOnAdmin from "@/components/HideOnAdmin";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
// Display-only accent face for mixed-typeface headlines (.font-display / .accent).
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
  display: "swap",
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "KRAFT - Web3 Career Learning Centre",
    template: "%s | KRAFT",
  },
  description: "Explore real Web3 roles, test your fit, learn the language, build proof-of-work, and apply with context.",
  keywords: ["web3 careers", "web3 jobs", "proof of work", "career learning", "crypto jobs"],
  icons: {
    icon: "/kraft%20logo%20trans.png",
    shortcut: "/kraft%20logo%20trans.png",
    apple: "/kraft%20logo%20trans.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f7fa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${newsreader.variable}`}>
      <body className="min-h-screen bg-canvas text-ink antialiased">
        <a href="#main" className="skip-link">Skip to content</a>
        <NuqsAdapter>
          <Navbar />
          <main id="main" tabIndex={-1} className="outline-none">{children}</main>
          <HideOnAdmin>
            <Footer />
          </HideOnAdmin>
        </NuqsAdapter>
        <Toaster position="bottom-center" toastOptions={{ className: "!rounded-[14px] !border-border !font-sans" }} />
        <GoogleAnalytics gaId="G-58F9FBFVMS" />
      </body>
    </html>
  );
}
