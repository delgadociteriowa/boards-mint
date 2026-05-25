import { Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import DialogQrCode from './DialogQrCode';

const DialogQr = () => {
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (linkCopied) {
      setTimeout(() => {
        setLinkCopied(false);
      }, 5000);
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
      <h1 className='text-2xl mb-3 text-center'>QR Code</h1>
      <p className='block mb-4 text-center'>Share this code to play online</p>
      <DialogQrCode url={window.location.href.replace('id=', 'room=')} />
      <p className='block text-center'>Or share the game room link</p>
      <button
        title='Share game'
        className='flex-none flex items-center justify-center text-stone-200 p-1 rounded-full w-auto h-[31px] bg-teal-600 hover:bg-teal-500 cursor-pointer shadow-md mt-2 mb-4 px-6 mx-auto'
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
