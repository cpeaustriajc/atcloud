import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  variable: '--font-inter',
  display: 'swap',
  subsets: ['latin'],
});

export const metadata = {
  title: "Tenki",
  icons: {
    icon: "/favicon.ico",
  },
};

type Props = {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50">
        {children}
      </body>
    </html>
  );
}
