/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import s from './ContactsBlock.module.scss';

export default function InfoBlock() {
  return (
    <>
      <input
        type="checkbox"
        id="info-block-radio"
        className={s.ContactsBlock_input}
      />
      <div className={s.ContactsBlock_body}>
        <label htmlFor="info-block-radio" className={s.ContactsBlock_label}>
          Contacts
        </label>
        <div className={s.ContactsBlock_body__block}>
          <a
            href="https://github.com/Ferri0"
            className={s.ContactsBlock_body__text}
            target="_blanc"
          >
            <img
              src="/assets/GitHub-Mark-32px.png"
              className={s.ContactsBlock_body__img}
              alt="github-icon"
            />
            Ferri0 2021
          </a>
          <a
            href="https://github.com/Ferri0/react-game"
            className={s.ContactsBlock_body__text}
            target="_blanc"
          >
            <img
              src="/assets/GitHub-Mark-32px.png"
              className={s.ContactsBlock_body__img}
              alt="github-icon"
            />
            2048 repository
          </a>
          <a
            href="https://rs.school/js/"
            className={s.ContactsBlock_body__text}
            target="_blanc"
          >
            <img
              src="/assets/rs_school_js.svg"
              className={s.ContactsBlock_body__imgRss}
              alt="rss-icon"
            />
            RSSchool
          </a>
        </div>
      </div>
    </>
  );
}
