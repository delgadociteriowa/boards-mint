'use client';
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { buildSyncGrid, selectPiece, getBoard } from "@/state/board/boardSlice";
import { Square } from "@/types/board";

export const useOctoboard = () => {
  const searchParams = useSearchParams();
  const queryParamId = searchParams.get("id") || '';
  const router = useRouter();
  const { id, selectedGame, gameGrid, phaseTwo, loading, error }  = useAppSelector(state => state.board);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!queryParamId) {
      dispatch(buildSyncGrid());
    } else {
      dispatch(getBoard(queryParamId));
    } 
  }, [queryParamId, selectedGame, dispatch]);

  useEffect(() => {
    if(!queryParamId && id) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("id", id);
      router.replace(`?${params.toString()}`);
    }
  }, [queryParamId, id]);

  const handleClickSqr = (cell: Square) => {
    if (!phaseTwo) {
      if(!cell.piece) return
      dispatch(selectPiece(cell.id));
      return
    }
    dispatch(selectPiece(cell.id))
  };

  return {
    queryParamId,
    selectedGame,
    gameGrid,
    phaseTwo,
    loading,
    error,
    handleClickSqr
  }
};