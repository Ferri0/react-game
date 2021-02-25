import React from 'react';
import PropTypes from 'prop-types';

function Cell({ cellStyle, cellValue }) {
  const cellStyleInner = { animation: 'none' };
  if (cellValue === 2 || cellValue === 4) {
    cellStyleInner.animation = 'appear';
    cellStyleInner.animationDuration = '0.075s';
  }
  return (
    <div className="game__cell--wrapper" style={cellStyle}>
      <div
        style={cellStyleInner}
        className={`game__cell--inner value-${cellValue}`}
      >
        {cellValue}
      </div>
    </div>
  );
}

Cell.propTypes = {
  cellStyle: PropTypes.shape({
    position: PropTypes.string.isRequired,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }).isRequired,
  cellValue: PropTypes.number.isRequired,
};

const getCell = React.memo(Cell);
export default getCell;
