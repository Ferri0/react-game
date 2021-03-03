/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

export default function InfoBlock() {
  return (
    <>
      <input
        type="checkbox"
        id="info-block-radio"
        className="info-block__input"
      />
      <div className="info-block__body">
        <label htmlFor="info-block-radio" className="info-block__label">
          Contacts
        </label>
        <div className="info-block__body--block">
          <a
            href="https://github.com/Ferri0"
            className="info-block__body--text"
            target="_blanc"
          >
            <img
              src="/assets/GitHub-Mark-32px.png"
              className="info-block__body--img"
              alt="github-icon"
            />
            Ferri0 2021
          </a>
          <a
            href="https://github.com/Ferri0/react-game"
            className="info-block__body--text"
            target="_blanc"
          >
            <img
              src="/assets/GitHub-Mark-32px.png"
              className="info-block__body--img"
              alt="github-icon"
            />
            2048 repository
          </a>
          <a
            href="https://rs.school/js/"
            className="info-block__body--text"
            target="_blanc"
          >
            <img
              src="/assets/rs_school_js.svg"
              className="info-block__body--img-rss"
              alt="rss-icon"
            />
            RSSchool
          </a>
        </div>
      </div>
    </>
  );
}
