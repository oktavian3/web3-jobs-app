import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: {
    default: "KRAFT - Web3 Career Learning Centre",
    template: "%s | KRAFT",
  },
  description: "Explore real Web3 roles, test your fit, learn the language, build proof-of-work, and apply with context.",
  keywords: ["web3 careers", "web3 jobs", "proof of work", "career learning", "crypto jobs"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="min-h-screen bg-page text-ink antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <GoogleAnalytics gaId="G-58F9FBFVMS" />
      </body>
    </html>
  );
}
