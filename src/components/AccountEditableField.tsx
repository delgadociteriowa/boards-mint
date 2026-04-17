interface AccountEditableFieldProps {
  label: string;
  value: string;
  editing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onChange: (value: string) => void;
};

const AccountEditableField = ({
  label,
  value,
  editing,
  onEdit,
  onSave,
  onChange,
}: AccountEditableFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-stone-600 tracking-[1px] text-sm">
        {label}
      </label>

      <div className="flex items-center justify-between">
        {editing ? (
          <input
            className="border border-stone-300 rounded-xl py-3 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500 w-full"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <p className="text-stone-700 text-lg">{value}</p>
        )}

        <button
          className="bg-sky-600 hover:bg-sky-500 text-stone-100 px-5 py-2 rounded-xl ml-4 cursor-pointer"
          onClick={editing ? onSave : onEdit}
        >
          {editing ? "save" : "edit"}
        </button>
      </div>
    </div>
  );
};

export default AccountEditableField;