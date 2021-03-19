/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import './FullScreenBtn.scss';

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
  if (e.target.classList.contains('full-screen-btn--off')) {
    cancelFullscreen();
  } else {
    launchFullScreen();
  }
  e.target.classList.toggle('full-screen-btn--on');
  e.target.classList.toggle('full-screen-btn--off');
}

export default function FullScreenBtn() {
  return (
    <button
      type="button"
      onClick={(e) => {
        toggleFullScreenMode(e);
      }}
      className="full-screen-btn full-screen-btn--on"
    />
  );
}
