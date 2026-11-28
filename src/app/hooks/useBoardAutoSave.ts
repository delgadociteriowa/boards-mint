import { useEffect } from 'react';
import { toast } from 'sonner';

import { updateBoard } from '@/state/board/boardSlice';
import { useAppDispatch } from '@/state/hooks';
import { Grid } from '@/types/board';

interface UseBoardAutoSaveProps {
  boardId: string | null;
  socketActive: boolean;
  gameGrid: Grid;
}

const useBoardAutoSave = ({
  boardId,
  socketActive,
  gameGrid,
}: UseBoardAutoSaveProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!boardId || !socketActive) return;

    const autoSave = async () => {
      try {
        const promise = dispatch(
          updateBoard({
            id: boardId,
            gameGrid,
          }),
        ).unwrap();

        await toast.promise(promise, {
          error: 'Failed to auto save game',
        });
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(autoSave, 180000);

    return () => {
      clearInterval(interval);
    };
  }, [boardId, socketActive, gameGrid, dispatch]);
};

export default useBoardAutoSave;
