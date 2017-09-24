class Boggle {
  constructor(word) {
    this.word = word;
    this.boardSave = [];
  }

  shake(row, col) {
    let abjad = 'abcdefghijklmnopqrstuvwxyz';
    // let abjad = ['j','o','b','g','e','t','z','e','b','r','a'];
    let abj = abjad.split('')
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 4; j++) {
        let random = Math.floor(Math.random(0)*abj.length);
        row.push(abjad[random].toUpperCase());
      }
      this.boardSave.push(row);
    }
    return this.boardSave;
  }

  boardTes(){
    let tes = [['J', 'B', 'O', 'G'],
               ['O', 'G', 'T', 'R'],
               ['E', 'B', 'E', 'G'],
               ['Z', 'R', 'A', 'N']]
    return tes;
  }

  solve() {
    let word = this.word;
    let board = this.boardSave;
    let temp = []
    debugger
    for (let i = 0; i < word.length; i++) {
      for (let j = 0; j < board.length; j++) {
        for (let k = 0; k < board.length; k++) {
          if(word[i][0] == board[j][k]){
            temp.push(board[j][k])
          }
        }
      }
    }
    return temp
  }
}

let testCase = require("./data.js");

let wordTes = ['GET', 'JOB', 'ZEBRA']; // word buat tes

let game = new Boggle(wordTes);
// let game = new Boggle(testCase.word); // word dari file

console.log('Board Boggle');
console.log(game.shake());
console.log('\nWord');
console.log(game.solve());
