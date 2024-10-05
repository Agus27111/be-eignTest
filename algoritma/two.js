/* Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang dari kalimat tersebut, jika ada kata dengan panjang yang sama silahkan ambil salah satu

const sentence = "Saya sangat senang mengerjakan soal algoritma"

longest(sentence) 
// mengerjakan: 11 character

*/

function longest(sentence) {
  let arr = sentence.split(" ");
  let arrCount = arr.map((char) => {
    return char.length;
  });

  let max = Math.max(...arrCount);

  let index = arrCount.indexOf(max);

  console.log(arr[index], `: ${max} character`);
  return arr[index];
}

longest("Saya sangat senang mengerjakan soal algoritma bersamakeluarga");
