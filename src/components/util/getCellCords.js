export default function getCellCords(cellKey, cellsMap) {
  const cellCords = { y: null, x: null };

  for (let yCord = 0; yCord < cellsMap.length; yCord += 1) {
    const xCord = cellsMap[yCord].indexOf(cellKey);
    if (xCord !== -1) {
      cellCords.x = xCord;
      cellCords.y = yCord;
    }
  }

  if (cellCords.y === null || cellCords.x === null) {
    throw new Error(
      'Error in getCellCords function, wrong output value generated'
    );
  }

  return cellCords;
}
