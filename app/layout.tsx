import type { Metadata } from "next";
import localFont from "next/font/local";
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import "./globals.css";
import Navbar from "@/components/Navbar";
import { DataProvider } from '@/providers/DataContext';
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DARS Visualizer",
  description: "Organize your DARS reports.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white flex flex-col min-h-screen`}
      >
        <DataProvider>
          <Navbar/>
          <main className="flex-grow">
            {children}
          </main>
          <Footer/>
          <Analytics/>
        </DataProvider>
      </body>
    </html>
  );
}
