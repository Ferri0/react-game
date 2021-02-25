export default function getRandomCellValue(max) {
  const randomInt = Math.floor(Math.random() * Math.floor(max));
  return randomInt !== 2 || randomInt !== 4 ? 2 : randomInt;
}
