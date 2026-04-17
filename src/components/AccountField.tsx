interface AccountFieldProps {
  label: string;
  value: string;
};

const AccountField = ({
  label,
  value,
}: AccountFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-stone-600 tracking-[1px] text-sm">{label}</label>
      <div className="flex items-center justify-between">
        <p className="text-stone-700 text-lg">{value ?? "-"}</p>
      </div>
    </div>
  );
};

export default AccountField;