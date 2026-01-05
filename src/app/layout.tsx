import type { Metadata } from "next";
import BoardState from "@/context/board/BoardState";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import AuthProvider from "@/components/AuthProvider";

import { Provider } from "react-redux";
import store from "@/redux/store";

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

const RootLayout = ({ children }: Readonly<{children: React.ReactNode }>) => {
  return (
    <AuthProvider>
      <html lang="en">
        <Provider store={store}>
        <BoardState>
          <body className="bg-stone-100 font-texts">
            {children}
            <Analytics />
          </body>
        </BoardState>
        </Provider>
      </html>
    </AuthProvider>
  );
}

export default RootLayout;
