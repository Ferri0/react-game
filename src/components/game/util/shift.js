import getCellValue from './getCellValue';

const shift = {
  horizontal(cellMap, cellProps, destinition) {
    const updatedMap = [];
    cellMap.forEach((inputRow) => {
      let row = inputRow;
      if (destinition === 'right') row = row.slice().reverse();
      for (let i = 0; i < row.length; i += 1) {
        if (
          getCellValue(row[i], cellProps) > 0 &&
          getCellValue(row[i - 1], cellProps) === 0
        ) {
          [row[i], row[i - 1]] = [row[i - 1], row[i]];
          i = 0;
        }
      }
      if (destinition === 'right') row.reverse();
      updatedMap.push(row);
    });
    return updatedMap;
  },

  vertical(cellMap, cellProps, destinition) {
    const updatedMap = cellMap.slice();
    for (let column = 0; column < updatedMap[0].length; column += 1) {
      if (destinition === 'top') {
        for (let i = 0; i < updatedMap.length; i += 1) {
          if (
            i > 0 &&
            getCellValue(updatedMap[i][column], cellProps) > 0 &&
            getCellValue(updatedMap[i - 1][column], cellProps) === 0
          ) {
            [updatedMap[i - 1][column], updatedMap[i][column]] = [
              updatedMap[i][column],
              updatedMap[i - 1][column],
            ];
            i = 0;
          }
        }
      } else if (destinition === 'bottom') {
        for (let i = updatedMap.length - 1; i > -1; i -= 1) {
          if (
            i + 1 < updatedMap.length &&
            getCellValue(updatedMap[i][column], cellProps) > 0 &&
            getCellValue(updatedMap[i + 1][column], cellProps) === 0
          ) {
            [updatedMap[i + 1][column], updatedMap[i][column]] = [
              updatedMap[i][column],
              updatedMap[i + 1][column],
            ];
            i = updatedMap.length - 1;
          }
        }
      }
    }
    return updatedMap;
  },
};

export default shift;
