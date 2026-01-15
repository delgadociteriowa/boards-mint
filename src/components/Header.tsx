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
    const gameRoutes = ['/chess', '/checkers'];

    if (!gameRoutes.includes(pathname)) {
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