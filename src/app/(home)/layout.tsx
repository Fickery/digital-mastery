import Navbar from "@/components/ui/navbar";
import { Provider } from "@radix-ui/react-toast";
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
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
