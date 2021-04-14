import React from 'react';
import PropTypes from 'prop-types';
import s from './Cell.module.scss';

function Cell({ cellStyle, cellValue, boardSize }) {
  const cellStyleInner = [];
  if (cellValue === 2 || cellValue === 4) {
    cellStyleInner.push(s.appear);
  }
  return (
    <div
      // prettier-ignore
      className={[s.cellWrapper, s[`cellWrapper__boardSize${boardSize}`]].join(' ')}
      style={cellStyle}
    >
      <div
        className={[
          s.cellInner,
          s[`value-${cellValue}`],
          s[`cellInner__boardSize${boardSize}`],
          cellStyleInner,
        ].join(' ')}
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
  boardSize: PropTypes.number.isRequired,
};

const getCell = React.memo(Cell);
export default getCell;
