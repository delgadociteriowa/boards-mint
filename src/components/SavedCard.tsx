'use client';

import Link from "next/link";

interface SavedCardProps {
  game: string;
  gameId: string;
  createdAt: string;
  lastSaved: string;
  onDelete: (id: string) => void;
}

const SavedCard = ({game, gameId, createdAt, lastSaved, onDelete} : SavedCardProps) => (
  <div className={`bg-game-${game} h-[250px] p-6 grow bg-stone-900 rounded-3xl bg-center bg-cover flex flex-col shadow-xl/30`}>
    <h4 className="uppercase text-stone-200 tracking-[2px] text-2xl mb-4 flex items-center justify-between">
      <span>{game}</span>
      <button
        type="button"
        aria-label="Delete"
        className="hover:text-stone-50 transition cursor-pointer"
        onClick={() => onDelete(gameId)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 6h2v9h-2V9zm4 0h2v9h-2V9zM7 9h2v9H7V9z" />
        </svg>
      </button>
    </h4>
    <h3 className="text-stone-200 text-lg">Created at: {createdAt}</h3>
    <h3 className="text-stone-200 text-lg">Last saved: {lastSaved}</h3>
    <Link href={`/${game}?id=${gameId}`}className="lowercase block bg-stone-200/70 hover:bg-stone-200/90 py-4 rounded-full text-center no-underline text-stone-800 text-xl tracking-[3px] mt-auto cursor-pointer">continue</Link>
  </div>
);

export default SavedCard;