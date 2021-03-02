import React from 'react';

export default function SoundModal(isMusicOn, isMusicConfirmed, confirmMusic) {
  if (isMusicOn && !isMusicConfirmed) {
    return (
      <div className="sound-modal--bg">
        <div className="sound-modal--block">
          Music turned ON. You can disable it in settings
          <button
            className="sound-modal--button"
            onClick={confirmMusic}
            type="button"
          >
            OK
          </button>
        </div>
      </div>
    );
  }
  return null;
}
