import { Copy, Globe, GlobeOff, LogOut, RefreshCcw, Save } from 'lucide-react';

const DialogHowto = () => {
  return (
    <>
      <h1 className='text-2xl mb-6'>How to use this board</h1>
      <h2 className='text-xl mb-2'>Welcome!</h2>
      <p className='mb-4'>
        This board is a convenient alternative to a physical one. To get the
        most out of it, please follow the guide below:
      </p>
      <ul className='list-disc pl-5 mb-6'>
        <li>
          The game pieces can be moved freely at any time and anywhere, without
          restrictions.
        </li>
        <li>
          To move a piece, click on it to select it, then click on the desired
          destination.
        </li>
        <li>
          You don't need to drag the pieces, the board works with single clicks.
        </li>
        <li>
          The darker spaces represent the bench, where discarded pieces are
          placed.
        </li>
        <li>
          If you select an occupied space, your piece will be placed there, and
          the previous piece will automatically move to the bench.
        </li>
        <li>
          You can also move pieces to and from the bench. There are no
          restrictions.
        </li>
        <li>
          To restart the game, just click on the restart button:{' '}
          <span className='m-3 flex items-center justify-center text-stone-200 p-1 rounded-full w-[31px] h-[31px] bg-sky-600 shadow-md'>
            <RefreshCcw className='w-5 h-5' />
          </span>{' '}
          (This option is not available for guests in online rooms).
        </li>
      </ul>
      <h2 className='text-xl mb-2'>Saving a game</h2>
      <ul className='list-disc pl-5 mb-6'>
        <li>You can save up to four games to continue later.</li>
        <li>You’ll need to create a free account to use this feature.</li>
        <li>
          To save a game, just click the save button:{' '}
          <span className='m-3 flex items-center justify-center text-stone-200 p-1 rounded-full w-[31px] h-[31px] bg-sky-600 shadow-md'>
            <Save className='w-5 h-5' />
          </span>{' '}
        </li>
        <li>
          You can continue later by going to “account / more options / saved
          games.”
        </li>
      </ul>
      <h2 className='text-xl mb-2'>How to play online</h2>
      <ul className='list-disc pl-5 mb-6'>
        <li>You can start an online session to play with a friend.</li>
        <li>You’ll need to create a free account to use this feature.</li>
        <li>To start an online session, you’ll need to save the game first.</li>
        <li>
          Then, once your game is saved, click on the globe button to start an
          online session:{' '}
          <span className='m-3 flex items-center justify-center text-stone-200 p-1 rounded-full w-[31px] h-[31px] bg-sky-600 shadow-md'>
            <Globe className='w-5 h-5' />
          </span>{' '}
        </li>
        <li>
          A share link will be copied to your clipboard. If it isn’t, click the
          copy button:{' '}
          <span className='m-3 flex items-center justify-center text-stone-200 p-1 rounded-full w-[31px] h-[31px] bg-sky-600 shadow-md'>
            <Copy className='w-4 h-4' />
          </span>{' '}
          to copy it and then send it to a friend.
        </li>
        <li>
          Once your friend opens the link you sent, you can start playing
          online.
        </li>
        <li>
          To end the online session, just click on the disconnect button:{' '}
          <span className='m-3 flex items-center justify-center text-stone-200 p-1 rounded-full w-[31px] h-[31px] bg-sky-600 shadow-md'>
            <GlobeOff className='w-5 h-5' />
          </span>{' '}
        </li>
        <li>
          If you’re playing as a guest and want to leave the game, just click
          the exit button:{' '}
          <span className='m-3 flex items-center justify-center text-stone-200 p-1 rounded-full w-[31px] h-[31px] bg-sky-600 shadow-md'>
            <LogOut className='w-5 h-5' />
          </span>{' '}
        </li>
      </ul>
    </>
  );
};

export default DialogHowto;
