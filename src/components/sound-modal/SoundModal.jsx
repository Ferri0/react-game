import React from 'react';
import s from './SoundModal.module.scss';

export default function SoundModal(isMusicOn, isMusicConfirmed, confirmMusic) {
  if (isMusicOn && !isMusicConfirmed) {
    return (
      <div className={s.SoundModal}>
        <div className={s.SoundModal_block}>
          Music turned ON. You can disable it in settings
          <button
            className={s.SoundModal_btn}
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
