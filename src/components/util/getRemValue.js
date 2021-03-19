export default function getRemValue() {
  const html = document.documentElement;
  const style = window
    .getComputedStyle(html, null)
    .getPropertyValue('font-size');
  const fontSize = parseFloat(style);
  return fontSize;
}
