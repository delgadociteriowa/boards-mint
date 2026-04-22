'use client';

import { useSignUp } from '@/app/hooks/useSignUp';
import Line from './Line';
import SectionTitle from './SectionTitle';
import SignUpField from './SignUpField';
import SignUpFieldPass from './SignUpFieldPass';

const SignUpSection = () => {
  const {
    handleSubmit,
    email,
    username,
    firstName,
    lastName,
    password,
    repeatPassword,
    setEmail,
    setUsername,
    setFirstName,
    setLastName,
    setPassword,
    setRepeatPassword,
    loading,
  } = useSignUp();

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
