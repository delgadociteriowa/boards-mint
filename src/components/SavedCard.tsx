import Link from "next/link";

interface SavedCardProps {
  background: string;
  title: string;
  gameLink: string;
}

const SavedCard = ({background, title, gameLink} : SavedCardProps) => (
  <div className={`${background} h-[225px] p-6 bg-stone-900 rounded-3xl bg-center bg-cover flex flex-col w-[250px] max-w-[270px] grow shadow-xl/30`}>
    <h4 className="uppercase text-stone-200 tracking-[2px] text-2xl mb-4 flex items-center justify-between">
      <span>{title}</span>
      <button
        type="button"
        aria-label="Delete"
        className="hover:text-stone-50 transition cursor-pointer"
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
    <h3 className="text-stone-200 text-lg">Created at: 11/1/2026</h3>
    <h3 className="text-stone-200 text-lg">Last saved: 11/1/2026</h3>
    <Link className="lowercase block bg-stone-200/70 hover:bg-stone-200/90 py-4 rounded-full text-center no-underline text-stone-800 text-xl tracking-[3px] mt-auto" href={`/${gameLink}`}>continue</Link>
  </div>
);

export default SavedCard;