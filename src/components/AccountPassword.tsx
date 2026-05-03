import { UpdateUserPassword } from '@/types/user';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface AccountPasswordProps {
  handleUpdatePassword: (value: UpdateUserPassword) => void;
}

const AccountPassword = ({ handleUpdatePassword }: AccountPasswordProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

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
        <div className='relative'>
          <input
            type={showCurrentPassword ? 'text' : 'password'}
            maxLength={50}
            minLength={8}
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className='border border-stone-300 rounded-xl py-3 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500 w-full'
            placeholder='Enter old password'
          />
          <button
            type='button'
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className='absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-700 cursor-pointer'
          >
            {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className='relative'>
          <input
            type='text'
            maxLength={50}
            minLength={8}
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className='border border-stone-300 rounded-xl py-3 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500 w-full'
            placeholder='Enter new password'
          />
          <button
            type='button'
            onClick={() => setShowNewPassword(!showNewPassword)}
            className='absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-700 cursor-pointer'
          >
            {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
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
