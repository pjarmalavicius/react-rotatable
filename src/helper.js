export function getTransformMatrix(element) {
  const matrix = window.getComputedStyle(element).transform;
  let matrixArray = [0, 0, 0, 0, 0, 0];

  if (matrix && matrix !== 'none') {
    matrixArray = matrix
      .replace('matrix(', '')
      .replace(')', '')
      .replace(',', '')
      .split(' ')
      .map(value => parseFloat(value));
  }

  return matrixArray;
}
