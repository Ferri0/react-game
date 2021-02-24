import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import getRemValue from '../util/getRemValue';
import getCellCords from '../util/getCellCords';

export default function ActiveCellsSet({ cellProps, cellMap }) {
  const cellElemsArray = [];
  const cellSide = getRemValue() * 7.2;
  cellProps.forEach((props) => {
    const cellCords = getCellCords(props.k, cellMap);
    let cellVisibility = 'visible';
    if (props.v === 0) cellVisibility = 'hidden';
    const cellStyle = {
      visibility: cellVisibility,
      position: 'absolute',
      top: cellSide * cellCords.y,
      left: cellSide * cellCords.x,
    };
    cellElemsArray.push(
      <Cell cellValue={props.v} cellStyle={cellStyle} key={props.k} />
    );
  });
  return cellElemsArray;
}

ActiveCellsSet.propTypes = {
  cellProps: PropTypes.arrayOf(
    PropTypes.shape({
      k: PropTypes.number.isRequired,
      v: PropTypes.number.isRequired,
    })
  ).isRequired,
  cellMap: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number.isRequired).isRequired
  ).isRequired,
};
