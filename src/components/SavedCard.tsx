'use client';

import { Trash2 } from 'lucide-react';
import Link from 'next/link';

interface SavedCardProps {
  game: string;
  gameId: string;
  createdAt: string;
  lastSaved: string;
  onDelete: (id: string) => void;
}

const SavedCard = ({
  game,
  gameId,
  createdAt,
  lastSaved,
  onDelete,
}: SavedCardProps) => (
  <div
    className={`bg-game-${game} h-[250px] p-6 grow md:grow-0 bg-stone-900 rounded-3xl bg-center bg-cover flex flex-col shadow-xl/30`}
  >
    <h3 className='uppercase text-stone-200 tracking-[2px] text-2xl mb-4 flex items-center justify-between'>
      <span>{game}</span>
      <button
        type='button'
        aria-label='Delete'
        className='hover:text-stone-50 transition cursor-pointer'
        onClick={() => onDelete(gameId)}
      >
        <Trash2 className='w-7 h-7' />
      </button>
    </h3>
    <h3 className='text-stone-200 text-lg'>Created at: {createdAt}</h3>
    <h3 className='text-stone-200 text-lg'>Last saved: {lastSaved}</h3>
    <Link
      href={`/${game}?id=${gameId}`}
      className='lowercase block bg-stone-200/70 hover:bg-stone-200/90 py-4 rounded-full text-center no-underline text-stone-800 text-xl tracking-[3px] mt-auto cursor-pointer'
    >
      continue
    </Link>
  </div>
);

export default SavedCard;
