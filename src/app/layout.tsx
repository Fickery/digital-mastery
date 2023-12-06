import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const robotoCondensed = Roboto_Condensed({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "(WIP) Digital Mastery",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={robotoCondensed.className}
    >
      <body>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  );
}
