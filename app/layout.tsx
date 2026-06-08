import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});
import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://usekraft.xyz'),
  title: { default: 'KRAFT — Build Your Web3 Career', template: '%s | KRAFT' },
  description: 'Explore Web3 roles, test your skills, build a roadmap, practice interviews, and find trusted job boards.',
  keywords: ['web3 jobs', 'blockchain careers', 'crypto jobs', 'career roadmap', 'web3 education'],
  openGraph: { title: 'KRAFT — Build Your Web3 Career', description: 'Know what the work takes before you apply.', url: 'https://usekraft.xyz', siteName: 'KRAFT', type: 'website' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-background text-foreground min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
    <html lang="en">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <div className="flex min-h-screen flex-col"><Navbar /><main className="flex-1">{children}</main><Footer /></div>
        <GoogleAnalytics gaId="G-58F9FBFVMS" />
      </body>
    </html>
  );
}
