/*
Silahkan cari hasil dari pengurangan dari jumlah diagonal sebuah matrik NxN Contoh:
Contoh:
Matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]

diagonal pertama = 1 + 5 + 9 = 15 
diagonal kedua = 0 + 5 + 7 = 12 

maka hasilnya adalah 15 - 12 = 3

*/

const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

function diagonalDifference(matrix) {
  let firstDiagonal = 0;
  let secondDiagonal = 0;
  for (let i = 0; i < matrix.length; i++) {
    firstDiagonal += matrix[i][i];
    secondDiagonal += matrix[i][matrix.length - i - 1];
  }
  return Math.abs(firstDiagonal - secondDiagonal);
}

console.log(diagonalDifference(matrix));
