import type { Metadata } from "next";
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
      <body className="bg-stone-100 font-texts">
        {children}
      </body>
    </html>
  );
}
