import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://allanroy.tech'),
  title: {
    default: "Allan Roy | Cybersecurity Engineer & Developer",
    template: "%s | Allan Roy"
  },
  description: "Portfolio of Allan Roy - Cybersecurity Engineer, Full Stack Developer, and AI SaaS Builder.",
  keywords: ["Allan Roy", "Cybersecurity Engineer", "Full Stack Developer", "AI Developer", "Software Engineer", "Portfolio"],
  authors: [{ name: "Allan Roy", url: "https://allanroy.tech" }],
  creator: "Allan Roy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://allanroy.tech",
    title: "Allan Roy | Cybersecurity Engineer & Developer",
    description: "Portfolio of Allan Roy - Cybersecurity Engineer, Full Stack Developer, and AI SaaS Builder.",
    siteName: "Allan Roy Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Allan Roy | Cybersecurity Engineer & Developer",
    description: "Portfolio of Allan Roy - Cybersecurity Engineer, Full Stack Developer, and AI SaaS Builder.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Allan Roy",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground relative selection:bg-accent selection:text-white">
        <div className="bg-grain"></div>
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main className="flex-grow">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
