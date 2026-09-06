import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LMS PPG - Company Profile & Learning Management",
  description: "PT. Performa Puncak Group - Sistem Manajemen Pembelajaran (LMS) dan Company Profile",
  icons: {
    icon: '/ppg-logo.jpg',
    shortcut: '/ppg-logo.jpg',
    apple: '/ppg-logo.jpg',
  },
};

import Providers from "./Providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
      style={{ colorScheme: 'light' }}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
