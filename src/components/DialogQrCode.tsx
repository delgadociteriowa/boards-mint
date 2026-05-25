'use client';

import { QRCodeSVG } from 'qrcode.react';

interface DialogQrCodeProps {
  url: string;
}

const DialogQrCode = ({ url }: DialogQrCodeProps) => {
  return (
    <div className='flex justify-center items-center my-6'>
      <QRCodeSVG
        value={url}
        size={200}
        bgColor='#ffffff'
        fgColor='#000000'
        level='H'
      />
    </div>
  );
};

export default DialogQrCode;
