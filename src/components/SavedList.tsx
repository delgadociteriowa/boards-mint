import Spinner from "@/components/Spinner";
import SavedCard from "@/components/SavedCard";
import formatDate from "@/utils/formatDate";
import { SavedBoard } from "@/types/savedBoards";

interface SavedListProps {
  loading: boolean;
  error: string | null;
  boards: SavedBoard[];
  status: string;
  handleDelete: (id: string) => void
};

const SavedList = ({loading, error, boards, status, handleDelete}: SavedListProps) => {
  return (
    <div className="py-5 flex flex-wrap gap-10 w-full mb-8">
      {loading &&  (
        <Spinner />
      )}
      
      {!loading && status === "unauthenticated" && (
        <p className="text-center w-full">
          Log in to save games
        </p>
      )}

      {!loading && boards.length === 0 && status === "authenticated" && (
        <p className="text-center w-full">
          No saved games yet
        </p>
      )}

      {error && (
        <p className="text-center w-full text-red-500 text/xl">
          {error}
        </p>
      )}

      {!loading &&
        boards.map(board => (
          <SavedCard
            key={board._id}
            game={board.selectedGame}
            gameId={board._id}
            createdAt={formatDate(board.createdAt)}
            lastSaved={formatDate(board.updatedAt)}
            onDelete={handleDelete}
          />
        )
      )}
    </div>
  )
};

export default SavedList;