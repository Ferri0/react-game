import shuffleArr from './shuffleArr';
import getRandomCellValue from './getRandomCellValue';

export default function addRandomCell(cellProps) {
  const inputProps = cellProps.slice();
  const shuffledProps = shuffleArr(inputProps);
  const index = shuffledProps.findIndex((prop) => prop.v === 0);
  if (index === -1) return inputProps;
  shuffledProps[index].v = getRandomCellValue();
  return shuffledProps.sort((a, b) => a.k - b.k);
}
