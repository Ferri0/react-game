import React from 'react';
import s from './Title.module.scss';

export default function Title(title) {
  return <div className={s.Title}>{title}</div>;
}
