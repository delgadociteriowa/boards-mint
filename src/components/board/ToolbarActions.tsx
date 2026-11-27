import {
  CircleHelp,
  Globe,
  GlobeOff,
  LogOut,
  QrCode,
  RotateCcw,
  Save,
} from 'lucide-react';

interface ToolbarActionsProps {
  session: boolean;
  roomId: string | null;
  socketActive: boolean;
  phaseTwo: boolean;
  shareDelay: boolean;
  activeToast: boolean;
  updatedAt: string | null;
  saving: boolean;
  onSave: () => void;
  onToggleOnline: () => void;
  onOpenQr: () => void;
  onRestart: () => void;
  onLeaveRoom: () => void;
  onOpenHelp: () => void;
}

const ToolbarActions = ({
  session,
  roomId,
  socketActive,
  phaseTwo,
  shareDelay,
  activeToast,
  updatedAt,
  saving,
  onSave,
  onToggleOnline,
  onOpenQr,
  onRestart,
  onLeaveRoom,
  onOpenHelp,
}: ToolbarActionsProps) => {
  return (
    <div className='toolsbar-main'>
      {session && !roomId && (
        <>
          <button
            title='Save game'
            className='toolsbar-btn'
            onClick={onSave}
            disabled={activeToast}
          >
            <Save className='w-5 h-5' />
          </button>

          <button
            title={socketActive ? 'Go offline' : 'Online game'}
            className='toolsbar-btn'
            onClick={onToggleOnline}
            disabled={phaseTwo || shareDelay || activeToast}
          >
            {socketActive ? (
              <GlobeOff className='w-5 h-5' />
            ) : (
              <Globe className='w-5 h-5' />
            )}
          </button>

          {socketActive && (
            <button
              title='Share game'
              className='toolsbar-btn'
              onClick={onOpenQr}
              disabled={activeToast}
            >
              <QrCode className='w-5 h-5' />
            </button>
          )}

          {updatedAt && (
            <span className='toolsbar-saved-status'>
              {saving ? 'Saving...' : `Last Saved: ${updatedAt}`}
            </span>
          )}
        </>
      )}

      {!roomId && (
        <button
          title='Restart game'
          className='toolsbar-btn'
          disabled={activeToast}
          onClick={onRestart}
        >
          <RotateCcw className='w-5 h-5' />
        </button>
      )}

      {roomId && (
        <button
          title='Leave game'
          className='toolsbar-btn'
          onClick={onLeaveRoom}
          disabled={activeToast}
        >
          <LogOut className='w-5 h-5' />
        </button>
      )}

      <button
        title='Help'
        className='toolsbar-btn'
        onClick={onOpenHelp}
        disabled={activeToast}
      >
        <CircleHelp className='w-10 h-10' />
      </button>
    </div>
  );
};

export default ToolbarActions;
