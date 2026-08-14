import type { Metadata } from "next";
import { Manrope, Instrument_Serif } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

// Display-only accent face for mixed-typeface headlines (.font-display).
// Body copy and UI labels stay on Manrope.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-instrument",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${instrumentSerif.variable}`}>
      <body className="min-h-screen bg-page text-ink antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <GoogleAnalytics gaId="G-58F9FBFVMS" />
      </body>
    </html>
  );
}
