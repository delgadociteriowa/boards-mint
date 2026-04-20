interface AccountEditableFieldProps {
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}

const SignUpField = ({
  label,
  type = 'text',
  required = false,
  value,
  onChange,
}: AccountEditableFieldProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <label className='text-stone-600 tracking-[1px] text-sm'>{label}</label>
      <input
        type={type}
        required={required}
        maxLength={50}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='border border-stone-300 rounded-xl py-4 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500'
      />
    </div>
  );
};

export default SignUpField;
