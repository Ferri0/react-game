/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import s from './FullScreenBtn.module.scss';

function launchFullScreen() {
  const element = document.getElementById('root');
  if (element.requestFullScreen) {
    element.requestFullScreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}

function cancelFullscreen() {
  if (document.cancelFullScreen) {
    document.cancelFullScreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  }
}

function toggleFullScreenMode(e) {
  if (e.target.classList.contains(s.FullScreenBtn__off)) {
    cancelFullscreen();
  } else {
    launchFullScreen();
  }
  e.target.classList.toggle(s.FullScreenBtn__on);
  e.target.classList.toggle(s.FullScreenBtn__off);
}

export default function FullScreenBtn() {
  return (
    <button
      type="button"
      onClick={(e) => {
        toggleFullScreenMode(e);
      }}
      className={[s.FullScreenBtn, s.FullScreenBtn__on].join(' ')}
    />
  );
}
