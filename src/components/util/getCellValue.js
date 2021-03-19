export default function getCellValue(cellKey, cellProps) {
  let result = null;
  cellProps.forEach((cell) => {
    if (cell.k === cellKey) {
      result = cell.v;
    }
  });
  return result;
}
