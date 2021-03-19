/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './ContactsBlock.scss';

export default function InfoBlock() {
  return (
    <>
      <input
        type="checkbox"
        id="info-block-radio"
        className="contacts-block__input"
      />
      <div className="contacts-block__body">
        <label htmlFor="info-block-radio" className="contacts-block__label">
          Contacts
        </label>
        <div className="contacts-block__body--block">
          <a
            href="https://github.com/Ferri0"
            className="contacts-block__body--text"
            target="_blanc"
          >
            <img
              src="/assets/GitHub-Mark-32px.png"
              className="contacts-block__body--img"
              alt="github-icon"
            />
            Ferri0 2021
          </a>
          <a
            href="https://github.com/Ferri0/react-game"
            className="contacts-block__body--text"
            target="_blanc"
          >
            <img
              src="/assets/GitHub-Mark-32px.png"
              className="contacts-block__body--img"
              alt="github-icon"
            />
            2048 repository
          </a>
          <a
            href="https://rs.school/js/"
            className="contacts-block__body--text"
            target="_blanc"
          >
            <img
              src="/assets/rs_school_js.svg"
              className="contacts-block__body--img-rss"
              alt="rss-icon"
            />
            RSSchool
          </a>
        </div>
      </div>
    </>
  );
}
