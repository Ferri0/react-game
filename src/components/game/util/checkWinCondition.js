export default function checkWinCondition(winNum, { cellProps }) {
  for (let i = 0; i < cellProps.length; i += 1) {
    if (cellProps[i].v >= winNum) return true;
  }
  return false;
}
