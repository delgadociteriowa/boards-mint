import Link from 'next/link';
import { useAccount } from '@/app/hooks/useAccount';
import AccountField from './AccountField';
import AccountEditableField from './AccountEditableField';
import Line from './Line';


const AccountSection = () => {
  const { 
    userName,
    email,
    firstName,
    lastName,
    editingField,
    dispatch,
    setFirstName,
    setLastName,
    handleSave,
    setEditingField,
    handleLogout
  } = useAccount();

  const isEditingFirst = editingField === "firstname";
  const isEditingLast = editingField === "lastname";
  
  return (
    <section className="w-[90%] mx-auto max-w-[500px] py-20 text-stone-700 flex flex-col gap-10">
      <h3 className="text-3xl text-center ml-4 tracking-[2px] text-stone-600">account</h3>
      <AccountField
        label="user name"
        value={userName ?? "-"}
      />
      <Line/>
      <AccountField
        label="email"
        value={email ?? "-"}
      />
      <Line/>
      <AccountEditableField
        label="first name"
        value={firstName ?? "-"}
        editing={isEditingFirst}
        onChange={(value) => dispatch(setFirstName(value))}
        onEdit={() => dispatch(setEditingField("firstname"))}
        onSave={() => handleSave("firstname")}
        onCancel={() => dispatch(setEditingField(null))}
      />
      <Line/>
      <AccountEditableField
        label="last name"
        value={lastName ?? "-"}
        editing={isEditingLast}
        onChange={(value) => dispatch(setLastName(value))}
        onEdit={() => dispatch(setEditingField("lastname"))}
        onSave={() => handleSave("lastname")}
        onCancel={() => dispatch(setEditingField(null))}
      />
      <Link
          href="/saved"
        className="bg-sky-600 hover:bg-sky-500 py-5 rounded-full text-center text-stone-100 text-xl tracking-[2px] mx-auto mt-5 shadow-xl/20  cursor-pointer w-[90%]"
      >
        saved games
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