
const Dict = require('./data');

class Boggle {
  constructor() {
    this.arr = [];
  }

  shake(number) {
    let words = 'abcdefghijklmnopqrstuvwxyz';
    for (let x = 0; x < number; x++) {
      this.arr[x] = [];
      for (let y = 0; y < number; y++) {
        this.arr[x][y] = (words.toUpperCase()[Math.floor(Math.random() * words.length)]);
      }
    }

    return this.arr;
  }

}

let boggleGame = new Boggle();
let dict = new Dict();

// boggleGame.shake(4);
console.log(boggleGame.shake(4));
// console.log(dict.dictionary());
