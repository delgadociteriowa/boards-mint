'use client';

import AccountSection from '@/components/account/AccountSection';
import LoadingComponent from '@/components/visuals/LoadingComponent';
import { useSession } from 'next-auth/react';

const Account = () => {
  const { status } = useSession();

  return (
    <>{status === 'loading' ? <LoadingComponent /> : <AccountSection />}</>
  );
};

export default Account;
