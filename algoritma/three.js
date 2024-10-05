/*Terdapat dua buah array yaitu array INPUT dan array QUERY, silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT

INPUT = ['xc', 'dz', 'bbb', 'dz']  
QUERY = ['bbb', 'ac', 'dz']  

OUTPUT = [1, 0, 2] karena kata 'bbb' terdapat 1 pada INPUT, kata 'ac' tidak ada pada INPUT, dan kata 'dz' terdapat 2 pada INPUT 
*/

const input = ["xc", "dz", "bbb", "dz"];
const query = ["bbb", "ac", "dz"];

function matching(input, query) {
  let comparison = query.map((item) => {
    let count = 0;
    for (let i = 0; i < input.length; i++) {
      if (item === input[i]) {
        count++;
      }
    }
    return count;
  });
  console.log("🚀 ~ comparison ~ comparison:", comparison);

  return comparison;
}

console.log(matching(input, query));
