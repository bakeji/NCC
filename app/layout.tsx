import type { Metadata } from "next";
import {  Figtree, Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import "./globals.css"

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={`${figtree.variable} antialiased`}
      >
        {children}
       <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
