import addRandomCell from './addRandomCell';

export default function getGameState(boardSize) {
  const numOfCells = boardSize;
  const numOfRows = Math.sqrt(numOfCells);
  let cellProps = [];
  const cellMap = [];
  const gameScore = 0;

  for (let row = 0; row < numOfRows; row += 1) {
    cellMap.push([]);
    for (let cell = row * numOfRows; cell < numOfRows * (row + 1); cell += 1) {
      cellMap[row].push(cell + 1);
    }
  }

  for (let i = 1; i <= numOfCells; i += 1) {
    cellProps.push({ k: i, v: 0 });
  }

  cellProps = addRandomCell(cellProps);
  cellProps = addRandomCell(cellProps);

  const isGameOver = false;
  const isPlayerWon = false;

  return { cellProps, cellMap, gameScore, isGameOver, isPlayerWon };
}
