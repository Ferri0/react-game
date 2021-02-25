export default function getRandomCellValue() {
  const maxValue = 5;
  const randomInt = Math.floor(Math.random() * Math.floor(maxValue));
  return randomInt !== 4 ? 2 : randomInt;
}
