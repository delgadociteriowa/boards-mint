import { useAccount } from '@/app/hooks/useAccount';
import AccountFields from './AccountFields';
import AccountOptions from './AccountOptions';
import SectionTitle from './SectionTitle';

const AccountSection = () => {
  const {
    userName,
    email,
    firstname,
    lastname,
    editingField,
    updateFirstname,
    updateLastname,
    startEditing,
    stopEditing,
    handleSave,
    handleLogout,
    handleDeleteUser,
  } = useAccount();

  const isEditingFirst = editingField === 'firstname';
  const isEditingLast = editingField === 'lastname';

  return (
    <>
      <section className='w-[90%] mx-auto max-w-[1200px] pt-14 pb-8 text-stone-600'>
        <SectionTitle title='account' />
      </section>
      <section className='mx-auto w-[90%] max-w-[1200px] pt-1 pb-20 text-stone-700 md:mb-24'>
        <div className='flex flex-col lg:flex-row gap-8 lg:gap-12'>
          <div className='w-full lg:w-1/2 md:ml-8 flex flex-col gap-6'>
            <AccountFields
              userName={userName}
              email={email}
              firstname={firstname}
              lastname={lastname}
              isEditingFirst={isEditingFirst}
              isEditingLast={isEditingLast}
              updateFirstname={updateFirstname}
              updateLastname={updateLastname}
              startEditing={startEditing}
              stopEditing={stopEditing}
              handleSave={handleSave}
            />
          </div>
          <div className='w-full lg:w-1/2 md:ml-8'>
            <AccountOptions
              handleLogout={handleLogout}
              handleDeleteUser={handleDeleteUser}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default AccountSection;
