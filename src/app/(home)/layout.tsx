import Navbar from "@/components/ui/navbar";
import AuthProvider from "@/context/AuthProvider";
import { Roboto_Condensed } from "next/font/google";
import "../globals.css";

const robotoCondensed = Roboto_Condensed({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={robotoCondensed.className}>
      <body>
        <AuthProvider>
          <div>
            <Navbar />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
