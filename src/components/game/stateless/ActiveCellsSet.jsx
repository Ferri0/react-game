import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import getRemValue from '../util/getRemValue';

export default function ActiveCellsSet({ gameState }) {
  const cellElemsArray = [];
  const cellSide = getRemValue() * 7.2;
  for (let y = 0; y < gameState.length; y += 1) {
    cellElemsArray.push(
      gameState[y].map((cellValue, x) => {
        const cellStyle = {
          position: 'absolute',
          top: cellSide * y,
          left: cellSide * x,
        };
        return (
          <Cell
            cellValue={cellValue}
            cellStyle={cellStyle}
            key={`top:${cellStyle.top} left:${cellStyle.left}`}
          />
        );
      })
    );
  }
  return cellElemsArray;
}

ActiveCellsSet.propTypes = {
  gameState: PropTypes.arrayOf(PropTypes.array).isRequired,
};
