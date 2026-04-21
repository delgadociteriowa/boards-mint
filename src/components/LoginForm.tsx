'use client';

import { useLogin } from '@/app/hooks/useLogin';
import GoogleLogo from '@/assets/b-google.png';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import SectionTitle from './SectionTitle';
import Spinner from './Spinner';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    dispatch,
    identifier,
    password,
    loading,
    error,
    handleLogin,
    signIn,
    setIdentifier,
    setPassword,
  } = useLogin();

  return (
    <form onSubmit={handleLogin} className='flex flex-col gap-6 flex-1'>
      <div className='flex flex-col gap-2 md:hidden'>
        <SectionTitle title='login' />
      </div>
      <div className='flex flex-col gap-2'>
        <label className='text-stone-600 tracking-[1px] text-sm'>
          username / email
        </label>
        <input
          type='text'
          required
          maxLength={50}
          value={identifier}
          disabled={loading}
          onChange={(e) => dispatch(setIdentifier(e.target.value))}
          className='border border-stone-300 rounded-xl py-4 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500'
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label className='text-stone-600 tracking-[1px] text-sm'>
          password
        </label>
        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            required
            maxLength={50}
            value={password}
            disabled={loading}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            className='w-full border border-stone-300 rounded-xl py-4 px-4 pr-12 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500'
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
      <p
        className={`text-red-500 h-2 text-center transition-opacity duration-6000 ${
          error ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {error}
      </p>
      {!loading ? (
        <>
          <button
            type='submit'
            disabled={loading}
            className='w-[80%] md:w-[40%] py-3 rounded-full text-center text-stone-100 text-xl tracking-[2px] shadow-md mx-auto bg-sky-600 hover:bg-sky-500 cursor-pointer'
          >
            sign in
          </button>

          <div className='text-stone-600 tracking-[1px] text-center text-sm'>
            <span className='block'>
              You dont have an account ? Sign up{' '}
              <Link href='/signup' className='text-sky-600 hover:text-sky-500'>
                here
              </Link>
            </span>
            <span className='block'>or sign in / sign up with:</span>
          </div>

          <button
            type='button'
            onClick={() => signIn('google', { callbackUrl: '/account' })}
            disabled={loading}
            className='w-[80%] md:w-[40%] py-3 rounded-full flex items-center justify-center gap-3 text-center text-stone-600 text-xl tracking-[2px] shadow-md mx-auto bg-neutral-100 hover:bg-neutral-50 cursor-pointer border-stone-300 border-1'
          >
            {loading ? (
              'loading...'
            ) : (
              <>
                <Image src={GoogleLogo} alt='Google' width={24} height={24} />
                <span>Google</span>
              </>
            )}
          </button>
        </>
      ) : (
        <Spinner />
      )}
    </form>
  );
};

export default LoginForm;
