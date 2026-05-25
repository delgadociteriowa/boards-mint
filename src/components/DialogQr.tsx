import { Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import DialogQrCode from './DialogQrCode';

const DialogQr = () => {
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (linkCopied) {
      setTimeout(() => {
        setLinkCopied(false);
      }, 8000);
    }
  }, [linkCopied]);

  const handleShare = async () => {
    setLinkCopied(true);
    const currentUrl = window.location.href;
    const roomUrl = currentUrl.replace('id=', 'room=');
    navigator.clipboard.writeText(roomUrl);
  };
  return (
    <>
      <h1 className='text-2xl mb-6'>QR Code</h1>
      <h2 className='text-xl mb-4'>Share this QR code with the guest player</h2>
      <DialogQrCode url={window.location.href.replace('id=', 'room=')} />
      <h2 className='text-xl mb-2'>Or share the game room link</h2>
      <button
        title='Share game'
        className='flex-none flex items-center justify-center text-stone-200 p-1 rounded-full w-auto h-[31px] bg-sky-600 hover:bg-sky-500 cursor-pointer shadow-md mt-4 mb-8 px-6'
        onClick={handleShare}
        disabled={linkCopied}
      >
        {linkCopied ? 'link copied!' : 'copy link'}{' '}
        <Copy className='w-4 h-4 ml-2' />
      </button>
    </>
  );
};

export default DialogQr;
