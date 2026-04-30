import Link from 'next/link';

interface AccountOptionsProps {
  handleLogout: () => void;
  handleDeleteUser: () => void;
}

const AccountOptions = ({
  handleLogout,
  handleDeleteUser,
}: AccountOptionsProps) => {
  return (
    <div className='flex flex-col gap-5'>
      <label className='text-stone-600 tracking-[1px] text-sm'>
        more options
      </label>
      <Link
        href='/saved'
        className='
                w-[80%]
                max-w-[300px]
                md:w-[40%]
                mt-2
                mx-auto
                md:mx-0
                py-3
                text-center
                text-xl
                tracking-[2px]
                text-stone-100
                bg-sky-600 
                hover:bg-sky-500
                rounded-full
                shadow-md/20
                cursor-pointer
              '
      >
        saved games
      </Link>
      <button
        onClick={handleLogout}
        className='
                w-[80%]
                max-w-[300px]
                md:w-[40%]
                py-3
                mx-auto
                md:mx-0
                text-center
                text-xl
                tracking-[2px]
                text-stone-100
                bg-sky-600 
                hover:bg-sky-500
                rounded-full
                shadow-md/20
                cursor-pointer
              '
      >
        log out
      </button>
      <button
        onClick={handleDeleteUser}
        className='
                w-[80%]
                max-w-[300px]
                md:w-[40%]
                py-3
                mx-auto
                md:mx-0
                text-center
                text-xl
                tracking-[2px]
                text-stone-100
                bg-red-600 
                hover:bg-red-500
                rounded-full
                shadow-md/20
                cursor-pointer
              '
      >
        delete account
      </button>
    </div>
  );
};

export default AccountOptions;
