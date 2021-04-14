import React from 'react';
import s from './SoundModal.module.scss';

export default function SoundModal(isMusicOn, isMusicConfirmed, confirmMusic) {
  if (isMusicOn && !isMusicConfirmed) {
    return (
      <div className={s.soundModalWrapper}>
        <div className={s.soundModalBlock}>
          Music turned ON. You can disable it in settings
          <button
            className={s.soundModalBtn}
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
