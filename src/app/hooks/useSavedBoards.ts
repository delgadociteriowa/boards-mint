import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { fetchSavedBoards } from "@/state/savedBoards/savedBoardsSlice";
import { deleteBoard } from "@/state/board/boardSlice";

export const useSavedBoards = () => {
  const { status } = useSession();
  const dispatch = useAppDispatch();

  const { boards, loading, error } = useAppSelector(state => state.savedBoards);

  useEffect(() => {
    if (status === "loading") return;
    dispatch(fetchSavedBoards());
  }, [status, dispatch]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
    "Are you sure you want to delete this board?"
    );

    if (!confirmed) return;
    
    await dispatch(deleteBoard(id));
    dispatch(fetchSavedBoards());
  };
  
  return {
    boards,
    loading,
    error,
    status,
    handleDelete
  }
}; 