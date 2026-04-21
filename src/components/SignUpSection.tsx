'use client';

import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { signUp } from '@/state/user/userSlice';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Line from './Line';
import SectionTitle from './SectionTitle';
import SignUpField from './SignUpField';
import SignUpFieldPass from './SignUpFieldPass';

const SignUpSection = () => {
  const { loading } = useAppSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/account');
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedEmail = email.trim().slice(0, 50);
    const trimmedUsername = username.trim().slice(0, 50);
    const trimmedFirstname = firstName.trim().slice(0, 20);
    const trimmedLastname = lastName.trim().slice(0, 20);
    const trimmedPassword = password.trim().slice(0, 50);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    const namesRegex = /^[\p{L}' -]+$/u;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,50}$/;

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

    if (
      !namesRegex.test(trimmedFirstname) ||
      !namesRegex.test(trimmedLastname)
    ) {
      alert(
        'A name can only contain letters, numbers, underscores and hyphens',
      );
      return;
    }

    if (!passwordRegex.test(trimmedPassword)) {
      alert(
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      );
      return;
    }

    if (trimmedPassword !== repeatPassword) {
      alert(
        'To confirm your password you must write down the same one in the confirm password field.',
      );
      return;
    }

    const resultAction = await dispatch(
      signUp({
        email: trimmedEmail,
        username: trimmedUsername,
        firstname: trimmedFirstname,
        lastname: trimmedLastname,
        password: trimmedPassword,
      }),
    );

    if (signUp.fulfilled.match(resultAction)) {
      setEmail('');
      setUsername('');
      setFirstName('');
      setLastName('');
      setPassword('');
      router.push('/login');
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
          <SignUpField
            label='first name*'
            type='text'
            required={true}
            maxLength={20}
            value={firstName}
            onChange={setFirstName}
            noNumber={true}
          />
          <Line />
          <SignUpField
            label='last name'
            type='text'
            required={true}
            maxLength={20}
            value={lastName}
            onChange={setLastName}
            noNumber={true}
          />
          <Line />
          <SignUpFieldPass
            label='password*'
            required={true}
            maxLength={50}
            value={password}
            onChange={setPassword}
          />
          <Line />
          <SignUpFieldPass
            label='confirm password*'
            required={true}
            maxLength={50}
            value={repeatPassword}
            onChange={setRepeatPassword}
          />
          <button
            type='submit'
            disabled={loading}
            className={`w-[80%] md:w-[40%] mt-4 py-3 mx-auto text-center text-xl tracking-[2px] text-stone-100 rounded-full shadow-md
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
