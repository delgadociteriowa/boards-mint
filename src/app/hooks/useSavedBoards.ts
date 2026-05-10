import { deleteBoard } from '@/state/board/boardSlice';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { fetchSavedBoards } from '@/state/savedBoards/savedBoardsSlice';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const useSavedBoards = () => {
  const { status } = useSession();
  const dispatch = useAppDispatch();

  const { boards, loading, error } = useAppSelector(
    (state) => state.savedBoards,
  );

  useEffect(() => {
    if (status === 'loading') return;
    dispatch(fetchSavedBoards());
  }, [status, dispatch]);

  const handleDelete = (id: string) => {
    const toastId = toast('Delete saved board', {
      description: 'Are you sure you want to delete this board?',
      duration: Infinity,
      action: {
        label: 'delete',
        onClick: async () => {
          toast.dismiss(toastId);
          await dispatch(deleteBoard(id));
          dispatch(fetchSavedBoards());
        },
      },
      cancel: {
        label: 'cancel',
        onClick: () => {
          toast.dismiss(toastId);
        },
      },
    });
  };

  return {
    boards,
    loading,
    error,
    status,
    handleDelete,
  };
};
