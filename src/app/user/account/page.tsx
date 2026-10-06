'use client';

import AccountSection from '@/components/account/AccountSection';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import LoadingComponent from '@/components/visuals/LoadingComponent';
import { useSession } from 'next-auth/react';

const Account = () => {
  const { status } = useSession();

  return (
    <>
      <Header />
      {status === 'loading' ? (
        <LoadingComponent />
      ) : (
        <main>
          <AccountSection />
        </main>
      )}
      <Footer />
    </>
  );
};

export default Account;
