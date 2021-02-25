import shuffleArr from './shuffleArr';
import getRandomCellValue from './getRandomCellValue';

export default function addRandomCell(cellProps) {
  const inputProps = cellProps.slice();
  const shuffledProps = shuffleArr(inputProps);
  const index = shuffledProps.findIndex((prop) => prop.v === 0);
  shuffledProps[index].v = getRandomCellValue(4);
  return shuffledProps.sort((a, b) => a.k - b.k);
}
