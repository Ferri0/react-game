import getCellValue from './getCellValue';

const shift = {
  isCellShifted: false,
  left(cellMap, cellProps) {
    this.isCellShifted = false;
    const updatedMap = cellMap.slice();
    const updatedCellProps = cellProps.slice();
    updatedMap.forEach((inputRow, rowIndex) => {
      const row = inputRow;
      for (let i = 0; i < row.length; i += 1) {
        if (
          getCellValue(row[i], updatedCellProps) > 0 &&
          getCellValue(row[i - 1], updatedCellProps) === 0
        ) {
          this.isCellShifted = true;
          [row[i], row[i - 1]] = [row[i - 1], row[i]];
          updatedMap[rowIndex][i] = row[i];
          updatedMap[rowIndex][i - 1] = row[i - 1];
          i = 0;
        } else if (
          getCellValue(row[i], updatedCellProps) ===
            getCellValue(row[i - 1], updatedCellProps) &&
          getCellValue(row[i], updatedCellProps) !== 0
        ) {
          this.isCellShifted = true;
          updatedCellProps.forEach((cellProp, index) => {
            if (row[i - 1] === cellProp.k) {
              updatedCellProps[index] = {
                k: cellProp.k,
                v: getCellValue(row[i - 1], updatedCellProps) * 2,
              };
            } else if (row[i] === cellProp.k) {
              updatedCellProps[index] = { k: cellProp.k, v: 0 };
            }
          });
        }
      }
    });
    return {
      map: updatedMap,
      props: updatedCellProps,
      shifted: this.isCellShifted,
    };
  },

  right(cellMap, cellProps) {
    this.isCellShifted = false;
    const updatedMap = cellMap.slice();
    const updatedCellProps = cellProps.slice();
    updatedMap.forEach((inputRow, rowIndex) => {
      const row = inputRow;
      for (let i = row.length - 1; i >= 0; i -= 1) {
        if (
          getCellValue(row[i], updatedCellProps) > 0 &&
          getCellValue(row[i + 1], updatedCellProps) === 0
        ) {
          this.isCellShifted = true;
          [row[i], row[i + 1]] = [row[i + 1], row[i]];
          updatedMap[rowIndex][i] = row[i];
          updatedMap[rowIndex][i + 1] = row[i + 1];
          i = row.length - 1;
        } else if (
          getCellValue(row[i], updatedCellProps) ===
            getCellValue(row[i + 1], updatedCellProps) &&
          getCellValue(row[i], updatedCellProps) !== 0
        ) {
          this.isCellShifted = true;
          updatedCellProps.forEach((cellProp, index) => {
            if (row[i + 1] === cellProp.k) {
              updatedCellProps[index] = {
                k: cellProp.k,
                v: getCellValue(row[i + 1], updatedCellProps) * 2,
              };
            } else if (row[i] === cellProp.k) {
              updatedCellProps[index] = { k: cellProp.k, v: 0 };
            }
          });
        }
      }
    });
    return {
      map: updatedMap,
      props: updatedCellProps,
      shifted: this.isCellShifted,
    };
  },

  top(cellMap, cellProps) {
    this.isCellShifted = false;
    const updatedMap = cellMap.slice();
    const updatedCellProps = cellProps.slice();
    for (let column = 0; column < updatedMap[0].length; column += 1) {
      for (let i = 0; i < updatedMap.length; i += 1) {
        if (
          i > 0 &&
          getCellValue(updatedMap[i][column], updatedCellProps) > 0 &&
          getCellValue(updatedMap[i - 1][column], updatedCellProps) === 0
        ) {
          this.isCellShifted = true;
          [updatedMap[i - 1][column], updatedMap[i][column]] = [
            updatedMap[i][column],
            updatedMap[i - 1][column],
          ];
          i = 0;
        } else if (
          i > 0 &&
          getCellValue(updatedMap[i][column], updatedCellProps) ===
            getCellValue(updatedMap[i - 1][column], updatedCellProps) &&
          getCellValue(updatedMap[i][column], updatedCellProps) !== 0
        ) {
          this.isCellShifted = true;
          updatedCellProps.forEach((cellProp, index) => {
            if (updatedMap[i - 1][column] === cellProp.k) {
              updatedCellProps[index] = {
                k: cellProp.k,
                v:
                  getCellValue(updatedMap[i - 1][column], updatedCellProps) * 2,
              };
            } else if (updatedMap[i][column] === cellProp.k) {
              updatedCellProps[index] = { k: cellProp.k, v: 0 };
            }
          });
        }
      }
    }
    return {
      map: updatedMap,
      props: updatedCellProps,
      shifted: this.isCellShifted,
    };
  },

  bottom(cellMap, cellProps) {
    this.isCellShifted = false;
    const updatedMap = cellMap.slice();
    const updatedCellProps = cellProps.slice();
    for (let column = 0; column < updatedMap[0].length; column += 1) {
      for (let i = updatedMap.length - 1; i >= 0; i -= 1) {
        if (
          i + 1 < updatedMap.length &&
          getCellValue(updatedMap[i][column], updatedCellProps) > 0 &&
          getCellValue(updatedMap[i + 1][column], updatedCellProps) === 0
        ) {
          this.isCellShifted = true;
          [updatedMap[i + 1][column], updatedMap[i][column]] = [
            updatedMap[i][column],
            updatedMap[i + 1][column],
          ];
          i = updatedMap.length - 1;
        } else if (
          i + 1 < updatedMap.length &&
          getCellValue(updatedMap[i][column], updatedCellProps) ===
            getCellValue(updatedMap[i + 1][column], updatedCellProps) &&
          getCellValue(updatedMap[i][column], updatedCellProps) !== 0
        ) {
          this.isCellShifted = true;
          updatedCellProps.forEach((cellProp, index) => {
            if (updatedMap[i + 1][column] === cellProp.k) {
              updatedCellProps[index] = {
                k: cellProp.k,
                v:
                  getCellValue(updatedMap[i + 1][column], updatedCellProps) * 2,
              };
            } else if (updatedMap[i][column] === cellProp.k) {
              updatedCellProps[index] = { k: cellProp.k, v: 0 };
            }
          });
        }
      }
    }
    return {
      map: updatedMap,
      props: updatedCellProps,
      shifted: this.isCellShifted,
    };
  },
};

export default shift;
