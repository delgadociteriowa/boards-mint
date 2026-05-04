interface DialogProps {
  children: React.ReactNode;
  ref: React.RefObject<HTMLDialogElement | null>;
}

const Dialog = ({ children, ref }: DialogProps) => {
  const closeModal = () => {
    ref.current?.close();
  };

  return (
    <dialog
      ref={ref}
      className='rounded-xl p-6 backdrop:bg-black/40 w-[90%] md:w-[500px] h-[75%] md:h-[700px] mx-auto my-18 overflow-hidden bg-stone-50 text-stone-600'
      onCancel={(e) => {
        e.preventDefault();
        closeModal();
      }}
      onClick={(e) => {
        const dialog = ref.current;
        if (!dialog) return;

        const rect = dialog.getBoundingClientRect();
        const isInDialog =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (!isInDialog) {
          closeModal();
        }
      }}
    >
      <div className='h-full overflow-y-auto p-2'>
        {children}
        <button
          onClick={closeModal}
          className='flex-none text-stone-100 px-6 py-1 rounded-full bg-sky-600 hover:bg-sky-500 cursor-pointer'
        >
          close
        </button>
      </div>
    </dialog>
  );
};

export default Dialog;
