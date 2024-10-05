// Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"

function reverseAlphabet(string) {
  let arr = string.split("");

  let arrType = arr.map((char) => {
    !isNaN(char) ? (char = Number(char)) : (char = char);
    return char;
  });

  let newArr = [];
  arrType.forEach((char, i) => {
    if (typeof char === "number") {
      newArr.push(char);
    } else {
      newArr[arrType.length - 1 - i] = char;
    }
  });

  newArr = newArr.filter((item) => item !== undefined);

  return newArr.join("");
}

reverseAlphabet("NEGIE1");
console.log("🚀 ~ reverseAlphabet:", 'reverseAlphabet("NEGIE1")');
console.log("🚀 ~ reverseAlphabet:", reverseAlphabet("NEGIE1"));
