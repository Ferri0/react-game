import getCellValue from './getCellValue';

export default function checkLoseCondition({ cellMap, cellProps }) {
  for (let i = 0; i < cellProps.length; i += 1) {
    if (cellProps[i].v === 0) return false;
  }
  for (let column = 0; column < cellMap[0].length; column += 1) {
    for (let row = 0; row < cellMap.length; row += 1) {
      const currentCellValue = getCellValue(cellMap[row][column], cellProps);
      const upperCellValue =
        cellMap[row + 1] === undefined
          ? -1
          : getCellValue(cellMap[row + 1][column], cellProps);
      if (currentCellValue === upperCellValue || upperCellValue === 0) {
        return false;
      }
      const rightCellValue = getCellValue(cellMap[row][column + 1], cellProps);
      if (currentCellValue === rightCellValue || rightCellValue === 0) {
        return false;
      }
      const bottomCellValue =
        cellMap[row - 1] === undefined
          ? -1
          : getCellValue(cellMap[row - 1][column], cellProps);
      if (currentCellValue === bottomCellValue || bottomCellValue === 0) {
        return false;
      }
      const leftCellValue = getCellValue(cellMap[row][column - 1], cellProps);
      if (currentCellValue === leftCellValue || leftCellValue === 0) {
        return false;
      }
    }
  }
  return true;
}
