import { useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { io, Socket } from "socket.io-client";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import {
  setSocketActive,
  setShareDelay,
  setSocketHost,
  setSocketGuest
  } from "@/state/board/boardSlice";

export const useSocket = () => {
  const { data: session } = useSession();
  const socketRef = useRef<Socket | null>(null);
  const {
    id,
    socketActive,
    gameGrid,
    phaseTwo
  }  = useAppSelector(state => state.board);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if(socketActive && !phaseTwo){
      console.log('GRID:', gameGrid);
      socketRef.current?.emit("send-move", id, JSON.stringify(gameGrid))
    }
  }, [gameGrid]);
  
  const handleShare = () => {
    dispatch(setShareDelay(true));
    if (!socketActive) {
      // se conecta
      socketRef.current = io("http://localhost:3001");
      
      // si hubo un error
      socketRef.current.on("connect_error", (err) => {
        console.log("There was an error:", err.message);
        alert("There was a connection error. Please, try again.");
        socketRef.current?.removeAllListeners(); // en duda
        dispatch(setSocketActive(false));
        setTimeout(() => {
          dispatch(setShareDelay(false));
        }, 800);
      });

      // Si todo va bien
      socketRef.current.on("connect", () => {
        socketRef.current?.emit('game-room', id);
        dispatch(setSocketActive(true));
        dispatch(setSocketHost(session?.user.username ?? ''));
        dispatch(setSocketGuest('waiting'));
        setTimeout(() => {
          dispatch(setShareDelay(false));
        }, 800);
      });    
    } else {
      // Al desconectarse
      socketRef.current?.disconnect();
      socketRef.current?.removeAllListeners();
      dispatch(setSocketActive(false));
      setTimeout(() => {
        dispatch(setShareDelay(false));
      }, 800);
    }
  };

  return {
    handleShare
  }
}; 