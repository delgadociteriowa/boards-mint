'use client';

import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { signUp } from '@/state/user/userSlice';
import { useState } from 'react';
import Line from './Line';
import SectionTitle from './SectionTitle';
import SignUpField from './SignUpField';

const SignUpSection = () => {
  const { loading } = useAppSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedEmail = email.trim().slice(0, 50);
    const trimmedUsername = username.trim().slice(0, 50);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      alert('Please enter a valid email');
      return;
    }

    if (!usernameRegex.test(trimmedUsername)) {
      alert(
        'Username can only contain letters, numbers, underscores and hyphens',
      );
      return;
    }

    const resultAction = await dispatch(
      signUp({ email: trimmedEmail, username: trimmedUsername }),
    );

    if (signUp.fulfilled.match(resultAction)) {
      setEmail('');
      setUsername('');
    }
  };

  return (
    <>
      <section className='w-[90%] mx-auto max-w-[1200px] pt-14 pb-8 text-stone-600'>
        <SectionTitle title='sign up' />
      </section>
      <section className='w-[90%] mx-auto max-w-[1200px] pt-1 pb-20 text-stone-700'>
        <form
          className='max-w-[600px] flex flex-col gap-6 mx-auto'
          onSubmit={(e) => handleSubmit(e)}
        >
          <p className='text-stone-600 tracking-[1px]'>
            Fields with a * are required
          </p>
          <SignUpField
            label='email*'
            type='email'
            required={true}
            value={email}
            onChange={setEmail}
          />
          <Line />
          <SignUpField
            label='username*'
            type='text'
            required={true}
            maxLength={10}
            value={username}
            onChange={setUsername}
          />
          <Line />
          <button
            type='submit'
            disabled={loading}
            className={`
                w-[80%]
                md:w-[40%]
                mt-4
                py-3
                mx-auto
                text-center
                text-xl
                tracking-[2px]
                text-stone-100
                rounded-full
                shadow-md
                ${
                  loading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-sky-600 hover:bg-sky-500 cursor-pointer'
                }
              `}
          >
            sign up
          </button>
        </form>
      </section>
    </>
  );
};

export default SignUpSection;
