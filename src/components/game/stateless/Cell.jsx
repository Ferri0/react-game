import React from 'react';
import PropTypes from 'prop-types';

function Cell({ cellStyle, cellValue }) {
  return (
    <div className="game__cell--wrapper" style={cellStyle}>
      <div className={`game__cell--inner value-${cellValue}`}>{cellValue}</div>
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
