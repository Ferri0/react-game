import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import getRemValue from '../util/getRemValue';
import getCellCords from '../util/getCellCords';

export default function ActiveCellsSet({ cellProps, cellMap, gameBoard }) {
  const cellElemsArray = [];
  let cellSide = null;
  if (+gameBoard === 9) cellSide = getRemValue() * 9.6;
  else if (+gameBoard === 16) cellSide = getRemValue() * 7.2;
  else cellSide = getRemValue() * 5.75;
  cellProps.forEach((props) => {
    const cellCords = getCellCords(props.k, cellMap);
    const cellStyle = {
      position: 'absolute',
      top: cellSide * cellCords.y,
      left: cellSide * cellCords.x,
    };
    if (props.v === 0) {
      cellStyle.animation = 'none';
      cellStyle.transition = 'none';
      cellStyle.visibility = 'hidden';
    }
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
