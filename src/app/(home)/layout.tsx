import Navbar from "@/components/ui/navbar";
import AuthProvider from "@/context/AuthProvider";
import "../globals.css";
import { Suspense } from "react";
import Loading from "../loading";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      <AuthProvider>
        <Navbar />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </AuthProvider>
    </div>
  );
}
