interface AccountEditableFieldProps {
  label: string;
  value: string;
  editing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (value: string) => void;
};

const AccountEditableField = ({
  label,
  value,
  editing,
  onChange,
  onEdit,
  onSave,
  onCancel,
}: AccountEditableFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-stone-600 tracking-[1px] text-sm">
        {label}
      </label>

      <div className="flex items-center justify-between">
        {editing ? (
          <input
            maxLength={50}
            className="border border-stone-300 rounded-xl py-3 px-4 text-stone-700 focus:outline-none focus:ring-2 focus:ring-sky-500 w-full"
            value={value}
            onChange={(e) => {
              const onlyLetters = e.target.value.replace(/[0-9]/g, "");
              onChange(onlyLetters);
            }}
          />
        ) : (
          <p className="text-stone-700 text-lg">{value}</p>
        )}

        {!editing ? (
          <button
            className="bg-sky-600 hover:bg-sky-500 text-stone-100 px-5 py-2 rounded-xl ml-4 cursor-pointer"
            onClick={onEdit}
          >
            edit
          </button>
        ) : (
          <div className="flex items-center gap-1 shrink-0">
            <button
              className="bg-sky-600 hover:bg-sky-500 text-stone-100 px-5 py-2 rounded-xl ml-4 cursor-pointer"
              onClick={onSave}
            >
              save
            </button>
            <button
              className="bg-rose-600 hover:bg-rose-500 text-stone-100 px-5 py-2 rounded-xl cursor-pointer"
              onClick={onCancel}
            >
              cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountEditableField;