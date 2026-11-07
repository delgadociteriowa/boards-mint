'use client';

import { useAccount } from '@/app/hooks/useAccount';
import { useSession } from 'next-auth/react';
import Line from '../visuals/Line';
import Spinner from '../visuals/Spinner';
import AccountEditableField from './AccountEditableField';
import AccountField from './AccountField';

const AccountFields = () => {
  const { status } = useSession();
  const {
    userName,
    email,
    firstname,
    lastname,
    editingField,
    updateFirstname,
    updateLastname,
    startEditing,
    stopEditing,
    handleSave,
  } = useAccount();
  const isEditingFirst = editingField === 'firstname';
  const isEditingLast = editingField === 'lastname';
  return (
    <>
      {status === 'loading' ? (
        <Spinner />
      ) : (
        <>
          <AccountField label='user name' value={userName ?? '-'} />
          <Line />
          <AccountField label='email' value={email ?? '-'} />
          <Line />
          <AccountEditableField
            label='first name'
            value={firstname ?? '-'}
            editing={isEditingFirst}
            onChange={(value) => updateFirstname(value)}
            onEdit={() => startEditing('firstname')}
            onSave={() => handleSave('firstname')}
            onCancel={() => stopEditing()}
          />
          <Line />
          <AccountEditableField
            label='last name'
            value={lastname ?? '-'}
            editing={isEditingLast}
            onChange={(value) => updateLastname(value)}
            onEdit={() => startEditing('lastname')}
            onSave={() => handleSave('lastname')}
            onCancel={() => stopEditing()}
          />
          <Line />
        </>
      )}
    </>
  );
};

export default AccountFields;
