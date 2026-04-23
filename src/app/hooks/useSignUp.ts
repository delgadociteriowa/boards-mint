import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { signUp } from '@/state/user/userSlice';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useSignUp = () => {
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
      (!namesRegex.test(trimmedLastname) && trimmedLastname !== '')
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
      router.push('/verify-inbox');
    }
  };

  return {
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
  };
};
