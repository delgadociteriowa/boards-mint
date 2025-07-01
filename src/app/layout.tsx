import type { Metadata } from "next";
import { GlobalProvider } from "@/context/GlobalContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "BOARDS",
  description: "Play classic board games now",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GlobalProvider>
      <body className="bg-stone-100 font-texts">
        {children}
      </body>
      </GlobalProvider>
    </html>
  );
}
