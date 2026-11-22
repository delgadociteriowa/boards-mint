'use client';

//deendencias
// por iniciar conexión socket
import { useSocket } from '@/app/hooks/useSocket';

// del estado board
import {
  addBoard,
  buildSyncGrid,
  setChangeFromSocket,
  updateBoard,
} from '@/state/board/boardSlice';

// usar y despachar estado
import { useAppDispatch, useAppSelector } from '@/state/hooks';

// iconos de botones
import {
  CircleHelp,
  Globe,
  GlobeOff,
  LogOut,
  QrCode,
  RotateCcw,
  Save,
} from 'lucide-react';

// sesion de usuario
import { useSession } from 'next-auth/react';

// codigo del board
import { useSearchParams } from 'next/navigation';

// hooks clásicos react
import { useEffect, useRef, useState } from 'react';

// toas de mensajes
import { Toaster, toast } from 'sonner';

//modals
import Dialog from '../dialog/Dialog';
import DialogHowto from '../dialog/DialogHowto';
import DialogQr from '../dialog/DialogQr';

const SaveBoard = () => {
  // previo a return

  // sesión de usuario
  const { data: session } = useSession();

  // estado de slice board
  const {
    phaseTwo,
    gameGrid,
    selectedGame,
    reversiNextPiece,
    updatedAt,
    socketActive,
    shareDelay,
    saving,
  } = useAppSelector((state) => state.board);

  // despachador de acciones
  const dispatch = useAppDispatch();

  // id de juego y room
  const searchParams = useSearchParams();
  const boardId = searchParams.get('id');
  const roomId = searchParams.get('room');

  // relacionado a modal
  const dialogHowToRef = useRef<HTMLDialogElement | null>(null);
  const dialogQrRef = useRef<HTMLDialogElement | null>(null);

  // relacionado al toast
  const [activeToast, setActiveToast] = useState(false);

  // relacionado a creación de room
  const { hCreatesGameRoom, hDeletesGameRoom, gLeavesGameRoom } = useSocket();

  //useEffect de que sucede en determinados cambios
  useEffect(() => {
    if (!boardId || !socketActive) return;

    const autoSave = async () => {
      try {
        const promise = dispatch(
          updateBoard({
            id: boardId,
            gameGrid,
            reversiNextPiece,
          }),
        ).unwrap();

        await toast.promise(promise, {
          error: 'Failed to auto save game',
        });
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(autoSave, 180000); //3 mins

    return () => {
      clearInterval(interval);
    };
  }, [boardId, socketActive, gameGrid, reversiNextPiece]);

  // función para manejar el guardado
  const handleSave = async () => {
    setActiveToast(true);
    const toastId = toast('Save board', {
      description: 'Do you want to save the game?',
      duration: Infinity,
      action: {
        label: 'Save',
        onClick: async () => {
          toast.dismiss(toastId);

          const promise = !boardId
            ? dispatch(
                addBoard({ gameGrid, selectedGame, reversiNextPiece }),
              ).unwrap()
            : dispatch(
                updateBoard({ id: boardId, gameGrid, reversiNextPiece }),
              ).unwrap();

          await toast.promise(promise, {
            loading: 'Saving game...',
            success: 'Game saved',
            error: 'Failed to save game',
          });

          setActiveToast(false);
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {
          toast.dismiss(toastId);
          setActiveToast(false);
        },
      },
    });
  };

  // función para abrir el how to
  const openHowToModal = () => {
    const dialog = dialogHowToRef.current;
    if (!dialog) return;

    dialog.showModal();
    dialog.scrollTop = 0;
  };

  // función para abrir el qr
  const openQrModal = () => {
    const dialog = dialogQrRef.current;
    if (!dialog) return;

    dialog.showModal();
    dialog.scrollTop = 0;
  };

  // función para manejar el reseteo
  const handleRestart = async () => {
    setActiveToast(true);
    const toastId = toast('Restart board', {
      description: 'Do you want to restart the game?',
      duration: Infinity,
      action: {
        label: 'Restart',
        onClick: async () => {
          toast.dismiss(toastId);
          dispatch(buildSyncGrid());
          toast.success('The game has been restarted');
          setActiveToast(false);
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {
          toast.dismiss(toastId);
          setActiveToast(false);
        },
      },
    });
    dispatch(setChangeFromSocket(false));
  };

  // return de visualización
  return (
    <>
      <div className='toolsbar-main'>
        {session && !roomId && (
          <>
            <button
              title='Save game'
              className='toolsbar-btn'
              onClick={handleSave}
              disabled={activeToast}
            >
              <Save className='w-5 h-5' />
            </button>

            <button
              title={socketActive ? 'Go offline' : 'Online game'}
              className='toolsbar-btn'
              onClick={() =>
                !socketActive
                  ? hCreatesGameRoom(setActiveToast)
                  : hDeletesGameRoom(setActiveToast)
              }
              disabled={phaseTwo || shareDelay || activeToast}
            >
              {socketActive ? (
                <GlobeOff className='w-5 h-5' />
              ) : (
                <Globe className='w-5 h-5' />
              )}
            </button>

            {socketActive && (
              <button
                title='Share game'
                className='toolsbar-btn'
                onClick={openQrModal}
                disabled={activeToast}
              >
                <QrCode className='w-5 h-5' />
              </button>
            )}

            {updatedAt && (
              <span className='toolsbar-saved-status'>
                {saving ? 'Saving...' : `Last Saved: ${updatedAt}`}
              </span>
            )}
          </>
        )}

        {!roomId && (
          <button
            title='Restart game'
            className='toolsbar-btn'
            disabled={activeToast}
            onClick={handleRestart}
          >
            <RotateCcw className='w-5 h-5' />
          </button>
        )}

        {roomId && (
          <button
            title='Leave game'
            className='toolsbar-btn'
            onClick={() => gLeavesGameRoom(setActiveToast)}
            disabled={activeToast}
          >
            <LogOut className='w-5 h-5' />
          </button>
        )}

        <button
          title='Help'
          className='toolsbar-btn'
          onClick={openHowToModal}
          disabled={activeToast}
        >
          <CircleHelp className='w-10 h-10' />
        </button>
      </div>

      <Dialog reference={dialogHowToRef}>
        <DialogHowto />
      </Dialog>

      <Dialog reference={dialogQrRef}>
        <DialogQr />
      </Dialog>

      <Toaster
        position='top-center'
        toastOptions={{
          classNames: {
            actionButton:
              '!bg-green-600 !text-white hover:!bg-green-500 !rounded-full order-1',
            cancelButton:
              '!bg-sky-600 !text-white hover:!bg-sky-500 !rounded-full order-2 !ml-1',
          },
        }}
        richColors
      />
    </>
  );
};

export default SaveBoard;
