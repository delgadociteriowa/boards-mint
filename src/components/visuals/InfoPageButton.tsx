import Link from 'next/link';

interface InfoPageButtonProps {
  link: string;
  text: string;
}

const InfoPageButton = ({ link, text }: InfoPageButtonProps) => {
  return (
    <Link
      href={link}
      className='block w-60 bg-sky-600 hover:bg-sky-500 py-6 rounded-full text-center no-underline text-stone-100 text-xl lowercase tracking-[3px] mx-auto my-0 shadow-lg'
    >
      {text}
    </Link>
  );
};

export default InfoPageButton;
