import React from 'react';
import PropTypes from 'prop-types';

export default function BgCellsSet({ numOfCells }) {
  const staticCellsElems = [];
  for (let i = 0; i < numOfCells; i += 1) {
    staticCellsElems.push(
      <div className="game__cell--wrapper" key={`static cell ${i + 1}`}>
        <div className="game__cell--inner" />
      </div>
    );
  }
  return staticCellsElems;
}

BgCellsSet.propTypes = {
  numOfCells: PropTypes.number.isRequired,
};
