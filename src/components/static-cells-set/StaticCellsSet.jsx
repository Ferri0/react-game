import React from 'react';
import PropTypes from 'prop-types';
import './StaticCellsSet.scss';

export default function StaticCellsSet({ numOfCells }) {
  const staticCellsElems = [];
  for (let i = 0; i < numOfCells; i += 1) {
    staticCellsElems.push(
      <div
        className={`static-cells-set__cell-wrapper static-cells-set__cell-wrapper--${numOfCells}`}
        key={`static cell ${i + 1}`}
      >
        <div
          className={`static-cells-set__cell-inner static-cells-set__cell-inner--${numOfCells}`}
        />
      </div>
    );
  }
  return staticCellsElems;
}

StaticCellsSet.propTypes = {
  numOfCells: PropTypes.number.isRequired,
};
