'use client';

import useBoardAutoSave from '@/app/hooks/useBoardAutoSave';
import { useSocket } from '@/app/hooks/useSocket';
import {
  addBoard,
  buildSyncGrid,
  setChangeFromSocket,
  updateBoard,
} from '@/state/board/boardSlice';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { Toaster, toast } from 'sonner';
import Dialog from '../dialog/Dialog';
import DialogHowto from '../dialog/DialogHowto';
import DialogQr from '../dialog/DialogQr';
import ToolbarActions from './ToolbarActions';

const Toolbar = () => {
  const { data: session } = useSession();
  const { hCreatesGameRoom, hDeletesGameRoom, gLeavesGameRoom } = useSocket();
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
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const boardId = searchParams.get('id');
  const roomId = searchParams.get('room');
  const dialogHowToRef = useRef<HTMLDialogElement | null>(null);
  const dialogQrRef = useRef<HTMLDialogElement | null>(null);
  const [activeToast, setActiveToast] = useState(false);

  useBoardAutoSave({
    boardId,
    socketActive,
    gameGrid,
    reversiNextPiece,
  });

  const confirmAction = (
    title: string,
    description: string,
    actionLabel: string,
    onConfirm: () => void | Promise<void>,
  ) => {
    setActiveToast(true);

    const toastId = toast(title, {
      description,
      duration: Infinity,
      action: {
        label: actionLabel,
        onClick: async () => {
          toast.dismiss(toastId);

          try {
            await onConfirm();
          } finally {
            setActiveToast(false);
          }
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

  const handleSave = () => {
    confirmAction(
      'Save board',
      'Do you want to save the game?',
      'Save',
      async () => {
        const promise = !boardId
          ? dispatch(
              addBoard({
                gameGrid,
                selectedGame,
                reversiNextPiece,
              }),
            ).unwrap()
          : dispatch(
              updateBoard({
                id: boardId,
                gameGrid,
                reversiNextPiece,
              }),
            ).unwrap();

        await toast.promise(promise, {
          loading: 'Saving game...',
          success: 'Game saved',
          error: 'Failed to save game',
        });
      },
    );
  };

  const handleRestart = () => {
    confirmAction(
      'Restart board',
      'Do you want to restart the game?',
      'Restart',
      () => {
        dispatch(buildSyncGrid());
        dispatch(setChangeFromSocket(false));

        toast.success('The game has been restarted');
      },
    );
  };

  const openHowToModal = () => {
    const dialog = dialogHowToRef.current;
    if (!dialog) return;

    dialog.showModal();
    dialog.scrollTop = 0;
  };

  const openQrModal = () => {
    const dialog = dialogQrRef.current;
    if (!dialog) return;

    dialog.showModal();
    dialog.scrollTop = 0;
  };

  return (
    <>
      <ToolbarActions
        session={!!session}
        roomId={roomId}
        socketActive={socketActive}
        phaseTwo={phaseTwo}
        shareDelay={shareDelay}
        activeToast={activeToast}
        updatedAt={updatedAt}
        saving={saving}
        onSave={handleSave}
        onToggleOnline={() =>
          !socketActive
            ? hCreatesGameRoom(setActiveToast)
            : hDeletesGameRoom(setActiveToast)
        }
        onOpenQr={openQrModal}
        onRestart={handleRestart}
        onLeaveRoom={() => gLeavesGameRoom(setActiveToast)}
        onOpenHelp={openHowToModal}
      />

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

export default Toolbar;
