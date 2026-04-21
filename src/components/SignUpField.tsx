interface AccountEditableFieldProps {
  label: string;
  type?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  value: string;
  onChange: (value: string) => void;
  noNumber?: boolean;
}

const SignUpField = ({
  label,
  type = 'text',
  required = false,
  minLength = 3,
  maxLength = 50,
  value,
  onChange,
  noNumber = false,
}: AccountEditableFieldProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <label className='text-stone-600 tracking-[1px] text-sm'>{label}</label>
      <input
        type={type}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        onChange={(e) => {
          onChange(
            noNumber ? e.target.value.replace(/[0-9]/g, '') : e.target.value,
          );
        }}
        className='border border-stone-300 rounded-xl py-4 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500'
      />
    </div>
  );
};

export default SignUpField;
