import {
  setChangeFromSocket,
  setGameGrid,
  setPhaseTwo,
  setSelectedSqr,
  setShareDelay,
  setSocketActive,
  setSocketGuest,
  setSocketHost,
} from '@/state/board/boardSlice';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { Grid, SelectedSquare } from '@/types/board';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';

type CreateGameRoomResult = {
  clipboardCopied: boolean;
};

export const useSocket = () => {
  const { data: session } = useSession();
  const socketRef = useRef<Socket | null>(null);
  const hasJoined = useRef(false);
  const notAllowed = useRef(false);

  const {
    id,
    socketActive,
    gameGrid,
    selectedSqr,
    phaseTwo,
    changeFromSocket,
    socketGuest,
    socketHost,
  } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const gameId = searchParams.get('id') ?? '';
  const roomId = searchParams.get('room') ?? '';

  useEffect(() => {
    if (!hasJoined.current) {
      if (roomId) {
        hasJoined.current = true;
        dispatch(setSocketGuest(session?.user.username || 'visitor'));
        gJoinsGameRoom(roomId, session?.user.username || 'visitor');
      }
    }
  }, []);

  useEffect(() => {
    const identifier = gameId || roomId;

    if (socketActive && !changeFromSocket) {
      pSendsMove(identifier);
    }
  }, [gameGrid]);

  useEffect(() => {
    if (session?.user.username && roomId) {
      dispatch(setSocketGuest(session?.user.username));
      gSendsUserName(roomId, session?.user.username);
    }
  }, [roomId, session?.user.username]);

  useEffect(() => {
    return () => {
      if (notAllowed.current) {
        socketRef.current?.disconnect();
        socketRef.current = null;
        return;
      }

      if (roomId) {
        socketRef.current?.emit('g-leaves-game-room', roomId, socketGuest);
        socketRef.current?.disconnect();
        socketRef.current = null;
      }

      if (gameId) {
        socketRef.current?.emit('h-deletes-game-room', gameId);
        socketRef.current?.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const initSocket = () => {
    if (!socketRef.current) {
      const socket = io('https://boards-ws.onrender.com');

      // Socket Listeners

      // Only received by host because .to
      socket.on('g-joined-game-room', (guestName: string) => {
        if (!roomId) toast.success('The guest player has joined the game.');
        dispatch(setSocketGuest('visitor'));
        socket.emit('h-shares-board', id, session?.user.username, gameGrid);
      });

      socket.on('g-sent-user-name', (guestName: string) => {
        dispatch(setSocketGuest(guestName));
      });

      socket.on('g-left-game-room', () => {
        if (!roomId) {
          toast.warning('The guest player has left the game.');
          dispatch(setSocketGuest('waiting'));
        }
      });

      socket.on('h-deleted-game-room', () => {
        if (!gameId) {
          toast.warning(
            `The host has finished the game session. You'll be redirected to the home page.`,
          );
          setTimeout(() => {
            router.push('/');
          }, 5000);
        }
      });

      // Only received by guest because .to
      socket.on('h-shared-board', (hostName: string, board: Grid) => {
        dispatch(setSocketHost(hostName));
        dispatch(setGameGrid(board));
        dispatch(setSocketActive(true));
        toast.success(`Welcome to Boards. You have joined the game room.`);
        // ojo loading
      });

      // Only received by guest because .to
      socket.on(
        'p-sent-move',
        (board: Grid, phase: boolean, selected: SelectedSquare) => {
          dispatch(setChangeFromSocket(true));
          dispatch(setGameGrid(board));
          dispatch(setPhaseTwo(phase));
          dispatch(setSelectedSqr(selected));
        },
      );

      socket.on('p-disconnected', () => {
        if (gameId) {
          toast.warning(`The guest player has left the game.`);
          dispatch(setSocketGuest('waiting'));
        }
        if (roomId) {
          toast.warning(
            `The host is no longer connected to the game. You'll be redirected to the home page.`,
          );
          setTimeout(() => {
            router.push('/');
          }, 5000);
        }
      });

      socketRef.current = socket;
    }
    return socketRef.current;
  };

  // used by host
  const hCreatesGameRoom = (setToastState: (value: boolean) => void) => {
    if (!id) {
      toast.warning('Warning', {
        description: 'You must save this board to start an online game.',
      });
      return;
    }
    setToastState(true);
    const toastId = toast('Online room', {
      description:
        'You are about to start an online room. Do you want to continue?',
      duration: Infinity,
      action: {
        label: 'continue',
        onClick: async () => {
          toast.dismiss(toastId);
          setToastState(true); // important

          const promise = createGameRoom(id);

          await toast.promise(promise, {
            loading: 'Creating online room...',
            success: ({ clipboardCopied }) =>
              clipboardCopied
                ? 'Online room created! The game room link has been copied to your clipboard! Share it to start playing online.'
                : 'Online room created! Share it to start playing online.',
            error:
              "The room couldn't be created now. Please, try again in a few seconds.",
          });

          setToastState(false);
        },
      },
      cancel: {
        label: 'cancel',
        onClick: () => {
          toast.dismiss(toastId);
          setToastState(false);
        },
      },
    });
  };

  const createGameRoom = (boardId: string): Promise<CreateGameRoomResult> => {
    return new Promise((resolve, reject) => {
      dispatch(setShareDelay(true));

      // connects
      initSocket();
      if (socketRef.current === null) {
        dispatch(setShareDelay(false));
        reject(new Error('Socket inialization failed.'));
        return;
      }

      // OK
      socketRef.current.on('connect', async () => {
        socketRef.current?.emit('h-creates-game-room', boardId);
        dispatch(setSocketActive(true));
        dispatch(setSocketHost(session?.user.username ?? ''));
        dispatch(setSocketGuest('waiting'));

        setTimeout(() => {
          dispatch(setShareDelay(false));
        }, 800);

        const shareLink = window.location.href.replace('?id', '?room');

        let clipboardCopied = false;
        try {
          await navigator.clipboard.writeText(shareLink);
          clipboardCopied = true;
        } catch {
          clipboardCopied = false;
        }

        resolve({ clipboardCopied });
      });

      // error
      socketRef.current.on('connect_error', (err) => {
        dispatch(setShareDelay(false));
        reject(
          new Error(
            err?.message ||
              "The room coudn't be created now. Please, try again in a few seconds.",
          ),
        );
        return;
      });
    });
  };

  // used by host
  const hDeletesGameRoom = (setToastState: (value: boolean) => void) => {
    setToastState(true);
    const toastId = toast('End online room', {
      description: 'Do you want to stop sharing this game room?',
      duration: Infinity,
      action: {
        label: 'continue',
        onClick: async () => {
          toast.dismiss(toastId);
          setToastState(true); // important

          dispatch(setShareDelay(true));
          socketRef.current?.emit('h-deletes-game-room', id);
          socketRef.current?.disconnect();
          socketRef.current = null;
          dispatch(setSocketActive(false));

          toast.success('You have stopped sharing this game room.');

          setTimeout(() => {
            dispatch(setShareDelay(false));
          }, 800);

          setToastState(false);
        },
      },
      cancel: {
        label: 'cancel',
        onClick: () => {
          toast.dismiss(toastId);
          setToastState(false);
        },
      },
    });
  };

  // used by guest
  const gJoinsGameRoom = (boardIdRoom: string, guestName: string) => {
    initSocket();
    if (socketRef.current === null) return;

    const emitJoin = () => {
      socketRef.current?.emit(
        'g-joins-game-room',
        boardIdRoom,
        guestName,
        (response: { success: boolean; message?: string }) => {
          if (!response.success) {
            toast.error(response.message);
            notAllowed.current = true;
            router.push('/');
          }
          dispatch(setSocketActive(true));
        },
      );
    };

    if (socketRef.current?.connected) {
      emitJoin();
    } else {
      socketRef.current?.once('connect', emitJoin);
    }
  };

  // used by guest
  const gLeavesGameRoom = (setToastState: (value: boolean) => void) => {
    setToastState(true);
    const toastId = toast('Leave online room', {
      description: 'Are you sure you want to leave the current game?',
      duration: Infinity,
      action: {
        label: 'continue',
        onClick: async () => {
          toast.dismiss(toastId);
          setToastState(true); // important

          socketRef.current?.emit('g-leaves-game-room', roomId, socketGuest);
          socketRef.current?.disconnect();
          toast.warning(
            'You have left the game. You will be redirected to the home page.',
          );
          setTimeout(() => {
            router.push('/');
          }, 4000);

          setToastState(false);
        },
      },
      cancel: {
        label: 'cancel',
        onClick: () => {
          toast.dismiss(toastId);
          setToastState(false);
        },
      },
    });
  };

  // used by guest
  const gSendsUserName = (boardIdRoom: string, guestName: string) => {
    socketRef.current?.emit('g-sends-user-name', boardIdRoom, guestName);
  };

  const pSendsMove = (boardIdRoom: string) => {
    socketRef.current?.emit(
      'p-sends-move',
      boardIdRoom,
      JSON.stringify(gameGrid),
      phaseTwo,
      JSON.stringify(selectedSqr),
    );
  };

  // player goes to other page
  const pLeavesGameRoom = () => {
    if (gameId) {
      socketRef.current?.emit('h-deletes-game-room', id);
      socketRef.current?.disconnect();
      socketRef.current = null;
      dispatch(setSocketActive(false));
    }
    if (roomId) {
      socketRef.current?.emit('g-leaves-game-room', roomId, socketGuest);
    }
  };

  const connectionError = (errorMessage: string, message: string) => {
    console.log(errorMessage);
    alert(message);
    socketRef.current?.disconnect();
    socketRef.current = null;
    dispatch(setSocketActive(false));
    setTimeout(() => {
      dispatch(setShareDelay(false));
    }, 800);
  };

  return {
    hCreatesGameRoom,
    hDeletesGameRoom,
    gLeavesGameRoom,
  };
};
