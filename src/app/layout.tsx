import type { Metadata } from "next";
import BoardState from "@/context/board/BoardState";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: "BOARDS",
  description: "Play classic board games now",
  icons: {
    icon: '/chess.svg',
  }
};

const RootLayout = ({ children }: Readonly<{children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <BoardState>
        <body className="bg-stone-100 font-texts">
          {children}
          <Analytics />
        </body>
      </BoardState>
    </html>
  );
}

export default RootLayout;
