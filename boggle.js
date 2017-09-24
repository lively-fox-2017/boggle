"use strict"

var words = require('./data.js')

class Boggle {
  constructor() {
    this.arr = [] // in form of 2D
    this.size = 0
    this.xyPos = [0, 0]
    this.xySts = true
    this.found = []
  }

  boardX() {
    this.size = 4
    let i = 0
    let kata = 'MUDAAKAGBANKICAPU'
    for (let r = 0; r < 4; r++) {
      let arrRow = []
      for (let c = 0; c < 4; c++) {
        arrRow.push(kata[i])
        i++
      }
      this.arr.push(arrRow)
    }
  }

  shake(size) {
    this.size = size
    for (let r = 0; r < size; r++) {
      let arrRow = []
      for (let c = 0; c < size; c++) {
        let acak = String.fromCharCode(65 + Math.floor(Math.random() * 26))
        arrRow.push(acak)
      }
      this.arr.push(arrRow)
    }

  }

  printBoard() {
    console.log('='.repeat(this.size * 4 + 1));
    for (let r = 0; r < this.size; r++) {
      let rBoard = ''
      for (let c = 0; c < this.size; c++) {
        rBoard += '| ' + this.arr[r][c] + ' '
      }
      rBoard += '|'
      console.log(rBoard);
      console.log('='.repeat(this.size * 4 + 1));
    }

  }
  ///basic movement
  moveUU(row, col) {
    this.xyPos[0] = row - 1
    this.xyPos[1] = col
    this.xySts = (this.xyPos[0] < 0) ? false : true
    return this.xySts
  }
  moveDD(row, col) {
    this.xyPos[0] = row + 1
    this.xyPos[1] = col
    this.xySts = (this.xyPos[0] > this.size - 1) ? false : true
    return this.xySts
  }
  moveRR(row, col) {
    this.xyPos[0] = row
    this.xyPos[1] = col + 1
    this.xySts = (this.xyPos[1] > this.size - 1) ? false : true
    return this.xySts
  }
  moveLL(row, col) {
    this.xyPos[0] = row
    this.xyPos[1] = col - 1
    this.xySts = (this.xyPos[1] < 0) ? false : true
    return this.xySts
  }

  ///diagonal movement
  moveUR(row, col) {
    this.xyPos[0] = row - 1
    this.xyPos[1] = col + 1
    this.xySts = (this.xyPos[0] < 0 || this.xyPos[1] > this.size - 1) ? false : true
    return this.xySts
  }
  moveDR(row, col) {
    this.xyPos[0] = row + 1
    this.xyPos[1] = col + 1
    this.xySts = (this.xyPos[0] > this.size - 1 || this.xyPos[1] > this.size - 1) ? false : true
    return this.xySts
  }
  moveUL(row, col) {
    this.xyPos[0] = row - 1
    this.xyPos[1] = col - 1
    this.xySts = (this.xyPos[0] < 0 || this.xyPos[1] < 0) ? false : true
    return this.xySts
  }
  moveDL(row, col) {
    this.xyPos[0] = row + 1
    this.xyPos[1] = col - 1
    this.xySts = (this.xyPos[0] > this.size - 1 || this.xyPos[1] < 0) ? false : true
    return this.xySts
  }

  search(word) {
    let kata = [] //tampung huruf
    let i = 0
    let cari = true

    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        if (this.arr[r][c] == word[i]) {
          let k = []
          k.push(word[i])
          k.push(String(r) + String(c))
          k.push(1)
          kata.push(k)

          while (i < word.length - 1) {

            let row = Number(kata[i][1][0])
            let col = Number(kata[i][1][1])
            switch (kata[i][2]) {
              case 1:
                this.moveUU(row, col)
                break;
              case 2:
                this.moveUR(row, col)
                break;
              case 3:
                this.moveRR(row, col)
                break;
              case 4:
                this.moveDR(row, col)
                break;
              case 5:
                this.moveDD(row, col)
                break;
              case 6:
                this.moveDL(row, col)
                break;
              case 7:
                this.moveLL(row, col)
                break;
              case 8:
                this.moveUL(row, col)
                break;


            } //end switch movement

            let r = this.xyPos[0]
            let c = this.xyPos[1]
            let rCek = true
            for (let cek = 0; cek < kata.length; cek++) { //cek duplicate
              if (kata[cek][1] == (String(r) + String(c))) {
                rCek = false
                break
              }
            }

            if (this.xySts && this.arr[r][c] == word[i + 1] && rCek) {
              i++
              let k = []
              k.push(word[i])
              k.push(String(r) + String(c))
              k.push(1)
              kata.push(k)

            } else {
              kata[i][2] += 1
            }

            while (kata[i][2] == 9) { //backtrack
              i--
              if (i == -1) { // solution not found
                return false
              }
              kata.pop()
              kata[i][2] += 1
            }

          } //loop while i
          this.found.push(word)
          return true
        }
      }


    }
    return false // not found until last
  }

  solve(dataArr) {
    for (let i = 0; i < dataArr.length; i++) {
      this.search(dataArr[i])
    }
    console.log(this.found.length + ' words found :');
    for (let i = 0; i < this.found.length; i++) {
      console.log(this.found[i]);
    }
  }

}

let game = new Boggle
let kataku = ['PNKZ', 'BAKMI', 'MUDA', 'MUKA', 'ANAK', 'PANCI', 'MAMA']


game.shake(8)
// game.boardX()

game.printBoard()
game.solve(words)
// game.solve(kataku)
