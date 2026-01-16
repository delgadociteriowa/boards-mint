'use client';
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/state/hooks";
import { closeGame } from "@/state/board/boardSlice";
import Navigation from "./Navigation";

const Header = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isGameRoute =
    pathname.startsWith('/chess') ||
    pathname.startsWith('/checkers');

    if (!isGameRoute) {
      dispatch(closeGame());
    }
  }, [pathname, dispatch]);

  return (
    <header>
      <Navigation/>
    </header>
  )
};

export default Header;