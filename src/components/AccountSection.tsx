import Link from 'next/link';
import { useAccount } from '@/app/hooks/useAccount';

const AccountSection = () => {
  const { 
    userName,
    email,
    firstName,
    lastName,
    editingFirst,
    editingLast,
    dispatch,
    setFirstName,
    setLastName,
    handleSave,
    setEditingFirst,
    setEditingLast,
    handleLogout
  } = useAccount();
  
  return (
    <section className="w-[90%] mx-auto max-w-[500px] py-20 text-stone-700 flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <label className="text-stone-600 tracking-[1px] text-sm">user name</label>
        <div className="flex items-center justify-between">
          <p className="text-stone-700 text-lg">{userName ?? "-"}</p>
        </div>
      </div>
      <div className="w-full h-px bg-stone-300"></div>
      <div className="flex flex-col gap-2">
        <label className="text-stone-600 tracking-[1px] text-sm">email</label>
        <div className="flex items-center justify-between">
          <p className="text-stone-700 text-lg">{email ?? "-"}</p>
        </div>
      </div>
      <div className="w-full h-px bg-stone-300"></div>
      <div className="flex flex-col gap-2">
        <label className="text-stone-600 tracking-[1px] text-sm">
          first name
        </label>
        <div className="flex items-center justify-between">
          {editingFirst ? (
            <input
              className="border border-stone-300 rounded-xl py-3 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500 w-full"
              value={firstName ??  "-"}
              onChange={(e) => dispatch(setFirstName(e.target.value))}
            />
          ) : (
            <p className="text-stone-700 text-lg">{firstName ??  "-"}</p>
          )}

          <button
            className="bg-sky-600 hover:bg-sky-500 text-stone-100 px-5 py-2 rounded-xl ml-4 cursor-pointer"
            onClick={() =>
              editingFirst ? handleSave('firstname') : dispatch(setEditingFirst(true))
            }
          >
            {editingFirst ? "save" : "edit"}
          </button>
        </div>
      </div>
      <div className="w-full h-px bg-stone-300"></div>
      <div className="flex flex-col gap-2">
        <label className="text-stone-600 tracking-[1px] text-sm">
          last name
        </label>
        <div className="flex items-center justify-between">
          {editingLast ? (
            <input
              className="border border-stone-300 rounded-xl py-3 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500 w-full"
              value={lastName ?? "-"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(setLastName(e.target.value))
              }
            />
          ) : (
            <p className="text-stone-700 text-lg">{lastName ?? "-"}</p>
          )}

          <button
            className="bg-sky-600 hover:bg-sky-500 text-stone-100 px-5 py-2 rounded-xl ml-4 cursor-pointer"
            onClick={() =>
              editingLast ? handleSave('lastname') : dispatch(setEditingLast(true))
            }
          >
            {editingLast ? "save" : "edit"}
          </button>
        </div>
      </div>
      <Link
          href="/saved"
        className="bg-sky-600 hover:bg-sky-500 py-5 rounded-full text-center text-stone-100 text-xl tracking-[2px] mx-auto mt-5 shadow-xl/20  cursor-pointer w-[90%]"
      >
        my saved games
      </Link>
      <button
        onClick={handleLogout}
        className="bg-sky-600 hover:bg-sky-500 py-5 rounded-full text-center text-stone-100 text-xl tracking-[2px] mx-auto mt-5 shadow-xl/20  cursor-pointer w-[90%]"
      >
        log out
      </button>
    </section>
  )
};

export default AccountSection;