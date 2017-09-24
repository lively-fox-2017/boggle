"use strict"

class boggle {
  constructor(rawData) {
    this.data = rawData;
    this.board = [];
    this.hasil = [];
    this.koordinat = [];
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    //ini bawah constructor
  }

  shake(num) {
    let arr = [];
    let k = 0
  	for (var i=0; i<num; i++) {
      arr.push([]);
    }
    for (var j=0; j<Math.pow(num,2); j++) {
      arr[k].push(this.alphabet.charAt(Math.floor(Math.random()*this.alphabet.length)));
      if (k<3) {
        k++;
      } else {
        k=0;
      }
    }
    this.board = arr;
    return this.board;
    //ini bawah method shake fixed/statics
  }

  solved() {
    // let arr = []
    for (var i=0; i<this.data.length; i++) {
      let flag =false;
      for (var j=0; j<this.board.length; j++) {
        for (var k=0; k<this.board[j].length; k++) {
          if (this.data[i][0] === this.board[j][k]) {
            this.koordinat = [[j,k]];
            if (this.cekKata(this.data[i]) === true) {
              this.hasil.push(this.data[i]);
              flag=true;
              break;
            }
          }
        }
        if (flag===true) {
          break;
        }
      }
    }
    return this.hasil.join();
    //ini bawah method solved
  }

  cekSquare(col, row, value) {
    for (var i=1; i<9; i++) {
      if (i==1 && row-1>-1) {
        if (this.board[col][row-1] === value && this.cekHistory(col,row-1) === true) {
          return this.koordinat.push([col,row-1]);
        }
      }//ini cek atas
      if (i==2 && row-1>-1 && col+1<this.board.length) {
        if (this.board[col+1][row-1] === value && this.cekHistory(col+1,row-1) === true) {
          return this.koordinat.push([col+1,row-1]);
        }
      }//ini cek kanan atas
      if (i==3 && col+1<this.board.length) {
        if (this.board[col+1][row] === value && this.cekHistory(col+1,row) === true) {
          return this.koordinat.push([col+1,row]);
        }
      }//ini cek kanan
      if (i==4 && row+1<this.board.length && col+1<this.board.length) {
        if (this.board[col+1][row+1] === value && this.cekHistory(col+1,row+1) === true) {
          return this.koordinat.push([col+1,row+1]);
        }
      }//ini cek kanan bawah
      if (i==5 && row+1<this.board.length) {
        if (this.board[col][row+1] === value && this.cekHistory(col,row+1) === true) {
          return this.koordinat.push([col,row+1]);
        }
      }//ini cek bawah
      if (i==6 && col-1>-1 && row+1<this.board.length) {
        if (this.board[col-1][row+1] === value && this.cekHistory(col-1,row+1) === true) {
          return this.koordinat.push([col-1,row+1]);
        }
      }//ini cek kiri bawah
      if (i==7 && col-1>-1) {
        if (this.board[col-1][row] === value && this.cekHistory(col-1,row) === true) {
          return this.koordinat.push([col-1,row]);
        }
      }//ini cek kiri
      if (i==8 && col-1>-1 && row-1>-1) {
        if (this.board[col-1][row-1] === value && this.cekHistory(col-1,row-1) === true) {
          return this.koordinat.push([col-1,row-1]);
        }
      }
    }
    //ini bawah method cekSquare
  }

  cekHistory(col,row) {
    for (var i=0; i<this.koordinat.length; i++) {
      if (col === this.koordinat[i][0] && row === this.koordinat[i][1]) {
        return false;
      }
    }
    return true;
    //ini bawah method cekHistory
  }

  cekKata(word) {
    for (var i=1; i<word.length; i++) {
      this.cekSquare(this.koordinat[this.koordinat.length-1][0],this.koordinat[this.koordinat.length-1][1],word[i]);
    }
    if (this.koordinat.length === word.length) {
      return true;
    } else {
      return false;
    }
    //ini bawah method cekKata
  }

  print() {
    console.log(this.board);
    console.log(`${this.hasil.length} words founded:`);
    console.log(this.hasil);
    //ini bawah method print
  }

  //ini bawah class
}
var data = require('./data.js');

var game = new boggle(data.words);
game.shake(4);
game.solved();
game.print();