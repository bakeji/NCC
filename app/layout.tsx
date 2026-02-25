import type { Metadata } from "next";
import {  Figtree,  } from "next/font/google";
import "./globals.css";



const figtree = Figtree({
  weight: ['400', '500', '700'],
  subsets: ["latin"],
  variable: '--font-figtree',
});

export const metadata: Metadata = {
  title: "New Covenant Church, Ifako",
  description: "New covenant church, ifako website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figtree.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
