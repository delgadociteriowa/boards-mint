export interface SavedBoard {
  _id: string;
  owner: string;
  selectedGame: string;
  createdAt: string;
  updatedAt: string;
}

export interface SavedBoardsState {
  boards: SavedBoard[];
  loading: boolean;
  error: string | null;
}