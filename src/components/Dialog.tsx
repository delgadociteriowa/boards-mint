import { X } from 'lucide-react';
import Line from './Line';

interface DialogProps {
  children: React.ReactNode;
  reference: React.RefObject<HTMLDialogElement | null>;
}

const Dialog = ({ children, reference }: DialogProps) => {
  const closeModal = () => {
    reference.current?.close();
  };

  return (
    <dialog
      ref={reference}
      className='rounded-xl p-6 backdrop:bg-black/40 w-[90%] md:w-[500px] h-[75%] md:h-[600px] mx-auto my-18 overflow-hidden bg-stone-50 text-stone-600'
      onCancel={(e) => {
        e.preventDefault();
        closeModal();
      }}
      onClick={(e) => {
        const dialog = reference.current;
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
      <div className='h-full overflow-y-auto p-2 flex flex-col'>
        <div className='flex-1 overflow-y-auto'>{children}</div>
        <Line />
        <button
          title='Close'
          className='mt-4 ml-auto mr-2 flex items-center justify-center text-stone-200 px-1 py-1 rounded-full w-[31px] h-[31px] bg-sky-600 hover:bg-sky-500 cursor-pointer shadow-md'
          onClick={closeModal}
        >
          <X className='w-10 h-10' />
        </button>
      </div>
    </dialog>
  );
};

export default Dialog;
