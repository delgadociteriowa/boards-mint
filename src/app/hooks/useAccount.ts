'use client';

import { useAppDispatch, useAppSelector } from '@/state/hooks';
import {
  logout,
  setEditingField,
  setFirstname,
  setLastname,
  syncUserData,
  updateUser,
} from '@/state/user/userSlice';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useAccount = () => {
  const dispatch = useAppDispatch();
  const { userName, email, firstname, lastname, editingField } = useAppSelector(
    (state) => state.user,
  );

  const { data: session, status, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    const syncSessionToState = () => {
      if (status === 'loading') return;

      if (status === 'unauthenticated') {
        router.push('/login');
        return;
      }

      if (status === 'authenticated' && session) {
        dispatch(
          syncUserData({
            userName: session.user.username,
            firstname: session.user.firstname,
            lastname: session.user.lastname,
            email: session.user.email || '',
          }),
        );
      }
    };
    syncSessionToState();
  }, [status, session, dispatch, router]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSave = async (field: 'firstname' | 'lastname') => {
    const updateOptions = {
      firstname: firstname,
      lastname: lastname,
    };

    const payload = {
      [field]: updateOptions[field].trim().slice(0, 50),
    };

    await dispatch(updateUser(payload));
    await update();

    dispatch(setEditingField(null));
  };

  return {
    userName,
    email,
    firstname,
    lastname,
    editingField,
    dispatch,
    setFirstname,
    setLastname,
    handleSave,
    setEditingField,
    handleLogout,
  };
};
