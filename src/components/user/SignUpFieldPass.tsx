'use client';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface AccountEditableFieldProps {
  label: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  value: string;
  onChange: (value: string) => void;
  noNumber?: boolean;
}

const SignUpFieldPass = ({
  label,
  required = false,
  minLength = 3,
  maxLength = 50,
  value,
  onChange,
  noNumber = false,
}: AccountEditableFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='flex flex-col gap-2'>
      <label className='text-stone-600 tracking-[1px] text-sm'>{label}</label>
      <div className='relative'>
        <input
          type={showPassword ? 'text' : 'password'}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          value={value}
          onChange={(e) => {
            onChange(
              noNumber ? e.target.value.replace(/[0-9]/g, '') : e.target.value,
            );
          }}
          className='border border-stone-300 rounded-xl w-full py-4 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500'
        />
        <button
          type='button'
          onClick={() => setShowPassword(!showPassword)}
          className='absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-700 cursor-pointer'
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
};

export default SignUpFieldPass;
