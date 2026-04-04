import { useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { io, Socket } from "socket.io-client";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";
import {
  setSocketActive,
  setShareDelay,
  setSocketHost,
  setSocketGuest,
  setGameGrid,
  setChangeFromSocket,
  setPhaseTwo,
  setSelectedSqr
  } from "@/state/board/boardSlice";
import { Grid, SelectedSquare } from "@/types/board";


export const useSocket = () => {
  const { data: session } = useSession();
  const socketRef = useRef<Socket | null>(null);
  const hasJoined = useRef(false);
  const {
    id,
    socketActive,
    gameGrid,
    selectedSqr,
    phaseTwo,
    changeFromSocket,
    socketGuest
  }  = useAppSelector(state => state.board);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const gameId = searchParams.get('id') ?? '';
  const roomId = searchParams.get('room') ?? '';

  useEffect(() => {
    if (!hasJoined.current) {
      if (roomId) {
        hasJoined.current = true;
        gJoinsGameRoom(roomId, 'visitor');
      }
    }
  }, []);

  useEffect(() => {
    const identifier = gameId || roomId;

    if(socketActive && !changeFromSocket){
      pSendsMove(identifier)
    }
  }, [gameGrid]);
  
  useEffect(() => {
    if(session?.user.username && roomId) {
      dispatch(setSocketGuest(session?.user.username))
      gSendsUserName(roomId, session?.user.username); 
    }
  }, [session]);

  // only one socket
  const initSocket = () => {
    if (!socketRef.current) {
      const socket = io("http://localhost:3001");
      
      // Socket Listeners

      // Only received by host because .to
      socket.on("g-joined-game-room", (guestName: string) => {
        dispatch(setSocketGuest(guestName));
        alert('The guest player has joined the game.')
        socket.emit('h-shares-board', id, session?.user.username, gameGrid);
      });
      
      socket.on("g-sent-user-name", (guestName: string) => {
        dispatch(setSocketGuest(guestName));
      });
      
      socket.on("g-left-game-room", (guestName: string) => {
        if (!roomId) {
          alert(`The guest ${guestName} has left the game.`)
          dispatch(setSocketGuest('waiting'));
        }
      });
      
      socket.on("h-deleted-game-room", () => {
        if (!gameId) {
          alert(`The host has finished the game session. You'll be redirected to the home page.`)
          setTimeout(() => {
            router.push('/');
          }, 5000)
        }
      });
      
      // Only received by guest because .to
      socket.on("h-shared-board", (hostName: string, board: Grid) => {
        dispatch(setSocketGuest('visitor'));
        dispatch(setSocketHost(hostName));
        dispatch(setGameGrid(board));
        dispatch(setSocketActive(true));
        // ojo loading
      });
      
      // Only received by guest because .to
      socket.on("p-sent-move", (board: Grid, phase: boolean, selected: SelectedSquare) => {
        dispatch(setChangeFromSocket(true));
        dispatch(setGameGrid(board));
        dispatch(setPhaseTwo(phase));
        dispatch(setSelectedSqr(selected));
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

  // used by guest
  const gJoinsGameRoom = (boardIdRoom: string, guestName: string) => {
    initSocket();
    if (socketRef.current === null) return

    const emitJoin = () => {
      socketRef.current?.emit('g-joins-game-room', boardIdRoom, guestName);
      dispatch(setSocketActive(true));
    };

    if (socketRef.current?.connected) {
      emitJoin();
    } else {
      socketRef.current?.once("connect", emitJoin);
    }
  }

  // used by guest
  const gLeavesGameRoom = () => {
    const answer = window.confirm('Are you sure you want to leave the current game?');
    if (!answer) return

    socketRef.current?.emit('g-leaves-game-room', roomId, socketGuest);
    // socketRef.current?.disconnect();
    alert('You have left the game. You will be redirected to the home page.');
    router.push('/');
  }

  // used by guest
  const gSendsUserName = (boardIdRoom: string, guestName: string) => {
    socketRef.current?.emit('g-sends-user-name', boardIdRoom, guestName);
  }

  const pSendsMove = (boardIdRoom: string) => {
    socketRef.current?.emit(
      'p-sends-move',
      boardIdRoom,
      JSON.stringify(gameGrid),
      phaseTwo,
      JSON.stringify(selectedSqr));
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
    gLeavesGameRoom
  }
};