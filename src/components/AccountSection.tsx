import { useAccount } from '@/app/hooks/useAccount';
import Link from 'next/link';
import AccountEditableField from './AccountEditableField';
import AccountField from './AccountField';
import Line from './Line';
import SectionTitle from './SectionTitle';

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
    handleLogout,
  } = useAccount();

  const isEditingFirst = editingField === 'firstname';
  const isEditingLast = editingField === 'lastname';

  return (
    <>
      <section className='w-[90%] mx-auto max-w-[1200px] pt-14 pb-8 text-stone-600'>
        <SectionTitle title='account' />
      </section>
      <section className='w-[90%] mx-auto max-w-[1200px] pt-1 pb-20 text-stone-700'>
        <div className='max-w-[600px] flex flex-col gap-6 md:ml-8'>
          <AccountField label='user name' value={userName ?? '-'} />
          <Line />
          <AccountField label='email' value={email ?? '-'} />
          <Line />
          <AccountEditableField
            label='first name'
            value={firstName ?? '-'}
            editing={isEditingFirst}
            onChange={(value) => dispatch(setFirstName(value))}
            onEdit={() => dispatch(setEditingField('firstname'))}
            onSave={() => handleSave('firstname')}
            onCancel={() => dispatch(setEditingField(null))}
          />
          <Line />
          <AccountEditableField
            label='last name'
            value={lastName ?? '-'}
            editing={isEditingLast}
            onChange={(value) => dispatch(setLastName(value))}
            onEdit={() => dispatch(setEditingField('lastname'))}
            onSave={() => handleSave('lastname')}
            onCancel={() => dispatch(setEditingField(null))}
          />
          <Line />
          <div className='flex flex-col gap-5'>
            <label className='text-stone-600 tracking-[1px] text-sm'>
              more options
            </label>
            <Link
              href='/saved'
              className='
                w-[80%]
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
          </div>
        </div>
      </section>
    </>
  );
};

export default AccountSection;
