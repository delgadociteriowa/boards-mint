import { useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { io, Socket } from "socket.io-client";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import {
  setSocketActive,
  setShareDelay,
  setSocketHost,
  setSocketGuest,
  setGameGrid
  } from "@/state/board/boardSlice";
import { Grid } from "@/types/board";


export const useSocket = () => {
  const { data: session } = useSession();
  const socketRef = useRef<Socket | null>(null);
  const hasJoined = useRef(false);

  const {
    id,
    socketActive,
    gameGrid,
    phaseTwo,
  }  = useAppSelector(state => state.board);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const room = params.get("room") ?? '';
    const identifier = id ? id : room;

    if(socketActive && !phaseTwo){
      socketRef.current?.emit("send-move", identifier, JSON.stringify(gameGrid))
    }
  }, [gameGrid]);

  useEffect(() => {
    if (!hasJoined.current) {
      const params = new URLSearchParams(window.location.search);
      const room = params.get("room") ?? '';
      if (room) {
        hasJoined.current = true;
        guestJoinsGameRoom(room, session?.user.username ?? 'visitor')
      }
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  // only one socket
  const initSocket = () => {
    if (!socketRef.current) {
      const socket = io("http://localhost:3001");
      
      // Socket Listeners

      // Only received by host because .to
      socket.on("guest-joined-game-room", (guestName: string) => {
        dispatch(setSocketGuest(guestName));
        socket.emit('host-shares-board', id, session?.user.username, gameGrid);
      });
      
      // Only received by guest because .to
      socket.on("host-shared-board", (hostName: string, board: Grid) => {
        dispatch(setSocketGuest(session?.user.username || 'visitor'));
        dispatch(setSocketHost(hostName));
        dispatch(setGameGrid(board));
        dispatch(setSocketActive(true));
        // ojo loading
      });
      
      // sents separados. Verificar error pieza obscura y error stop sharing que debería estar cancelado en step 2.
      socket.on("sent-move", (board: Grid) => {
        dispatch(setGameGrid(board));
      });

      socketRef.current = socket;
    }
    return socketRef.current;
  };
  
  // used by host
  const hCreatesGameRoom = () => {
    dispatch(setShareDelay(true));
    
    // connects
    initSocket();
    if (socketRef.current === null) return

    // OK
    socketRef.current.on("connect", () => {
      socketRef.current?.emit('h-creates-game-room', id);
      dispatch(setSocketActive(true));
      dispatch(setSocketHost(session?.user.username ?? ''));
      dispatch(setSocketGuest('waiting'));
      setTimeout(() => {
        dispatch(setShareDelay(false));
      }, 800);
      
      const shareLink = window.location.href.replace('?id', '?room');
      navigator.clipboard.writeText(shareLink).then(() => {
        alert('The session link has been copied to your clipboard! Share it to start playing online.')
      });
    });
    
    // error
    socketRef.current.on("connect_error", (err) => {
      connectionError(err.message, "The room couldn't be created due to a connection error. Please, try again.")
    });
  }

  // used by guest
  const guestJoinsGameRoom = (boardIdRoom: string, guestName: string) => {
    const socket = initSocket();

    const emitJoin = () => {
      socket.emit('guest-joins-game-room', boardIdRoom, guestName);
      dispatch(setSocketActive(true));
    };

    if (socket.connected) {
      emitJoin();
    } else {
      socket.once("connect", emitJoin);
    }
  }

  // used by host
  const hDeletesGameRoom = () => {
    const answer = window.confirm('Are you sure you want to finish the game session?');

    if (!answer) return

    dispatch(setShareDelay(true));
    socketRef.current?.emit('h-deletes-game-room', id);
    socketRef.current?.disconnect();
    socketRef.current = null;
    dispatch(setSocketActive(false));

    alert('The online game session has ben finished.')

    setTimeout(() => {
      dispatch(setShareDelay(false));
    }, 800);
  }

  const connectionError = (errorMessage: string, message: string) => {
    console.log("There was an error:", errorMessage);
    alert(message);
    socketRef.current?.disconnect();
    socketRef.current = null;
    dispatch(setSocketActive(false));
    setTimeout(() => {
    dispatch(setShareDelay(false));
    }, 800);
  }

  return {
    hCreatesGameRoom,
    hDeletesGameRoom,
    guestJoinsGameRoom
  }
};