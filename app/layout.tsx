import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Atcloud",
  description: "Weather app created with Next.js + Edge Functions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} bg-neutral-950 text-neutral-50 h-full`}>
        {children}
      </body>
    </html>
  );
}
