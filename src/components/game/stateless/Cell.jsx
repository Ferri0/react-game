import React from 'react';
import PropTypes from 'prop-types';

export default function Cell({ cellStyle, cellValue }) {
  if (cellValue !== 0) {
    return (
      <div className="game__cell--wrapper" style={cellStyle}>
        <div className={`game__cell--inner value-${cellValue}`}>
          {cellValue}
        </div>
      </div>
    );
  }
  return null;
}

Cell.propTypes = {
  cellStyle: PropTypes.shape({
    position: PropTypes.string.isRequired,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }).isRequired,
  cellValue: PropTypes.number.isRequired,
};
