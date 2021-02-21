import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ className, onClick, innerText }) {
  return (
    <button className={className} onClick={onClick} type="button">
      {innerText}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  innerText: PropTypes.string.isRequired,
};
