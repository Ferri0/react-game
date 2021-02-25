export default function shuffleArr(input) {
  const shuffledArr = input;
  for (let i = shuffledArr.length - 1; i >= 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const itemAtIndex = shuffledArr[randomIndex];
    shuffledArr[randomIndex] = shuffledArr[i];
    shuffledArr[i] = itemAtIndex;
  }
  return shuffledArr;
}
