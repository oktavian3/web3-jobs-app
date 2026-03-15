import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Web3 Jobs Education - Know What You're Applying For",
  description: "Learn about web3 job roles, skills, and how to transition from Web2 to Web3",
  keywords: ["web3", "jobs", "blockchain", "crypto", "careers", "education"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0f0f0f] text-[#f5f5f5] min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
