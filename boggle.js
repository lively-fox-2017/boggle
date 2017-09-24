const data = require('./data');

class Boggle {
  constructor(size) {
    this.boardElement = [];
    for (let i = 0; i < size; i++) {
      let row = [];
      for (let j = 0; j < size; j++) {
        row.push(String.fromCharCode(65 + Math.floor(Math.random() * 26)));
      }
      this.boardElement.push(row);
    }
  }

  printBoard() {
    let str = '';
    let rowLength = 0;
    for (let i = 0; i < this.boardElement.length; i++) {
      for (let j = 0; j < this.boardElement.length; j++) {
        if (j !== this.boardElement.length - 1) {
          str += ' ' + this.boardElement[i][j] + ' | ';
        } else {
          str += ' ' + this.boardElement[i][j] + ' ';
        }
      }
      if (i === 0)
        rowLength = str.length;
      str += "\n";
      str += "-".repeat(rowLength) + "\n";
    }
    str = "-".repeat(rowLength) + "\n" + str;
    return str;
  }
}

let game = new Boggle(5);
console.log(game.printBoard());
