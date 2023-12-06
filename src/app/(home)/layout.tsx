import Navbar from "@/components/ui/navbar";
import AuthProvider from "@/context/AuthProvider";
import { Roboto_Condensed } from "next/font/google";
import "../globals.css";
import { Suspense } from "react";

const robotoCondensed = Roboto_Condensed({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={robotoCondensed.className}
    >
      <body className="h-screen">
        <AuthProvider>
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}
