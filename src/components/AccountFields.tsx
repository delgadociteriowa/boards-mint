import AccountEditableField from './AccountEditableField';
import AccountField from './AccountField';
import Line from './Line';

interface AccountFieldsProps {
  userName: string;
  email: string;
  firstname: string;
  lastname: string;
  isEditingFirst: boolean;
  isEditingLast: boolean;
  updateFirstname: (value: string) => void;
  updateLastname: (value: string) => void;
  startEditing: (value: 'firstname' | 'lastname') => void;
  stopEditing: () => void;
  handleSave: (value: 'firstname' | 'lastname') => void;
}

const AccountFields = ({
  userName,
  email,
  firstname,
  lastname,
  isEditingFirst,
  isEditingLast,
  updateFirstname,
  updateLastname,
  startEditing,
  stopEditing,
  handleSave,
}: AccountFieldsProps) => {
  return (
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
  );
};

export default AccountFields;
