import type { Metadata } from "next";
import BoardState from "@/context/board/BoardState";
import "./globals.css";
// import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: "BOARDS | Virtual board games online",
  description: "Play classic board games now",
  icons: {
    icon: '/chess.svg',
  },
  keywords: [
    "classic games",
    "online chess",
    "online checkers",
    "virtual board games",
    "play chess",
    "play checkers",
    "free board games",
    "multiplayer chess",
    "chess app",
    "checkers app",
    "chess",
    "checkes"
  ],
  authors: [{ name: "Carlos Delgado", url: "https://delgadociteriowa.github.io/main/" }]
};

// const RootLayout = ({ children }: Readonly<{children: React.ReactNode }>) => {
const RootLayout = () => {
  return (
    <html lang="en">
      <BoardState>
        <body className="bg-stone-100 font-texts">
          {/* {children}
          <Analytics /> */}
          <h1>we&apos;ll be back soon</h1>
        </body>
      </BoardState>
    </html>
  );
}

export default RootLayout;
