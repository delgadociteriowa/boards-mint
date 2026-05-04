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
      </ul>
      <h2 className='text-xl mb-2'>Saving a game</h2>
      <ul className='list-disc pl-5 mb-6'>
        <li>You can save up to four games to continue later.</li>
        <li>You’ll need to create a free account to use this feature.</li>
        <li>To save a game, just click the Save button below the board.</li>
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
          Then, once your game is saved, click on “online room” to start an
          online session.
        </li>
        <li>
          A share link will be copied to your clipboard. If it isn’t, click the
          "share" button below the board to copy it and then send it to a
          friend.
        </li>
        <li>
          Once your friend opens the link you sent, you can start playing
          online.
        </li>
        <li>To end the online session, just click the “end” button.</li>
      </ul>
    </>
  );
};

export default DialogHowto;
