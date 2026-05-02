import { UpdateUserPassword } from '@/types/user';
import { useState } from 'react';

interface AccountPasswordProps {
  handleUpdatePassword: (value: UpdateUserPassword) => void;
}

const AccountPassword = ({ handleUpdatePassword }: AccountPasswordProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword) return;

    handleUpdatePassword({
      currentPassword,
      newPassword,
    });

    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <div className='flex flex-col gap-5'>
      <label className='text-stone-600 tracking-[1px] text-sm'>
        update password
      </label>
      <form onSubmit={onSubmit} className='flex flex-col gap-5'>
        <input
          type='text'
          maxLength={50}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className='border border-stone-300 rounded-xl py-3 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500 w-[90%]'
          placeholder='Enter old password'
        />
        <input
          type='text'
          maxLength={50}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className='border border-stone-300 rounded-xl py-3 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500 w-[90%]'
          placeholder='Enter new password'
        />
        <button
          type='submit'
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
          update
        </button>
      </form>
    </div>
  );
};

export default AccountPassword;
